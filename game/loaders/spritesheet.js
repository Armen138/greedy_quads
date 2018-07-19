import Logger from "../logger.js";

class SpriteSheet {
    constructor(context) {
        this.context = context;
        this.dom = null;
        this.domPath = null;
        this.image = new Image();
        this.logger = new Logger("spritesheet");
    }
    static canLoad(path) {
        return path.indexOf(".xml") !== -1;
    }
    loadSheet(data, callback, fail) {
        this.dom = data;
        let textureAtlas = data.querySelector("TextureAtlas");
        var path = textureAtlas.getAttribute("imagePath");
        var basepath = this.domPath.split("/");
        basepath.pop();
        basepath.push(path);
        path = basepath.join("/");
        var alt = this.domPath.replace(".xml", ".png");


        let subTextures = textureAtlas.querySelectorAll("SubTexture");
        for(var subTexture in subTextures) {
            if(subTextures[subTexture].getAttribute) {
                let name = subTextures[subTexture].getAttribute("name");
                this[name] = {};
                this[name].sheet = this;
                this[name].width = subTextures[subTexture].getAttribute("width");
                this[name].height = subTextures[subTexture].getAttribute("height");
                this[name].x = subTextures[subTexture].getAttribute("x");
                this[name].y = subTextures[subTexture].getAttribute("y");
                this[name].draw = function(x, y) {
                    //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                    this.sheet.context.drawImage(this.sheet.image, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
                }.bind(this[name]);    
            }
        }

        var loadImage = (path) => {
            new Promise((resolve, reject) => {
                this.image.src = path;
                this.image.addEventListener("load", resolve);
                this.image.addEventListener("error", reject);
            }).then(() => {
                callback();
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
        loadImage(path);

        // console.log(path);
    }
    load(path) {
        this.domPath = path;
        let promise = new Promise((resolve, reject) => {       
            fetch(path).then(response => response.text())
                .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
                .then(data => this.loadSheet(data, resolve, reject));
        });
        // this.image.src = path.replace(".xml", ".png");
        // let promise = new Promise((resolve, reject) => {
        //     this.image.addEventListener("load", resolve);
        //     this.image.addEventListener("error", reject);
        // });
        return promise;
    }
}

export default SpriteSheet;