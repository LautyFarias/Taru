import { Level } from "../interfaces/level.js";
import { IdeaModal } from "../modals/idea-modal.js";
import Shake from 'shake.js';

export class LevelTwo extends Level {
    constructor() {
        super({
            key: 'level-2'
        });
    }
    init() { }
    preload() {
        this.load.setBaseURL('../../../assets')
            .spritesheet(
                'dude', 'images/dude.png',
                { frameWidth: 32, frameHeight: 48 }
            )
            .image('return', 'images/return.png')
            .image('lamp', 'images/lamp.png');
    }
    create() {
        this.add.image(0, 0, 'menu-bg')
            .setOrigin(0);

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
            .setInteractive()
            .on("pointerdown", () => {
                this.createWindow(IdeaModal);
            });

        this.shake = new Shake({
            threshold: 25, // optional shake strength threshold
            timeout: 1000 // optional, determines the frequency of event generation
        });

        this.shake.start();

        this.appearDude = () => {
            alert('shake!');
            this.dude = this.add.image(
                this.game.renderer.width / 2,
                this.game.renderer.height / 2,
                'dude'
            )
                .setInteractive()
                .on('pointerdown', () => {
                    alert("lo encontraste!");
                    this.scene.start("menu");
                });
            window.removeEventListener('shake', this.appearDude, false);
            this.shake.stop();
        };

        window.addEventListener('shake', this.appearDude, false);
    }
}