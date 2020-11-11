import Level from "../interfaces/level.js";

export default class IntroLevel extends Level {
    constructor() {
        super({ key: "level-1" });
    }
    init(props) {
        this.config = {
            dude: {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2
            }
        };
        this.ideaMessages = [
            'You have vision problems?',
            'It is front',
            'Click the ******* dude!'
        ];
        this.finishedMessage = {
            title: {
                text: "Excelent!",
                style: {}
            },
            body: {
                text: "Was it easy?",
                style: {}
            }
        };
        this.currentLevel = props.currentLevel ? props.currentLevel : this.scene.key.split('-')[1];
        this.cache.json.add('currentLevel', this.currentLevel);
        if (props.callback) props.callback(this);
    }
    preload() {
        this.load.spritesheet(
            'dude', 'images/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    create() {
        this.bg = this.addLevelBg(this);
        this.addReturnButton(this);
        this.addIdeaButton(this);

        this.dude = this.add.sprite(
            this.config.dude.x,
            this.config.dude.y,
            'dude', 4)
            .setScale(1.5)
            .setInteractive().on('pointerdown', () => {
                this.addModal(this, this.goNextLevel, this.finishedMessage);
            });
    }
    update() {
        this.resizeLevelBg(this.bg);
    }
}