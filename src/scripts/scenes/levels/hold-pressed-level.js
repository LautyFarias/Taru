import utils from "../../utils";
import Level from "../interfaces/level";

export default class HoldPressedLevel extends Level {
    constructor() {
        super({ key: 'level-2' });
    }
    init(props) {
        this.config = {
            dude: {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2
            }
        };
        this.ideaMessages = [
            "It's sneaky",
            'Catch it!',
            'Keep the dude clicked'
        ];
        this.finishedMessage = {
            title: "Excelent!",
            body: "It was easy?"
        };
        this.currentLevel = props.currentLevel ? props.currentLevel : this.scene.key.split('-')[1];
        this.cache.json.add('currentLevel', this.currentLevel);
        if (props.callback) props.callback(this);
    }
    preload() {
        this.load.audio(
            'taru-sound', 'audios/taru_sound.mp3'
        );
    }
    create() {
        this.bg = this.addLevelBg(this);
        this.addIdeaButton(this);
        this.addReturnButton(this);

        this.dude = this.physics.add.sprite(
            this.config.dude.x,
            this.config.dude.y,
            'dude', 4)
            .setScale(1.5)
            .setInteractive().on("pointerup", () => {
                utils.moveDude(this.dude, utils.getRandomPosition(this), this);
                this.sound.play('taru-sound');
            }, this);

        this.dude.body.setAllowGravity(false);

        this.input.setDraggable(this.dude).dragTimeThreshold = 2000;

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }
    update() {
        this.dude.on("dragstart", () => {
            this.dude.catched = true;
        }, this);
        if (this.dude.catched) {
            delete this.dude.catched;
            this.addModal(this, this.goNextLevel, this.finishedMessage);
        }
        this.resizeLevelBg(this.bg);
    }
}