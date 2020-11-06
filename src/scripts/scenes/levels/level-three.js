import Level from "../interfaces/level.js";

export class LevelThree extends Level {
    constructor() {
        super({
            key: "level-3"
        });
    }
    init() {
        this.rtnBtnDta = {
            x: 50,
            y: 50,
            scale: 0.1,
            depth: 2
        };
        this.ideaBtnDta = {
            x: 550,
            y: 50,
            scale: 0.1,
            depth: 2
        };
        this.dudeDta = {
            x: 550,
            y: 400,
            depth: 0
        };
        this.spotlightDta = {
            x: 400,
            y: 300,
            key: 'linter',
            add: false
        };
    }
    preload() {
        this.load.setBaseURL('../../../assets')
            .image('return', 'images/return.png')
            .image('lamp', 'images/lamp.png')
            .spritesheet(
                'dude', 'images/dude.png',
                { frameWidth: 32, frameHeight: 48 }
            )
            .image('linter', 'images/linter.png');
    }
    create() {
        this.bg = this.add.image(0, 0, 'menu-bg')
            .setOrigin(0)
            .setDepth(1);
        this.bg.tint = new Phaser.Display.Color(0, 0, 0);

        this.returnButton = this.add.image(this.rtnBtnDta.x, this.rtnBtnDta.y, 'return')
            .setScale(this.rtnBtnDta.scale)
            .setDepth(this.ideaBtnDta.depth)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("title-screen");
            });

        this.ideaButton = this.add.image(
            this.ideaBtnDta.x,
            this.ideaBtnDta.y,
            'lamp'
        ).setScale(this.ideaBtnDta.scale)
            .setDepth(this.ideaBtnDta.depth)
            .setInteractive();

        this.dude = this.add.image(this.dudeDta.x, this.dudeDta.y, 'dude')
            .setDepth(this.dudeDta.depth)
            .setInteractive();

        let spotlight = this.make.sprite(this.spotlightDta);

        this.input.on('pointermove', function (pointer) {
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

        this.ideaButton.on("pointerdown", () => {
            this.bg.clearTint()
                .mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
            this.dude.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
            this.dude.on('pointerdown', () => {
                alert("lo encontraste!");
                this.scene.start("title-screen");
            });
        });
    }
}