import Node from "../game/node.js";
import Scene from "../game/scene.js";
import { Size, Position } from "../game/structs.js";
import SpriteNode from "../game/spritenode.js";
import Mesher from "./mesher.js";
class VoxMesher {
    constructor(game) {
        let mesher = new Mesher(game);
        game.setScene(mesher);
    }
}

export default VoxMesher;