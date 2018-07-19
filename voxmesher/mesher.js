import Node from "../game/node.js";
import Scene from "../game/scene.js";
import { Size, Position } from "../game/structs.js";
import Rectangle from "../game/rectangle.js";
import SpriteNode from "../game/spritenode.js";

class Mesher extends Scene {
    constructor(game) {
        super();
        this.size = new Size(Node.game.width, Node.game.height);
        let voxelRectangle = new Rectangle(game.context, 100, 100);
        voxelRectangle.fill = "#444";
        voxelRectangle.border = "white";
        let mask = [];
        let chunkSize = { width: 6, height: 6 };
        for (let x = 0; x < chunkSize.width; x++) {
            mask.push([]);
            for (let y = 0; y < chunkSize.height; y++) {
                mask[x].push(Math.random() < 0.75 ? true : false);
                if (mask[x][y]) {
                    let voxel = new SpriteNode(voxelRectangle);
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
        let x = 0, y = 0;
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
        for(let i = 0; i < quads.length; i++) {
            let voxelRectangle = new Rectangle(this.context, 100 * quads[i].width, 100 * quads[i].height);
            voxelRectangle.fill = "rgba(0, 0, 0, 0.75)";
            voxelRectangle.border = "white";
            let voxel = new SpriteNode(voxelRectangle);
            this.add(voxel);
            voxel.setPosition(10 + quads[i].x * 100, 10 + quads[i].y * 100);
        }
        let delay = Date.now() - time;
        console.log(`Meshed in ${delay}ms`);
        return quads;
    }

    update() {
    }

}

export default Mesher;