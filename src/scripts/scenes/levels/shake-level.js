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
            title: "Excelent!",
            body: "It was easy?"
        };
        if (props.callback) props.callback(this);
    }
    create() {
        this.bg = this.addLevelBg(this);

        this.addReturnButton(this);
        this.addIdeaButton(this);

        this.shake = new Shake({
            threshold: 10, // optional shake strength threshold
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
    update() {
        this.resizeLevelBg(this.bg);
    }
}