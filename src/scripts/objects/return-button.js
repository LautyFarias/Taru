export default class ReturnButton extends Phaser.GameObjects.Image {
    constructor(scene, action, data) {
        super(scene, data.x, data.y, 'return-button');
        this.action = action ? action : this.returnTitleScreen;
        this.setScale(data.scale).setDepth(data.depth)
            .setInteractive().on("pointerdown", () => {
                this.action();
            }, scene);

    }
    returnTitleScreen() {
        this.scene.scene.start("title-screen");
    }
}