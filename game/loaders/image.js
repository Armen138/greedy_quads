class ImageAsset {
    constructor(context, image) {
        this.context = context;
        this.image = image || new Image();
    }

    static canLoad(path) {
        if(path.indexOf(".png") !== -1) {
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

export default ImageAsset;