/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Size; });
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__structs_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_event_class_es6__ = __webpack_require__(6);



class Node extends __WEBPACK_IMPORTED_MODULE_1_event_class_es6__["a" /* default */] {
    constructor() {
        super();
        Node.id = Node.id || 0;
        this.id = Node.id++;
        this.x = 0;
        this.y = 0;
        this.alpha = 1.0;
        this.priority = 0;
        this.parent = null;
        this.children = [];
    }

    add(node) {
        node.parent = this;
        node.emit("added", this);
        this.children.push(node);
        this.children.sort((a, b) => a.priority > b.priority);
    }

    getChildNodeById(id) {
        for (var child of this.children) {
            if (child.id === id) {
                return child;
            }
        }
    }

    remove(node) {
        let idx = this.children.indexOf(node);
        if (idx !== -1) {
            this.children[idx].parent = null;
            this.children.splice(idx, 1);
        }
    }

    getPosition() {
        return new __WEBPACK_IMPORTED_MODULE_0__structs_js__["a" /* Position */](this.x, this.y);
    }

    setPosition(position, y) {
        this.x = position.hasOwnProperty("x") ? position.x : position;
        this.y = position.hasOwnProperty("y") ? position.y : y;
    }

    draw(timestamp) {
        var delta = timestamp - (this.lastDraw || timestamp);
        Node.game.context.save();
        Node.game.context.translate(this.x, this.y);
        Node.game.context.globalAlpha = this.alpha;
        for (let child of this.children) {
            child.draw(timestamp);
        }
        Node.game.context.restore();
        this.emit("update", delta);
        this.lastDraw = timestamp;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Node);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Logger {
    constructor(prefix) {
        this.prefix = prefix;
        this.console = window.console;
    }

    info(message) {
        this.console.info("%c" + this.prefix + "%c%s", "color: blue", "color: black", message);
    }

    warn(message) {
        this.console.warn("%c" + this.prefix + "%c%s", "color: blue", "color: orange", message);
    }

    error(message) {
        this.console.error(message);
    }

    log(message) {
        this.info(message);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Logger);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_js__ = __webpack_require__(1);


class Scene extends __WEBPACK_IMPORTED_MODULE_0__node_js__["a" /* default */] {
    constructor() {
        super();
        this.keys = {
            32: "space",
            37: "left",
            39: "right"
        };
        window.addEventListener("keydown", e => {
            if (this.keys[e.which]) {
                this.emit(`${this.keys[e.which]}-down`);
            }
        });
        window.addEventListener("keyup", e => {
            if (this.keys[e.which]) {
                this.emit(`${this.keys[e.which]}-up`);
            }
        });
    }

    setColor(hexCode) {
        this.color = hexCode;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Scene);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__structs_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_js__ = __webpack_require__(1);



class SpriteNode extends __WEBPACK_IMPORTED_MODULE_1__node_js__["a" /* default */] {
    constructor(drawable) {
        super();
        this.drawable = drawable;
    }

    get width() {
        return this.drawable.width;
    }

    get height() {
        return this.drawable.height;
    }

    draw() {
        this.drawable.draw(this.x, this.y);
        super.draw();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (SpriteNode);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ImageAsset {
    constructor(context, image) {
        this.context = context;
        this.image = image || new Image();
    }

    static canLoad(path) {
        if (path.indexOf(".png") !== -1) {
            return true;
        }
        return false;
    }

    get width() {
        return this.image.width;
    }

    get height() {
        return this.image.height;
    }

    draw(x, y) {
        this.context.drawImage(this.image, x, y);
    }

    load(path) {
        this.image.src = path;
        let promise = new Promise((resolve, reject) => {
            this.image.addEventListener("load", resolve);
            this.image.addEventListener("error", reject);
        });
        return promise;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ImageAsset);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let _listeners = Symbol("listeners");

class EventClass {

    constructor() {
        this[_listeners] = {};
    }

    /**
     * Adds a listener for the given event
     * @param {string} event - the event to listen to
     * @param {function} listener - the callback called when the given event is emitted
     * @returns {function} - event.off(event, listener);
     */
    on(event, listener) {
        if (typeof this[_listeners][event] === "undefined") {
            this[_listeners][event] = [];
        }
        this[_listeners][event].push(listener);
        return listener;
    }

    /**
     * Adds an one-shot listener for the given event
     * @param {string} event - the event to listen to
     * @param {function} listener - the callback called once when the given event is emitted
     */
    once(event, listener) {
        let onceListener = () => {
            listener();
            this.off(event, onceListener);
        };
        this.on(event, onceListener);
    }

    /**
     * Removes the listener for the given event, or removes all listeners for the given event if listener is undefined
     * @param {string} event
     * @param {function} [listener]
     */
    off(event, listener) {
        if (typeof this[_listeners][event] !== "undefined") {
            if (typeof listener === "undefined") {
                this[_listeners][event] = [];
            } else {
                let listenerIndex = this[_listeners][event].lastIndexOf(listener);
                if (listenerIndex !== -1) {
                    this[_listeners][event].splice(listenerIndex, 1);
                }
            }
        }
    }

    /**
     * Emits an event
     * @param {string} event - all listeners to this event will be notified
     * @param {...*} arguments - all listeners to this event will be notified with the given arguments
     */
    emit(event) {
        let listeners = this[_listeners][event];
        if (typeof listeners !== "undefined") {
            for (let i = 0; i < listeners.length; i++) {
                listeners[i].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventClass;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_game_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__voxmesher_voxmesher_js__ = __webpack_require__(12);



let game = new __WEBPACK_IMPORTED_MODULE_0__game_game_js__["a" /* default */]({ width: 620, height: 620, fullscreen: false, aspect: "width" });

let loading = new game.Assets({
    "splash": "assets/armen138splash_small.png"
});

loading.on("ready", () => {
    let scene = new game.Scene(loading);
    let splash = new game.SpriteNode(loading.splash);
    scene.setColor("#1e3966");
    splash.setPosition(game.width / 2 - splash.width / 2, game.height / 2 - splash.height / 2);
    scene.add(splash);
    game.setScene(scene);
    new __WEBPACK_IMPORTED_MODULE_1__voxmesher_voxmesher_js__["a" /* default */](game);
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__structs_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scene_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__spritenode_js__ = __webpack_require__(4);






/**
 * Game Class
 * @constructor
 * @param size { width, height }
 * @param fullscreen boolean
 */
class Game {
    constructor(options) {
        this.Position = __WEBPACK_IMPORTED_MODULE_1__structs_js__["a" /* Position */];
        this.Size = __WEBPACK_IMPORTED_MODULE_1__structs_js__["b" /* Size */];
        this.Node = __WEBPACK_IMPORTED_MODULE_3__node_js__["a" /* default */];
        this.Scene = __WEBPACK_IMPORTED_MODULE_2__scene_js__["a" /* default */];
        this.SpriteNode = __WEBPACK_IMPORTED_MODULE_4__spritenode_js__["a" /* default */];
        this.Assets = __WEBPACK_IMPORTED_MODULE_0__assets_js__["a" /* default */];
        this.Assets.game = this;
        this.Node.game = this;
        this.setup(options);
        this.draw();
    }

    setup(options) {
        this.canvas = document.getElementById("game") || document.createElement("canvas");
        this.canvas.setAttribute("id", "game");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = options.width;
        this.canvas.height = options.height;
        if (options.fullscreen) {
            let aspectHeight = 0,
                aspectWidth = 0;
            this.canvas.style.position = "fixed";
            this.canvas.style.top = "0";
            this.canvas.style.left = "0";
            this.canvas.style.width = window.innerWidth + "px";
            this.canvas.style.height = window.innerHeight + "px";
            if (options.aspect) {
                switch (options.aspect) {
                    case "width":
                        aspectHeight = window.innerHeight / (window.innerWidth / options.width);
                        this.canvas.height = aspectHeight;
                        break;
                    case "height":
                        aspectWidth = window.innerWidth / (window.innerHeight / options.height);
                        this.canvas.width = aspectWidth;
                        break;
                    case "fit":
                        aspectHeight = window.innerHeight / (window.innerWidth / options.width);
                        aspectWidth = window.innerWidth / (window.innerHeight / options.height);
                        this.canvas.width = aspectWidth;
                        this.canvas.height = aspectHeight;
                        break;
                    case "stretch":
                        break;
                }
            }
        }
        if (!document.getElementById("game")) {
            document.body.appendChild(this.canvas);
        }
        this.context.fillStyle = "rgba(0, 0, 0, 1.0)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.scene = null;
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    setScene(scene) {
        this.sceneTime = Date.now();
        this.outgoingScene = this.scene;
        this.scene = scene;
    }

    drawScene(scene, timestamp) {
        if (scene) {
            let color = scene.color || "black";
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            scene.draw(timestamp);
        }
    }
    draw(timestamp) {
        let now = Date.now();
        let alpha = 1.0;
        if (now - this.sceneTime < 1000) {
            alpha = (now - this.sceneTime) / 1000.0;
        } else {
            this.outgoingScene = null;
        }
        this.context.globalAlpha = alpha;
        this.drawScene(this.scene, timestamp);
        if (this.outgoingScene) {
            this.context.globalAlpha = 1.0 - alpha;
            this.drawScene(this.outgoingScene, timestamp);
        }
        requestAnimationFrame(this.draw.bind(this));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loaders_image_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loaders_spritesheet_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loaders_tmx_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logger_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_event_class_es6__ = __webpack_require__(6);






class Assets extends __WEBPACK_IMPORTED_MODULE_4_event_class_es6__["a" /* default */] {
    constructor(items) {
        super();
        this.loaders = [__WEBPACK_IMPORTED_MODULE_0__loaders_image_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__loaders_spritesheet_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__loaders_tmx_js__["a" /* default */]];
        this.logger = new __WEBPACK_IMPORTED_MODULE_3__logger_js__["a" /* default */]("assets");
        this.count = Object.keys(items).length;
        this.loaded = 0;
        if (items) {
            this.load(Assets.game.context, items);
        }
    }

    itemLoaded(item) {
        this.loaded++;
        this.emit("progress", { item: item, loaded: this.loaded, total: this.count });
        if (this.count === this.loaded) {
            this.emit("ready", this);
        }
    }

    load(context, items) {
        for (let item in items) {
            for (let Loader of this.loaders) {
                if (Loader.canLoad(items[item])) {
                    this[item] = new Loader(context);
                    this[item].load(items[item]).then(() => {
                        this.itemLoaded(item);
                    });
                }
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Assets);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(2);


class SpriteSheet {
    constructor(context) {
        this.context = context;
        this.dom = null;
        this.domPath = null;
        this.image = new Image();
        this.logger = new __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */]("spritesheet");
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
        for (var subTexture in subTextures) {
            if (subTextures[subTexture].getAttribute) {
                let name = subTextures[subTexture].getAttribute("name");
                this[name] = {};
                this[name].sheet = this;
                this[name].width = subTextures[subTexture].getAttribute("width");
                this[name].height = subTextures[subTexture].getAttribute("height");
                this[name].x = subTextures[subTexture].getAttribute("x");
                this[name].y = subTextures[subTexture].getAttribute("y");
                this[name].draw = function (x, y) {
                    //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                    this.sheet.context.drawImage(this.sheet.image, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
                }.bind(this[name]);
            }
        }

        var loadImage = path => {
            new Promise((resolve, reject) => {
                this.image.src = path;
                this.image.addEventListener("load", resolve);
                this.image.addEventListener("error", reject);
            }).then(() => {
                callback();
            }, () => {
                if (path !== alt) {
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
            fetch(path).then(response => response.text()).then(str => new window.DOMParser().parseFromString(str, "text/xml")).then(data => this.loadSheet(data, resolve, reject));
        });
        // this.image.src = path.replace(".xml", ".png");
        // let promise = new Promise((resolve, reject) => {
        //     this.image.addEventListener("load", resolve);
        //     this.image.addEventListener("error", reject);
        // });
        return promise;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (SpriteSheet);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__structs_js__ = __webpack_require__(0);




class TMX {
    constructor(context) {
        this.context = context;
        this.dom = null;
        this.domPath = null;
        this.image = {};
        this.lastRender = null;
        this.logger = new __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */]("TMX");
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

        let mapProperties = ["height", "width", "orientation", "renderorder", "tiledversion", "tileheight", "tilewidth"];

        for (let property of mapProperties) {
            let value = map.getAttribute(property);
            this[property] = isNaN(parseInt(value, 10)) ? value : parseInt(value, 10); //map.getAttribute(property);
            this.logger.info(`map property: ${property} = ${this[property]}`);
        }

        this.layers = [];
        this.tiles = [{ dummy: "dummy" }];
        let layerNodes = map.querySelectorAll("layer");
        for (let layerNode of layerNodes) {
            this.layers.push({
                name: layerNode.getAttribute("name"),
                width: layerNode.getAttribute("width"),
                height: layerNode.getAttribute("height"),
                tiles: layerNode.querySelector("data").textContent.split(",")
            });
        }

        let tileToPosition = function (tile, tileSize, tilesPerRow) {
            let position = new __WEBPACK_IMPORTED_MODULE_2__structs_js__["a" /* Position */]();
            position.y = Math.floor(tile / tilesPerRow) * tileSize.height;
            position.x = tile % tilesPerRow * tileSize.width;
            return position;
        };
        for (let tileSet of tileSets) {
            let image = map.querySelector("image");
            let sprites = image.getAttribute("source");
            // let sheetWidth = parseInt(image.getAttribute("width"), 10);
            let tileHeight = parseInt(tileSet.getAttribute("tileheight"), 10);
            let tileWidth = parseInt(tileSet.getAttribute("tilewidth"), 10);
            let columns = parseInt(tileSet.getAttribute("columns"), 10);
            // let sheetHeight = parseInt(image.getAttribute("height"), 10);
            paths.push(sprites);
            let tileNodes = tileSet.querySelectorAll("tile");
            for (let tileNode of tileNodes) {
                let tile = {};
                let properties = tileNode.querySelectorAll("property");
                for (let property of properties) {
                    let value = property.getAttribute("value");
                    tile[property.getAttribute("name")] = property.getAttribute("type") === "int" ? parseInt(value, 10) : value;
                }
                let id = parseInt(tileNode.getAttribute("id"), 10);
                let position = tileToPosition(id - 1, new __WEBPACK_IMPORTED_MODULE_2__structs_js__["b" /* Size */](tileWidth, tileHeight), columns);
                tile.width = tileWidth;
                tile.height = tileHeight;
                tile.spritesheet = sprites;
                tile.x = position.x;
                tile.y = position.y;
                this.tiles[id] = tile;
            }
        }

        var loadImage = path => {
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
                if (tileSetsLoaded == tileSets.length) {
                    callback();
                }
            }, () => {
                if (path !== alt) {
                    this.logger.warn(`Failed to load ${path}, trying ${alt}`);
                    loadImage(alt);
                } else {
                    this.logger.error(`Failed to load sprite sheet for ${this.domPath}`);
                    fail();
                }
            });
        };
        for (let path of paths) {
            loadImage(path);
        }
    }

    orthogonal(position) {
        let screenPosition = new __WEBPACK_IMPORTED_MODULE_2__structs_js__["a" /* Position */]();
        screenPosition.x = position.x * this.tilewidth;
        screenPosition.y = position.y * this.tileheight;
        return screenPosition;
    }
    isometric(position) {
        let screenPosition = new __WEBPACK_IMPORTED_MODULE_2__structs_js__["a" /* Position */]();
        screenPosition.x = position.x * (this.tilewidth / 2) - position.y * (this.tilewidth / 2) + this.width / 2 * this.tilewidth - this.tilewidth / 2;
        screenPosition.y = position.y * (this.tileheight / 2) + position.x * (this.tileheight / 2) - this.tileheight / 2;
        return screenPosition;
    }

    render(position, size) {
        //ignore args :)
        this.logger.info("rendering map to image");
        let canvas = null;
        //futureproof
        if (window.OffscreenCanvas) {
            canvas = new OffscreenCanvas(size.width, size.height);
        } else {
            canvas = document.createElement("canvas");
            canvas.width = size.width;
            canvas.height = size.height;
        }
        document.createElement("canvas");
        let context = canvas.getContext("2d");
        for (let layer of this.layers) {
            this.logger.info(`render layer ${layer.name}`);
            for (let tileIdx in layer.tiles) {
                let tile = this.tiles[layer.tiles[tileIdx]];
                let tileCoordinates = new __WEBPACK_IMPORTED_MODULE_2__structs_js__["a" /* Position */](tileIdx % this.width, tileIdx / this.width | 0);
                // currently supported orientations: isometric, orthogonal
                let position = this[this.orientation](tileCoordinates);
                //position.x += (size.width / 2);
                if (tile.spritesheet) {
                    this.logger.info("render tile");
                    context.drawImage(this.image[tile.spritesheet], tile.x, tile.y, tile.width, tile.height, position.x, position.y, tile.width, tile.height);
                }
            }
        }
        this.lastRender = new __WEBPACK_IMPORTED_MODULE_1__image_js__["a" /* default */](this.context, canvas);
        return this.lastRender;
    }
    load(path) {
        this.domPath = path;
        let promise = new Promise((resolve, reject) => {
            fetch(path).then(response => response.text()).then(str => new window.DOMParser().parseFromString(str, "text/xml")).then(data => this.loadMap(data, resolve, reject));
        });
        return promise;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (TMX);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_node_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_scene_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_structs_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_spritenode_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mesher_js__ = __webpack_require__(13);





class VoxMesher {
    constructor(game) {
        let mesher = new __WEBPACK_IMPORTED_MODULE_4__mesher_js__["a" /* default */](game);
        game.setScene(mesher);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (VoxMesher);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_node_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_scene_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_structs_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_rectangle_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_spritenode_js__ = __webpack_require__(4);






class Mesher extends __WEBPACK_IMPORTED_MODULE_1__game_scene_js__["a" /* default */] {
    constructor(game) {
        super();
        this.size = new __WEBPACK_IMPORTED_MODULE_2__game_structs_js__["b" /* Size */](__WEBPACK_IMPORTED_MODULE_0__game_node_js__["a" /* default */].game.width, __WEBPACK_IMPORTED_MODULE_0__game_node_js__["a" /* default */].game.height);
        let voxelRectangle = new __WEBPACK_IMPORTED_MODULE_3__game_rectangle_js__["a" /* default */](game.context, 100, 100);
        voxelRectangle.fill = "#444";
        voxelRectangle.border = "white";
        let mask = [];
        let chunkSize = { width: 6, height: 6 };
        for (let x = 0; x < chunkSize.width; x++) {
            mask.push([]);
            for (let y = 0; y < chunkSize.height; y++) {
                mask[x].push(Math.random() < 0.75 ? true : false);
                if (mask[x][y]) {
                    let voxel = new __WEBPACK_IMPORTED_MODULE_4__game_spritenode_js__["a" /* default */](voxelRectangle);
                    this.add(voxel);
                    voxel.setPosition(10 + x * 100, 10 + y * 100);
                }
            }
        }
        this.chunkSize = chunkSize;
        this.mask = mask;
        this.on("space-down", this.greedy);
        this.context = game.context;
    }

    greedy() {
        console.log("getting greedy");
        let time = Date.now();
        let quads = [];
        let x = 0,
            y = 0;
        while (y < this.chunkSize.height) {
            if (this.mask[x][y]) {
                let quadWidth = 1;
                let quadHeight = 1;
                let next = x + 1;
                while (next < this.chunkSize.width) {
                    if (this.mask[next][y]) {
                        quadWidth++;
                    } else {
                        break;
                    }
                    next++;
                }
                next = y + 1;
                let lineMatch = true;
                while (next < this.chunkSize.height && lineMatch) {
                    for (let l = 0; l < quadWidth; l++) {
                        if (!this.mask[x + l][next]) {
                            lineMatch = false;
                        }
                    }
                    if (lineMatch) {
                        quadHeight++;
                        next++;
                    }
                }
                let quad = { x: x, y: y, width: quadWidth, height: quadHeight };
                quads.push(quad);
                for (let mx = x; mx < x + quadWidth; mx++) {
                    for (let my = y; my < y + quadHeight; my++) {
                        this.mask[mx][my] = false;
                    }
                }
                x += quadWidth;
                if (x >= this.chunkSize.width) {
                    x = 0;
                    y++;
                }
            } else {
                x++;
                if (x >= this.chunkSize.width) {
                    x = 0;
                    y++;
                }
            }
        }
        for (let i = 0; i < quads.length; i++) {
            let voxelRectangle = new __WEBPACK_IMPORTED_MODULE_3__game_rectangle_js__["a" /* default */](this.context, 100 * quads[i].width, 100 * quads[i].height);
            voxelRectangle.fill = "rgba(0, 0, 0, 0.75)";
            voxelRectangle.border = "white";
            let voxel = new __WEBPACK_IMPORTED_MODULE_4__game_spritenode_js__["a" /* default */](voxelRectangle);
            this.add(voxel);
            voxel.setPosition(10 + quads[i].x * 100, 10 + quads[i].y * 100);
        }
        let delay = Date.now() - time;
        console.log(`Meshed in ${delay}ms`);
        return quads;
    }

    update() {}

}

/* harmony default export */ __webpack_exports__["a"] = (Mesher);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Rectangle {
    constructor(context, width, height) {
        this.context = context;
        this.width = width || 100;
        this.height = height || 100;
        this.fill = "red";
        this.border = "green";
        this.borderSize = 4;
        // this.image = image || new Image();
    }

    draw(x, y) {
        this.context.save();
        this.context.fillStyle = this.fill;
        this.context.strokeStyle = this.border;
        this.context.lineWidth = this.borderSize;
        this.context.fillRect(x, y, this.width, this.height);
        this.context.strokeRect(x - this.borderSize / 2, y - this.borderSize / 2, this.width, this.height);
        this.context.restore();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Rectangle);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map