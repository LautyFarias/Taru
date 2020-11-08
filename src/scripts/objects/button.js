export default class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, data, action, text) {
        super(scene, data.x, data.y, data.width, data.height, data.color);
        this.setInteractive().on("pointerdown", () => {
            action();
        });
        scene.add.text(data.x, data.y, text).setOrigin(0.5).setDepth(1);
    }
}