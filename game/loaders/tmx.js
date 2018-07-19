import Logger from "../logger.js";
import ImageAsset from "./image.js";
import { Position, Size } from "../structs.js";

class TMX {
    constructor(context) {
        this.context = context;
        this.dom = null;
        this.domPath = null;
        this.image = {};
        this.lastRender = null;
        this.logger = new Logger("TMX");
    }
    static canLoad(path) {
        return path.indexOf(".tmx") !== -1;
    }
    loadMap(data, callback, fail) {
        this.dom = data;
        let map = data.querySelector("map");
        let tileSets = map.querySelectorAll("tileset");
        let tileSetsLoaded = 0;
        let paths = [];

        let mapProperties = [ "height", "width", "orientation", "renderorder", "tiledversion", "tileheight", "tilewidth" ];
        
        for(let property of mapProperties) {
            let value = map.getAttribute(property);
            this[property] = isNaN(parseInt(value, 10)) ? value : parseInt(value, 10); //map.getAttribute(property);
            this.logger.info(`map property: ${property} = ${this[property]}`);
        }

        this.layers = [];
        this.tiles = [ { dummy: "dummy" }];
        let layerNodes = map.querySelectorAll("layer");
        for(let layerNode of layerNodes) {
            this.layers.push({
                name: layerNode.getAttribute("name"),
                width: layerNode.getAttribute("width"),
                height: layerNode.getAttribute("height"),
                tiles: layerNode.querySelector("data").textContent.split(",")
            });
        }


        let tileToPosition = function(tile, tileSize, tilesPerRow) {
            let position = new Position();
            position.y = Math.floor(tile / tilesPerRow) * (tileSize.height);
            position.x = (tile % tilesPerRow) * (tileSize.width); 
            return position;
        };
        for(let tileSet of tileSets) {
            let image = map.querySelector("image");
            let sprites = image.getAttribute("source");
            // let sheetWidth = parseInt(image.getAttribute("width"), 10);
            let tileHeight = parseInt(tileSet.getAttribute("tileheight"), 10);
            let tileWidth = parseInt(tileSet.getAttribute("tilewidth"), 10);
            let columns = parseInt(tileSet.getAttribute("columns"), 10);
            // let sheetHeight = parseInt(image.getAttribute("height"), 10);
            paths.push(sprites);
            let tileNodes = tileSet.querySelectorAll("tile");
            for(let tileNode of tileNodes) {
                let tile = {};
                let properties = tileNode.querySelectorAll("property");
                for(let property of properties) {
                    let value = property.getAttribute("value");
                    tile[property.getAttribute("name")] = property.getAttribute("type") === "int" ? parseInt(value, 10) : value;
                }
                let id = parseInt(tileNode.getAttribute("id"), 10);
                let position = tileToPosition(id - 1, new Size(tileWidth, tileHeight), columns);
                tile.width = tileWidth;
                tile.height = tileHeight;
                tile.spritesheet = sprites;
                tile.x = position.x;
                tile.y = position.y;
                this.tiles[id] = tile;
            }    
        }

        var loadImage = (path) => {
            var basepath = this.domPath.split("/");
            basepath.pop();
            basepath.push(path);
            let filepath = basepath.join("/");
            var alt = this.domPath.replace(".xml", ".png");
    
            this.logger.info(filepath);
    
            new Promise((resolve, reject) => {
                this.image[path] = new Image();
                this.image[path].src = filepath;
                this.image[path].addEventListener("load", resolve);
                this.image[path].addEventListener("error", reject);
            }).then(() => {
                tileSetsLoaded++;
                this.logger.info(`Loaded tile set ${path}`);
                if(tileSetsLoaded == tileSets.length) {
                    callback();
                }
            }, () => {
                if(path !== alt) {
                    this.logger.warn(`Failed to load ${path}, trying ${alt}`);
                    loadImage(alt);
                } else {
                    this.logger.error(`Failed to load sprite sheet for ${this.domPath}`);
                    fail();
                }
            });
        };
        for(let path of paths) {
            loadImage(path);
        }
    }

    orthogonal(position) {
        let screenPosition = new Position();
        screenPosition.x = position.x * this.tilewidth;
        screenPosition.y = position.y * this.tileheight;
        return screenPosition;
    }
    isometric(position) {
        let screenPosition = new Position();
        screenPosition.x = position.x * (this.tilewidth / 2) - (position.y * (this.tilewidth / 2)) + (this.width / 2 * this.tilewidth) - (this.tilewidth / 2);
        screenPosition.y = position.y * (this.tileheight / 2) + (position.x * (this.tileheight /2)) - (this.tileheight / 2);
        return screenPosition;
    }

    render(position, size) {
        //ignore args :)
        this.logger.info("rendering map to image");
        let canvas = null;
        //futureproof
        if(window.OffscreenCanvas) {
            canvas = new OffscreenCanvas(size.width, size.height);
        } else {
            canvas = document.createElement("canvas"); 
            canvas.width = size.width;
            canvas.height = size.height;                
        }
        document.createElement("canvas"); 
        let context = canvas.getContext("2d");
        for(let layer of this.layers) {
            this.logger.info(`render layer ${layer.name}`);
            for(let tileIdx in layer.tiles) {
                let tile = this.tiles[layer.tiles[tileIdx]];
                let tileCoordinates = new Position(tileIdx % this.width, tileIdx / this.width | 0);
                // currently supported orientations: isometric, orthogonal
                let position = this[this.orientation](tileCoordinates);
                //position.x += (size.width / 2);
                if(tile.spritesheet) {
                    this.logger.info("render tile");
                    context.drawImage(this.image[tile.spritesheet], tile.x, tile.y, tile.width, tile.height, position.x, position.y, tile.width, tile.height);
                }
            }
        }
        this.lastRender = new ImageAsset(this.context, canvas);
        return this.lastRender;
    }
    load(path) {
        this.domPath = path;
        let promise = new Promise((resolve, reject) => {       
            fetch(path).then(response => response.text())
                .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
                .then(data => this.loadMap(data, resolve, reject));
        });
        return promise;
    }
}

export default TMX;