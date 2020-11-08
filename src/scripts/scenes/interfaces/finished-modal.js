export default class FinishedModal extends Phaser.Scene {
    constructor(handle, parent, finishedMessage, currentLevel) {
        super(
            { key: "finished-modal" },
            handle
        );
        this.parent = parent;
        this.finishedMessage = finishedMessage;
        this.currentLevel = currentLevel;
    }
    init() { }
    preload() {
        this.load.setBaseURL('assets')
            .image('modal', 'images/button.png');
    }
    create() {
        this.modal = this.add.image(
            this.game.renderer.width / 2,
            300,
            'modal'
        ).setOrigin(0.5).setDepth(3).setScale(0.5)
            .setInteractive().on("pointerdown", () => {
                this.scene.stop("level-" + this.currentLevel);
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start(
                        "level-" + (this.currentLevel + 1),
                        {
                            currentLevel: this.currentLevel + 1,
                            callback: scene => scene.cameras.main.fadeIn(1000, 0, 0, 0)
                        }
                    );
                    this.scene.remove("finished-modal");
                });
            });

        this.modalText = this.add.text(
            this.game.renderer.width / 2,
            300,
            this.finishedMessage,
            { font: "3em" }
        ).setOrigin(0.5).setDepth(4);
    }
}