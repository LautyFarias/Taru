import MenuScreen from "./interfaces/menu-screen";
export default class LevelsDashboard extends MenuScreen {
    constructor() {
        super({ key: "levels-dashboard" });
    }
    init() {
        this.config = {
            title: {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 6,
                text: "Pick a Level",
                styles: {
                    font: "3em"
                },
                origin: 0.5
            },
            btns: {
                x: this.game.renderer.width / 6,
                y: this.game.renderer.height / 2.5,
                rowSpacing: 250,
                scale: 0.25,
                cant: 10,
                textStyles: {
                    font: '700 3em Roboto'
                }
            }
        };
    }
    preload() {
        this.load.image('level-button', 'images/square.png');
    }
    create() {
        this.bg = this.addBg(this);
        this.addReturnButton(this);

        /** text(x, y, text, style) */
        this.add.text(
            this.config.title.x,
            this.config.title.y,
            this.config.title.text,
            this.config.title.styles
        ).setOrigin(this.config.title.scale);

        this.buttons = [];
        this.buttonsText = [];

        for (
            let i = 1, row = 0, column = 1;
            i <= this.config.btns.cant;
            i++, column++
        ) {
            if (column > this.config.btns.cant / 2) {
                row++;
                column = 1;
            }

            this.buttons[i] = this.add.image(
                this.config.btns.x * column,
                column % 2 === 0 ? this.config.btns.y + (this.config.btns.rowSpacing * row) : this.config.btns.y + (this.config.btns.rowSpacing * row) + 50,
                'level-button'
            ).setScale(this.config.btns.scale).setTint(0, 0, 0, 0);

            if (i <= this.cache.json.get('currentLevel')) {
                this.buttons[i].clearTint().setInteractive().on('pointerdown', () => {
                    this.scene.start(`level-${i}`, {
                        currentLevel: i,
                        callback: scene => scene.cameras.main.fadeIn(1000, 0, 0, 0)
                    });
                }, this);
            }

            this.buttonsText[i] = this.add.text(
                this.config.btns.x * column,
                column % 2 === 0 ? this.config.btns.y + (this.config.btns.rowSpacing * row) : this.config.btns.y + (this.config.btns.rowSpacing * row) + 50,
                i, this.config.btns.textStyles
            ).setOrigin(0.5);
        }
    }
    update() {
        this.resizeBg(this.bg);
    }
}
