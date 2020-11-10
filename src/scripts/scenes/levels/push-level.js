import Push from "push.js";
import Level from "../interfaces/level.js";

export default class PushLevel extends Level {
    constructor() {
        super({ key: "level-9" });
    }
    init(props) {
        this.config = {
            dude: {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2,
                origin: 0.5,
                depth: 0
            }
        };
        this.ideaMessages = [
            'Why not wait?',
            'Maybe you get a message',
            'Look your notifications'
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
        this.load.setBaseURL('../../../assets').spritesheet(
            'dude', 'images/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    create() {
        this.addLevelBg(this);
        this.addReturnButton(this);
        this.addIdeaButton(this);

        this.sendNotification = () => {
            Push.create("You found me!", {
                icon: this.load.baseURL + '/images/lamp.png',
                requireIteraction: true,
                silent: true,
                onClick: this.notificationCallback
            });
        };

        this.notificationCallback = () => {
            this.dude = this.add.image(
                this.config.dude.x,
                this.config.dude.y,
                'dude', 4)
                .setOrigin(this.config.dude.origin).setDepth(this.config.dude.depth)
                .setScale(1.5).setInteractive().on('pointerdown', () => {
                    this.addModal(this, this.goNextLevel, this.finishedMessage);
                }, this);
            Push.clear();
        };

        setTimeout(this.sendNotification, 3000);
    }
}