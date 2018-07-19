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

export default Rectangle;