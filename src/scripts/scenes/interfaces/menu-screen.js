import ReturnButton from "../../objects/return-button.js";
import Modal from "../../objects/modal.js";
import Button from "../../objects/button.js";
export default class MenuScreen extends Phaser.Scene {
    addBg(scene, bgKey) {
        return scene.add.image(
            scene.game.config.custom.bg.x,
            scene.game.config.custom.bg.y,
            bgKey)
            .setOrigin(scene.game.config.custom.bg.origin);
    }
    addButton(scene, action, text, data) {
        return scene.children.add(new Button(scene, data, action, text));
    }
    addModal(scene, action, text, time, data = this.game.config.custom.modal) {
        return scene.children.add(new Modal(scene, action, text, data, time));
    }
    addReturnButton(scene, action, data = this.game.config.custom.returnButton) {
        return scene.children.add(new ReturnButton(scene, action, data));
    }
    resizeBg(bg) {
        bg.setDisplaySize(
            bg.scene.game.renderer.width,
            bg.scene.game.renderer.height
        );
    }
}