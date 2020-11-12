export default class Button extends Phaser.GameObjects.Image {
    constructor(scene, data, action, text) {
        super(scene, data.x, data.y, 'button');
        this.setDisplaySize(scene.game.renderer.width / 2.5, scene.game.renderer.height / 8)
            .setInteractive().on("pointerdown", () => {
                action();
            });
        scene.add.text(data.x, data.y, text).setOrigin(0.5).setDepth(1);
    }
}