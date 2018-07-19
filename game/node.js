import { Position } from "./structs.js";
import EventClass from "event-class-es6";

class Node extends EventClass {
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
        for(var child of this.children) {
            if(child.id === id) {
                return child;
            }
        }
    }

    remove(node) {
        let idx = this.children.indexOf(node);
        if(idx !== -1) {
            this.children[idx].parent = null;
            this.children.splice(idx, 1);
        }
    }

    getPosition() {
        return new Position(this.x, this.y);
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
        for(let child of this.children) {
            child.draw(timestamp);                
        }
        Node.game.context.restore();
        this.emit("update", delta);
        this.lastDraw = timestamp;
    }
}

export default Node;