import MenuScreen from "./menu-screen.js";
import IdeaButton from "../../objects/idea-button.js";
export default class Level extends MenuScreen {
    addLevelBg() {
        return this.add.image(
            this.game.config.custom.bg.x,
            this.game.config.custom.bg.y,
            'level-bg'
        ).setOrigin(this.game.config.custom.bg.origin);
    }
    addIdeaButton(
        scene, action,
        data = this.game.config.custom.ideaButton,
    ) {
        return scene.children.add(new IdeaButton(scene, action, data));
    }
    goNextLevel() {
        let thisScene = this.scene;
        this.scene.cameras.main.fadeOut(1000, 0, 0, 0);
        this.scene.cameras.main.once(
            Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                thisScene.scene.start(
                    `level-${(thisScene.currentLevel + 1)}`, {
                    callback: scene => {
                        scene.cache.json.add('currentLevel', thisScene.currentLevel + 1);
                        scene.currentLevel = scene.cache.json.get('currentLevel');
                        if (scene.cache.json.get('levelUnlocked') < scene.currentLevel) {
                            scene.cache.json.add('levelUnlocked', scene.currentLevel);
                        }
                        scene.cameras.main.fadeIn(1000, 0, 0, 0);
                    }
                });
                this.destroy();
            });
    }
    resizeLevelBg(bg) {
        bg.setDisplaySize(bg.scene.game.renderer.width, bg.scene.game.renderer.height);
    }
}