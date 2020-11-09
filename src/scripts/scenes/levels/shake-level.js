import Level from "../interfaces/level.js";
import Shake from 'shake.js';

export default class ShakeLevel extends Level {
    constructor() {
        super({
            key: 'level-5'
        });
    }
    init(props) {
        this.config = {
            dude: {
                x: this.game.renderer.width / 2,
                y: 0,
            }
        };
        this.ideaMessages = [
            'He is hanging',
            'Shake the tree!',
            'Shake your phone'
        ];
        this.finishedMessage = {
            title: {
                text: "Excelent!",
                style: {}
            },
            body: {
                text: "It was easy?",
                style: {}
            }
        };
        this.currentLevel = props.currentLevel ? props.currentLevel : this.scene.key.split('-')[1];
        if (props.callback) props.callback(this);
    }
    preload() {
        this.load.setBaseURL('assets')
            .spritesheet(
                'dude', 'images/dude.png',
                { frameWidth: 32, frameHeight: 48 }
            );
    }
    create() {
        this.addLevelBg(this);
        this.addReturnButton(this);
        this.addIdeaButton(this);

        this.shake = new Shake({
            threshold: 25, // optional shake strength threshold
            timeout: 1000 // optional, determines the frequency of event generation
        });

        this.shake.start();

        this.appearDude = () => {
            this.dude = this.physics.add.sprite(
                this.config.dude.x,
                this.config.dude.y,
                'dude', 4)
                .setScale(1.5).setBounce(1).setCollideWorldBounds(true)
                .setInteractive().on('pointerdown', () => {
                    this.dude.destroy(this);
                    this.addModal(this, this.goNextLevel, this.finishedMessage);
                }, this);
            window.removeEventListener('shake', this.appearDude, false);
            this.shake.stop();
        };

        window.addEventListener('shake', this.appearDude, false);
    }
}