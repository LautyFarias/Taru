export class Options extends Phaser.Scene {
    constructor() {
        super({
            key: "options"
        });
    }
    init() {
        self.gameWidth = this.game.renderer.width;
        self.halfWidth = gameWidth / 2;
        self.widthTQ = gameWidth / 3;
        self.gameHeight = this.game.renderer.height;
    }
    preload() {
        this.load.setBaseURL('../../assets');

        this.load.svg('sound-avaible', 'svg/sound-avaible.svg');
        this.load.svg('sound-inavaible', 'svg/sound-inavaible.svg');
        this.load.image('return', 'images/return.png');
    }
    create() {
        this.add.image(0, 0, 'menu-bg').setOrigin(0);

        this.returnButton = this.add.image(50, 50, 'return');
        this.returnButton.setScale(0.1);

        let soundInavaible = this.add.image(widthTQ, 250, 'sound-inavaible');
        soundInavaible.setScale(0.4);
        let soundAvaible = this.add.image(gameWidth - widthTQ, 250, 'sound-avaible');
        soundAvaible.setScale(0.1);

        this.add.text(
            halfWidth, gameHeight - gameHeight / 3 - 100,
            "Icons made by Freepik"
        ).setOrigin(0.5);
        this.add.text(
            halfWidth, gameHeight - gameHeight / 3, "From www.flaticon.local"
        ).setOrigin(0.5);

        this.returnButton.setInteractive();
        this.returnButton.on("pointerdown", () => {
            this.scene.start("menu");
        });
    }
}