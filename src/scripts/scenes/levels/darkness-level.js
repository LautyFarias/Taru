import utils from "../../utils.js";
import Level from "../interfaces/level.js";

export default class DarknessLevel extends Level {
    constructor() {
        super({ key: "level-6" });
    }
    init(props) {
        this.config = {
            dude: {
                x: 550,
                y: 400,
                depth: -1,
                scale: 1.5
            },
            spotlight: {
                x: 400,
                y: 300,
                key: 'linter',
                add: false
            }
        };
        this.finishedMessage = {
            title: "Excelent!",
            body: "Aren't lanterns life saviours?"
        };
        if (props.callback) props.callback(this);
    }
    preload() {
        this.load.image('linter', 'images/linter.png');
    }
    create() {
        this.bg = this.addBg(this, 'space-bg');
        this.bg.tint = new Phaser.Display.Color(0, 0, 0);

        this.addReturnButton(this);
        this.addIdeaButton(this, () => {
            this.bg.clearTint().setMask(new Phaser.Display.Masks.BitmapMask(this, spotlight));
            this.dude.setMask(new Phaser.Display.Masks.BitmapMask(this, spotlight));
            this.dude.on('pointerdown', () => {
                this.addModal(this, this.goNextLevel, this.finishedMessage);
            });
        });

        let randomPosition = utils.getRandomPosition(this);

        this.dude = this.add.image(
            randomPosition.x, randomPosition.y, 'dude', 4)
            .setScale(this.config.dude.scale).setDepth(this.config.dude.depth)
            .setInteractive();

        let spotlight = this.make.sprite(this.config.spotlight);

        this.input.on('pointermove', pointer => {
            spotlight.x = pointer.x;
            spotlight.y = pointer.y;
        });

        this.tweens.add({
            targets: spotlight,
            alpha: 0,
            duration: 2000,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });
    }
    update() {
        this.resizeLevelBg(this.bg);
    }
}