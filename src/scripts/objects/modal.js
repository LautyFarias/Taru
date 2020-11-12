import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
export default class Modal extends RoundRectangle {
    constructor(scene, action, content, data, time) {
        super(scene, data.x, data.y, data.width, data.height, 25, data.color);
        this.time = time ? time : 500;
        this.action = action;
        this.content = content;
        this.setDepth(data.depth).setInteractive();
        this.showModal();
    }
    showModal() {
        this.scene.plugins.get('rexscaleplugin').popup(this, this.time)
            .once('complete', () => {
                if (this.content.title) {
                    var title = this.scene.add.text(
                        this.x, this.y - 100,
                        this.content.title,
                        this.scene.game.config.custom.modal.contentStyle.title
                    ).setOrigin(0.5).setDepth(4);
                }
                let body = this.scene.add.text(
                    this.x, this.y, this.content.body,
                    this.scene.game.config.custom.modal.contentStyle.body
                ).setOrigin(0.5).setDepth(4);
                this.has_modal = true;
                this.scene.input.on("pointerdown", () => {
                    if (this.content.title) title.destroy();
                    body.destroy();
                    if (this.has_modal) this.disposeModal();
                    if (this.action) this.action();
                }, this);
            }, this);
    }
    disposeModal() {
        this.scene.plugins.get('rexscaleplugin').scaleDownDestroy(
            this, this.time
        ).once('complete', () => { this.has_modal = false; });
    }
}