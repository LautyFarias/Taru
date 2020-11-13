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
            'Why don\'t you wait?',
            'Maybe you\'ll get a message',
            'Look at your notifications'
        ];
        this.finishedMessage = {
            title: "Excelent!",
            body: "Communication is key"
        };
        if (props.callback) props.callback(this);
    }
    preload() { }
    create() {
        this.bg = this.addLevelBg(this);

        this.addReturnButton(this);
        this.addIdeaButton(this);

        Push.config({
            fallback: (payload) => {
                this.notificationCallback();
            }
        });

        this.sendNotification = () => {
            Push.create("You found me!", {
                icon: 'icons/icon-48x48.png',
                // requireIteraction: true,
                // silent: true,
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
    update() {
        this.resizeLevelBg(this.bg);
    }
}