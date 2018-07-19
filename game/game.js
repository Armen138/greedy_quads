import Assets from "./assets.js";
import { Position, Size } from "./structs.js";
import Scene from "./scene.js";
import Node from "./node.js";
import SpriteNode from "./spritenode.js";

/**
 * Game Class
 * @constructor
 * @param size { width, height }
 * @param fullscreen boolean
 */
class Game {
    constructor(options) {
        this.Position = Position;
        this.Size = Size;
        this.Node = Node;
        this.Scene = Scene;
        this.SpriteNode = SpriteNode;
        this.Assets = Assets;
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
        if(options.fullscreen) {
            let aspectHeight = 0,
                aspectWidth = 0;
            this.canvas.style.position = "fixed";
            this.canvas.style.top = "0";
            this.canvas.style.left = "0";
            this.canvas.style.width = window.innerWidth + "px";
            this.canvas.style.height = window.innerHeight + "px";
            if(options.aspect) {
                switch(options.aspect) {
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
        if(!document.getElementById("game")) {
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
        if(scene) {
            let color = scene.color || "black";
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            scene.draw(timestamp);            
        }
    }
    draw(timestamp) {
        let now = Date.now();
        let alpha = 1.0;
        if(now - this.sceneTime < 1000) {
            alpha = (now - this.sceneTime) / 1000.0;
        } else {
            this.outgoingScene = null;
        }
        this.context.globalAlpha = alpha;
        this.drawScene(this.scene, timestamp);
        if(this.outgoingScene) {
            this.context.globalAlpha = (1.0 - alpha);
            this.drawScene(this.outgoingScene, timestamp);
        }        
        requestAnimationFrame(this.draw.bind(this));
    }
}

export default Game;