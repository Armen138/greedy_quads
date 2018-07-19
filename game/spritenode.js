import { Position } from "./structs.js";
import Node from "./node.js";

class SpriteNode extends Node {
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

export default SpriteNode;