export class Level extends Phaser.Scene {
    createWindow(func) {
        var x = Phaser.Math.Between(400, 600);
        var y = Phaser.Math.Between(64, 128);

        var handle = 'window' + this.count++;

        var win = this.add.zone(x, y, func.WIDTH, func.HEIGHT).setInteractive(
            { draggable: true }
        ).setOrigin(0);

        var demo = new func(handle, win, this.ideaMessage);

        this.input.setDraggable(win);

        win.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

            demo.refresh();

        });

        this.scene.add(handle, demo, true);
    }
}