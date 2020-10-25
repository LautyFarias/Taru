import { Level } from "../interfaces/level.js";
import { IdeaModal } from "../modals/idea-modal.js";

export class LevelOne extends Level {
    constructor() {
        super({
            key: "level-1"
        });
    }
    init() {
        this.ideaMessage = "Dale boludon!";
    }
    preload() {
        this.load.setBaseURL('../../../assets');

        this.load.spritesheet('dude',
            'images/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.image('return', 'images/return.png');
        this.load.image('lamp', 'images/lamp.png');
    }
    create() {
        this.add.image(0, 0, 'menu-bg').setOrigin(0);

        this.returnButton = this.add.image(50, 50, 'return');
        this.returnButton.setScale(0.1);
        this.returnButton.setDepth(2);

        this.ideaButton = this.add.image(550, 50, 'lamp');
        this.ideaButton.setScale(0.1);
        this.ideaButton.setDepth(2);

        this.dude = this.add.image(600, 0, 'dude');

        this.wall = [];

        for (let i = 0; i < 100; i++) {
            this.wall[i] = this.add.image(10 * (i + 1), 10 * (i + 1), 'button');
            this.wall[i].setInteractive({ draggable: true });
            this.input.setDraggable(this.wall[i]);
        }

        this.dude.setInteractive(/*{ draggable: true }*/);

        // this.input.setDraggable(this.dude);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.dude.on('pointerdown', (event) => {
            alert("lo encontraste!");
            this.scene.start("menu");           
        });

        this.returnButton.setInteractive();
        this.returnButton.on("pointerdown", () => {
            this.scene.start("menu");
        });

        this.ideaButton.setInteractive();
        this.ideaButton.on("pointerdown", () => {
            this.createWindow(IdeaModal);
        });
    }
}