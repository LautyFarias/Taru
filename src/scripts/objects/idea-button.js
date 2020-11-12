export default class IdeaButton extends Phaser.GameObjects.Image {
    constructor(scene, action, data) {
        super(scene, data.x, data.y, 'idea-button');
        this.action = action ? action : this.showIdeaModal;
        this.countIdeas = -1;
        this.setScale(data.scale).setDepth(data.depth)
            .setInteractive().on("pointerdown", () => {
                this.removeInteractive();
                this.setTint(0x555555);
                this.action();
            }, this);

    }
    showIdeaModal() {
        if (this.countIdeas < this.scene.ideaMessages.length - 1) this.countIdeas++;
        this.modal = this.scene.addModal(this.scene, () => {
            this.setInteractive().clearTint();
        }, { body: this.scene.ideaMessages[this.countIdeas] });
    }
}