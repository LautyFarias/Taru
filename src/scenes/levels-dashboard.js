export class LevelsDashboard extends Phaser.Scene {
    constructor() {
        super({
            key: "levels-dashboard"
        });
    }
    init() { }
    preload() {
        this.load.setBaseURL('../../assets');
        
        this.load.image('button', 'images/square.png');
        this.load.image('return', 'images/return.png');
    }
    create() {
        this.add.image(0, 0, 'menu-bg').setOrigin(0);

        this.returnButton = this.add.image(50, 50, 'return');
        this.returnButton.setScale(0.1);

        /** text(x, y, text, style) */
        this.add.text(
            this.game.renderer.width / 2, 100, "Pick a level", { font: "3em" }
        ).setOrigin(0.5);

        this.buttons = [];

        for (let i = 0; i < 5; i++) {
            this.buttons[i] = this.add.image(
                this.game.renderer.width / 2, 200 + (100 * (i + 1)), 'button'
            );
            this.buttons[i].setScale(0.25);
            this.buttons[i].setInteractive();
            this.buttons[i].on("pointerdown", () => {
                console.log("nivel " + (i + 1));
                this.scene.start("level-" + (i + 1));
            });
        }

        this.returnButton.setInteractive();
        this.returnButton.on("pointerdown", () => {
            this.scene.start("menu");
        });
    }
}
