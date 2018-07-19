import ImageAsset from "./loaders/image.js";
import SpriteSheet from "./loaders/spritesheet.js";
import TMX from "./loaders/tmx.js";
import Logger from "./logger.js";
import EventClass from "event-class-es6";

class Assets extends EventClass {
    constructor(items) {
        super();
        this.loaders = [ ImageAsset, SpriteSheet, TMX ];
        this.logger = new Logger("assets");
        this.count = Object.keys(items).length;
        this.loaded = 0;
        if(items) {
            this.load(Assets.game.context, items);            
        }
    }

    itemLoaded(item) {
        this.loaded++;
        this.emit("progress", { item: item, loaded: this.loaded, total: this.count });
        if(this.count === this.loaded) {
            this.emit("ready", this);
        }
    }

    load(context, items) {
        for(let item in items) {
            for(let Loader of this.loaders) {
                if(Loader.canLoad(items[item])) {
                    this[item] = new Loader(context);
                    this[item].load(items[item]).then(() => {
                        this.itemLoaded(item);
                    });    
                }                    
            }
        }
    }
}

export default Assets;