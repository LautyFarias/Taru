export default class Modal extends Phaser.GameObjects.Rectangle {
    constructor(scene, action, content, data) {
        super(
            scene, data.x, data.y, data.width, data.height, data.color
        );
        this.action = action ? action : this.disposeModal;
        this.content = content ? content : scene.game.config.custom.modal.defaultContent;
        this.setDepth(data.depth).setInteractive().on("pointerdown", () => {
            this.action();
        }, scene);
        this.showModal();
    }
    showModal() {
        this.scene.plugins.get('rexscaleplugin').popup(this, 1000)
            .once('complete', () => {
                this.scene.add.text(
                    this.x, this.y - 100, this.content.title.text, this.content.title.styles
                ).setOrigin(0.5).setDepth(4);
                this.scene.add.text(
                    this.x, this.y, this.content.body.text, this.content.body.styles
                ).setOrigin(0.5).setDepth(4);
                this.has_modal = true;
                this.scene.input.on("pointerdown", () => {
                    if (this.has_modal) this.disposeModal();
                });
            });
    }
    disposeModal() {
        this.scene.plugins.get('rexscaleplugin').scaleDownDestroy(
            this, 500
        ).once('complete', () => { this.has_modal = false; });
    }
}