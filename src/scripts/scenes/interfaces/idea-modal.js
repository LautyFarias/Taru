export default class IdeaModal extends Phaser.Scene {
    constructor(handle, parent, ideaMessage) {
        super(
            { key: "idea-modal" },
            handle
        );
        this.parent = parent;
        this.ideaMessage = ideaMessage;
    }
    init() { }
    preload() {
        this.load.setBaseURL('../../../assets')
            .image('modal', 'images/button.png');
    }
    create() {
        this.modal = this.add.image(
            this.game.renderer.width / 2,
            300,
            'modal'
        ).setOrigin(0.5)
            .setDepth(3)
            .setScale(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.remove("idea-modal");
            });

        this.modalText = this.add.text(
            this.game.renderer.width / 2,
            300,
            this.ideaMessage,
            { font: "6em" }
        ).setOrigin(0.5)
            .setDepth(4);
    }
}