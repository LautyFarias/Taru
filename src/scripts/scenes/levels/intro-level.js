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
            title: "Excelent!",
            message: "It was easy?"
        };
        this.currentLevel = props.currentLevel ? props.currentLevel : this.scene.key.split('-')[1];
        this.cache.json.add('currentLevel', this.currentLevel);
        if (props.callback) props.callback(this);
    }
    preload() {
        this.load.setBaseURL('assets').spritesheet(
            'dude', 'images/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    create() {
        this.addLevelBg(this);
        this.addReturnButton(this);
        this.addIdeaButton(this);

        this.dude = this.add.sprite(
            this.config.dude.x,
            this.config.dude.y,
            'dude', 4
        ).setInteractive().on('pointerdown', () => {
            this.addModal(this, this.goNextLevel, {
                title: this.finishedMessage.title,
                body: this.finishedMessage.message
            });
        });
    }
}