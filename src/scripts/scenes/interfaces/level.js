import MenuScreen from "./menu-screen.js";
import IdeaButton from "../../objects/idea-button.js";
export default class Level extends MenuScreen {
    addLevelBg() {
        this.bg = this.add.image(
            this.game.config.custom.bg.x,
            this.game.config.custom.bg.y,
            'level-bg'
        ).setOrigin(this.game.config.custom.bg.origin);
    }
    addIdeaButton(
        scene, action,
        data = this.game.config.custom.ideaButton,
        modal = this.game.config.custom.modal
    ) {
        scene.children.add(new IdeaButton(scene, action, data, modal));
    }
    goNextLevel() {
        let scene = this.scene;
        this.scene.cameras.main.fadeOut(1000, 0, 0, 0);
        this.scene.cameras.main.once(
            Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                scene.scene.start(
                    `level-${(scene.currentLevel + 1)}`, {
                    currentLevel: scene.currentLevel + 1,
                    callback: scene => scene.cameras.main.fadeIn(1000, 0, 0, 0)
                });
                this.destroy();
            });
    }
}