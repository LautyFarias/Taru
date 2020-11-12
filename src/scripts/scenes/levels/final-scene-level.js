import utils from "../../utils.js";
import Level from "../interfaces/level.js";

export default class FinalSceneLevel extends Level {
    constructor() {
        super({ key: "level-11" });
    }
    init(props) {
        this.finishedMessages = {
            title: "Thanks for playing!",
            body: "Created by: Mamaní Edith, Farias Lautaro"
        };
        this.passedMessage = {
            title: "Kabooom!",
            body: "Did you want that to happen?"
        };
        if (props.callback) props.callback(this);
    }
    create() {
        this.bg = this.addLevelBg(this);

        this.generateDude = () => {
            this.miniDude = this.add.sprite('dude', 4)
                .setRandomPosition().setScale(1);
            utils.moveDude(this.miniDude, {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2
            }, (gameObject) => {
                gameObject.setVisible(false);
                this.dude.setScale(this.dude.scale + 0.1);
            });
        };

        this.dude = this.add.sprite(
            this.game.renderer.width / 2,
            this.game.renderer.height / 2,
            'dude', 4).setScale(1)
            .setInteractive().on("pointerdown", this.generateDude, this);
    }
    update() {
        this.resizeLevelBg(this.bg);
        if (this.dude.displayHeight > 300 && !this.stopUpdate) {
            this.stopUpdate = true;
            this.addModal(this, null, this.finishedMessages);
        }
        if (this.dude.displayHeight > 500 && !this.stopUpdate2) {
            this.stopUpdate2 = true;
            this.addModal(this, () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(
                    Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                        this.scene.start("title-screen");
                    });
            }, this.passedMessage);
        }
    }
}