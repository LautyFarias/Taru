export default class Level extends Phaser.Scene {
    createWindow(func) {
        let x = Phaser.Math.Between(400, 600);
        let y = Phaser.Math.Between(64, 128);

        let handle = 'window' + this.count++;

        let win = this.add.zone(x, y, func.WIDTH, func.HEIGHT)
            .setInteractive({ draggable: true })
            .setOrigin(0);

        let demo = new func(handle, win, this.ideaMessage);

        this.input.setDraggable(win);

        win.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
            demo.refresh();
        });

        this.scene.add(handle, demo, true);
    }
}