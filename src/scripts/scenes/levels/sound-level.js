import Level from "../interfaces/level";
import utils from "../../utils.js";

export default class SoundLevel extends Level {
    constructor() {
        super({ key: "level-8" });
    }
    init(props) {
        this.config = {};
        this.ideaMessages = [
            "Maybe you have to enable sound, maybe...",
            "Hot, Cold, Hot, Cold. You understand me?",
            "The closer, more acute"
        ];
        this.finishedMessage = {
            title: "Excelent!",
            body: "It was easy?"
        };
        this.currentLevel = props.currentLevel ? props.currentLevel : this.scene.key.split('-')[1];
        if (props.callback) props.callback(this);
    }
    preload() {
        this.load.setBaseURL("assets").audio(
            'pip', 'audios/pip.mp3'
        );
    }
    create() {
        this.bg = this.addLevelBg(this);
        this.bg.setTint(0);

        this.addReturnButton(this);
        this.addIdeaButton(this);

        this.pip = this.sound.add('pip', {
            mute: false,
            volume: 1,
            rate: 0.1,
            detune: 10,
            seek: 0,
            loop: false,
            delay: 0
        });

        let randomPosition = utils.getRandomPosition(this);

        this.dude = this.add.sprite(
            randomPosition.x, randomPosition.y,
            'dude', 4)
            .setScale(1.5).setTint(0)
            .setInteractive().on("pointerdown", () => {
                this.dude.clearTint();
                this.pip.setMute(true);
                setTimeout(() => {
                    this.addModal(this, this.goNextLevel, this.finishedMessage)
                }, 1000);
            }, this);

        this.input.on("pointerdown", () => {
            this.pip.play();
        }, this);
    }
    update() {
        this.input.on("pointerdown", (pointer) => {
            let distance = Phaser.Math.Distance.BetweenPoints(pointer, this.dude); // a, b: {x, y}
            if (distance < 100) {
                this.pip.setRate(2);
            }
            if (distance > 100 && distance < 200) {
                this.pip.setRate(1.5);
            }
            if (distance > 200 && distance < 300) {
                this.pip.setRate(1);
            }
            if (distance > 300 && distance < 400) {
                this.pip.setRate(1);
            }
            if (distance > 400 && distance < 500) {
                this.pip.setRate(0.5);
            }
        }, this);
        this.resizeLevelBg(this.bg);
    }
}