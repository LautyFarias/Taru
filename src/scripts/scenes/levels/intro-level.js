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
            'Do you have vision problems?',
            "It's in front of you",
            'Click the ******* dude!'
        ];
        this.introMessages = [
            { body: 'Hey! I am very difficult to catch, did you know that?' },
            { body: "You don't believe me?" },
            { body: 'Do you want to try?' },
            { body: 'Here we go!' }
        ];
        this.introMessagesCount = 0;
        this.currentLevel = props.currentLevel ? props.currentLevel : this.scene.key.split('-')[1];
        this.cache.json.add('currentLevel', this.currentLevel);
        if (props.callback) props.callback(this);
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
                this.addModal(
                    this,
                    this.introMessagesCount == this.introMessages.length - 1 ? this.goNextLevel : null,
                    this.introMessages[this.introMessagesCount],
                    300
                );
                this.introMessagesCount++;
            });
    }
    update() {
        this.resizeLevelBg(this.bg);
    }
}