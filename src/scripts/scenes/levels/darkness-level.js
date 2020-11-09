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
                depth: -1
            },
            spotlight: {
                x: 400,
                y: 300,
                key: 'linter',
                add: false
            }
        };
        this.finishedMessage = {
            title: {
                text: "Excelent!",
                style: {}
            },
            body: {
                text: "It was easy?",
                style: {}
            }
        };
        this.currentLevel = props.currentLevel ? props.currentLevel : this.scene.key.split('-')[1];
        if (props.callback) props.callback(this);
    }
    preload() {
        this.load.setBaseURL('assets')
            .spritesheet(
                'dude', 'images/dude.png',
                { frameWidth: 32, frameHeight: 48 })
            .image('linter', 'images/linter.png');
    }
    create() {
        this.bg = this.addLevelBg(this);
        this.bg.tint = new Phaser.Display.Color(0, 0, 0);

        this.addReturnButton(this);
        this.addIdeaButton(this, () => {
            this.bg.clearTint().setMask(new Phaser.Display.Masks.BitmapMask(this, spotlight));
            this.dude.setMask(new Phaser.Display.Masks.BitmapMask(this, spotlight));
            this.dude.on('pointerdown', () => {
                this.addModal(this, this.goNextLevel, this.finishedMessage);
            });
        });

        this.dude = this.add.image(this.config.dude.x, this.config.dude.y, 'dude', 4)
            .setScale(1.5).setDepth(this.config.dude.depth).setInteractive();

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
}