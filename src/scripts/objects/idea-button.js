export default class IdeaButton extends Phaser.GameObjects.Image {
    constructor(scene, action, data, modal) {
        super(scene, data.x, data.y, 'idea-button');
        this.action = action ? action : this.showIdeaModal;
        this.modal = modal;
        this.setScale(data.scale).setDepth(data.depth)
            .setInteractive().on("pointerdown", () => {
                this.removeInteractive();
                this.action();
            }, scene);

    }
    showIdeaModal() {
        this.scene.ideaModal = this.scene.add.rectangle(
            this.modal.x, this.modal.y, this.modal.width,
            this.modal.height, this.modal.color
        );
        this.scene.plugins.get('rexscaleplugin').popup(this.scene.ideaModal, 1000)
            .once('complete', () => {
                this.has_modal = true;
                this.scene.input.on("pointerdown", () => {
                    this.setInteractive();
                    if (this.has_modal) {
                        this.disposeIdeaModal();
                    }
                });
            });
    }
    disposeIdeaModal() {
        this.scene.plugins.get('rexscaleplugin').scaleDownDestroy(
            this.scene.ideaModal, 500
        ).once('complete', () => { this.has_modal = false; });
    }
}