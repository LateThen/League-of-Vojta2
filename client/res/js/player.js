
export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 50;
        this.color = "red";
        this.velocity = 2;
    }

    draw(ctx){
        ctx.strokeStyle = this.color;
        ctx.strokeRect(1280 / 2 - this.width / 2, 720 / 2 - this.height / 2, this.width, this.height);
    }
}