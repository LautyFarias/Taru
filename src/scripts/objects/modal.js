import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
export default class Modal extends RoundRectangle {
    constructor(scene, action, content, data) {
        super(scene, data.x, data.y, data.width, data.height, 25, data.color);
        this.action = action;
        this.content = content ? content : scene.game.config.custom.modal.defaultContent;
        this.setDepth(data.depth).setInteractive();
        this.showModal();
    }
    showModal() {
        this.scene.plugins.get('rexscaleplugin').popup(this, 500)
            .once('complete', () => {
                let title = this.scene.add.text(
                    this.x, this.y - 100, this.content.title.text, this.content.title.styles
                ).setOrigin(0.5).setDepth(4);
                let body = this.scene.add.text(
                    this.x, this.y, this.content.body.text, this.content.body.styles
                ).setOrigin(0.5).setDepth(4);
                this.has_modal = true;
                this.scene.input.on("pointerdown", () => {
                    title.setVisible(false);
                    body.destroy();
                    if (this.has_modal) this.disposeModal();
                    if (this.action) this.action();
                }, this);
            }, this);
    }
    disposeModal() {
        this.scene.plugins.get('rexscaleplugin').scaleDownDestroy(
            this, 500
        ).once('complete', () => { this.has_modal = false; });
    }
}