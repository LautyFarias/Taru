export class LevelThree extends Phaser.Scene {
    constructor() {
        super({
            key: "level-3"
        });
    }
    init() { }
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

        this.returnButton = this.add.image(50, 50, 'return')
            .setScale(0.1)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("menu");
            });

        this.ideaButton = this.add.image(550, 50, 'lamp')
            .setScale(0.1)
            .setDepth(2)
            .setInteractive();

        this.dude = this.add.image(550, 400, 'dude')
            .setDepth(0)
            .setInteractive();

        let spotlight = this.make.sprite({
            x: 400,
            y: 300,
            key: 'linter',
            add: false
        });

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
                this.scene.start("menu");
            });
        });
    }
}