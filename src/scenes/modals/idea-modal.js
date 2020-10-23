export class IdeaModal extends Phaser.Scene {
    constructor(handle, parent, ideaMessage) {
        super(
            { key: "idea-modal" },
            handle
        );
        this.parent = parent;
        this.ideaMessage = ideaMessage;
    }
    init() {
    }
    preload() {
        this.load.image('modal', '../../../assets/images/button.png');
    }
    create() {
        this.modal = this.add.image(
            this.game.renderer.width / 2,
            300,
            'modal'
        );
        this.modal.setOrigin(0.5);
        this.modal.setDepth(3);
        this.modal.setScale(0.5);
        this.modal.setInteractive();
        
        console.log(this.game.renderer.width / 2);
        this.modalText = this.add.text(
            this.game.renderer.width / 2,
            300,
            this.ideaMessage,
            { font: "6em" }
        );
        this.modalText.setOrigin(0.5);
        this.modalText.setDepth(4);

        this.modal.on("pointerdown", () => {
            this.scene.remove("idea-modal");
        });

    }
}