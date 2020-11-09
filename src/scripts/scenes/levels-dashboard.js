import MenuScreen from "./interfaces/menu-screen";
export default class LevelsDashboard extends MenuScreen {
    constructor() {
        super({ key: "levels-dashboard" });
    }
    init() {
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
            x: 100,
            initialY: 250,
            incrementalY: 100,
            scale: 0.25,
            cant: 10
        };
    }
    preload() {
        this.load.setBaseURL('assets').image('button', 'images/square.png');
    }
    create() {
        this.addBg(this);
        this.addReturnButton(this);

        /** text(x, y, text, style) */
        this.add.text(
            this.sceneTtlDta.x,
            this.sceneTtlDta.y,
            this.sceneTtlDta.text,
            this.sceneTtlDta.styles
        ).setOrigin(this.sceneTtlDta.scale);

        this.buttons = [];

        for (
            let i = 1, row = 1, column = 1;
            i <= this.btnsDta.cant;
            i++, column++
        ) {
            if (column > this.btnsDta.cant / 2) {
                row++;
                column = 1;
            }
            // this.addButton(this, this.scene.start("level-" + i, {
            //     currentLevel: i,
            //     callback: scene => scene.cameras.main.fadeIn(1000, 0, 0, 0)
            // }), i, {
            //     width: 100,
            //     height: 100,
            //     x: this.btnsDta.x * column,
            //     y: column % 2 === 0 ? this.btnsDta.initialY * row : this.btnsDta.initialY * row + 50,
            //     color: 0xfcea2b
            // });
            this.buttons[i] = this.add.image(
                this.btnsDta.x * column,
                column % 2 === 0 ? this.btnsDta.initialY * row : this.btnsDta.initialY * row + 50,
                'button'
            ).setScale(this.btnsDta.scale).setTint(0, 0, 0, 0);

            if (i <= this.cache.json.get('currentLevel')) {
                this.buttons[i].clearTint().setInteractive().on('pointerdown', () => {
                    this.scene.start(`level-6`, {
                        currentLevel: i,
                        callback: scene => scene.cameras.main.fadeIn(1000, 0, 0, 0)
                    });
                }, this);
            }

            this.add.text(
                this.btnsDta.x * column,
                column % 2 === 0 ? this.btnsDta.initialY * row : this.btnsDta.initialY * row + 50,
                i
            ).setOrigin(0.5);
        }
    }
}
