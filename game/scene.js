import Node from "./node.js";

class Scene extends Node {
    constructor() {
        super();
        this.keys = {
            32: "space",
            37: "left",
            39: "right"
        };
        window.addEventListener("keydown", (e) => {
            if(this.keys[e.which]) {
                this.emit(`${this.keys[e.which]}-down`);
            }
        });
        window.addEventListener("keyup", (e) => {
            if(this.keys[e.which]) {
                this.emit(`${this.keys[e.which]}-up`);
            }
        });
    }

    setColor(hexCode) {
        this.color = hexCode;
    }
}

export default Scene;