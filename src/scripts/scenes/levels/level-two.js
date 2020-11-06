import Level from "../interfaces/level.js";
import IdeaModal from "../interfaces/idea-modal.js";
import Shake from 'shake.js';

export class LevelTwo extends Level {
    constructor() {
        super({
            key: 'level-2'
        });
    }
    init() {
        this.rtnBtnDta = {
            x: 50,
            y: 50,
            scale: 0.1
        };
        this.ideaBtnDta = {
            x: 550,
            y: 50,
            scale: 0.1,
            depth: 2,
        };
        this.dudeDta = {
            x: this.game.renderer.width,
            y: this.game.renderer.height,
        };
    }
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

        this.returnButton = this.add.image(this.rtnBtnDta.x, this.rtnBtnDta.y, 'return')
            .setScale(this.rtnBtnDta.scale)
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
                this.dudeDta.x,
                this.dudeDta.y,
                'dude'
            ).setInteractive()
                .on('pointerdown', () => {
                    alert("lo encontraste!");
                    this.scene.start("title-screen");
                });
            window.removeEventListener('shake', this.appearDude, false);
            this.shake.stop();
        };

        window.addEventListener('shake', this.appearDude, false);
    }
}