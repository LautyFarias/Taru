export class LevelsDashboard extends Phaser.Scene {
    constructor() {
        super({
            key: "levels-dashboard"
        });
    }
    init() { }
    preload() {
        this.load.image('button', '../../assets/images/square.png');
    }
    create() {
        this.add.image(0, 0, 'menu-bg').setOrigin(0);
        
        /** text(x, y, text, style) */
        this.add.text(
            this.game.renderer.width / 2, 100, "Pick a level", {font: "3em"}
        ).setOrigin(0.5);

        let buttons = [];

        for (let i=0; i < 5; i++) {
            buttons[i] = this.add.image(
                this.game.renderer.width / 2, 200 + (100 * (i+1)), 'button'
            );    
            buttons[i].setScale(0.25);
            buttons[i].setInteractive();
            buttons[i].on("pointerdown", () => {
                console.log("nivel " + (i + 1));
            });
        }
    }
}