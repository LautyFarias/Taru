export default class LevelsDashboard extends Phaser.Scene {
    constructor() {
        super({
            key: "levels-dashboard"
        });
    }
    init() {
        this.rtnBtnDta = {
            x: 50,
            y: 50,
            scale: 0.1
        };
        this.sceneTtlDta = {
            x: this.game.renderer.width / 2,
            y: 100,
            text: "Pick a Level",
            styles: {
                font: "3em"
            },
            origin: 0.5
        };
        this.btnsDta = {
            x: this.game.renderer.width / 2,
            initialY: 200,
            incrementalY: 100,
            scale: 0.25,
            cant: 5
        };
    }
    preload() {
        this.load.setBaseURL('../../assets')
            .image('button', 'images/square.png')
            .image('return', 'images/return.png');
    }
    create() {
        this.add.image(0, 0, 'menu-bg')
            .setOrigin(0);

        this.returnButton = this.add.image(this.rtnBtnDta.x, this.rtnBtnDta.y, 'return')
            .setScale(this.rtnBtnDta.scale)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("title-screen");
            });

        /** text(x, y, text, style) */
        this.add.text(
            this.sceneTtlDta.x,
            this.sceneTtlDta.y,
            this.sceneTtlDta.text,
            this.sceneTtlDta.styles
        ).setOrigin(this.sceneTtlDta.scale);

        this.buttons = [];

        for (let i = 0; i < this.btnsDta.cant; i++) {
            this.buttons[i] = this.add.image(
                this.btnsDta.x,
                this.btnsDta.initialY + (this.btnsDta.incrementalY * (i + 1)),
                'button'
            ).setScale(this.btnsDta.scale)
                .setInteractive()
                .on("pointerdown", () => {
                    this.scene.start("level-" + (i + 1));
                });
        }
    }
}
