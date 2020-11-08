import Push from "push.js";
import Level from "../interfaces/level.js";

export default class LevelFour extends Level {
    constructor() {
        super({
            key: "level-4"
        });
    }
    init(props) {
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
            x: this.game.renderer.width / 2,
            y: this.game.renderer.height / 2,
            origin: 0.5,
            depth: 0
        };
        this.currentLevel = props.currentLevel ? props.currentLevel : this.scene.key.split('-')[1];
        if (props.callback) props.callback(this);
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
        this.bg = this.add.image(0, 0, 'menu-bg').setOrigin(0);

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
                this.showIdeaModal();
            });

        this.sendNotification = () => {
            Push.create("Insert uwu text, bibi pls", {
                icon: this.load.baseURL + '/images/lamp.png',
                requireIteraction: true,
                silent: true,
                onClick: this.notificationCallback
            });
        };

        this.notificationCallback = () => {
            this.dude = this.add.image(
                this.dudeDta.x,
                this.dudeDta.y,
                'dude'
            ).setOrigin(this.dudeDta.origin)
                .setDepth(this.dudeDta.depth)
                .setInteractive()
                .on('pointerdown', () => {
                    this.addModal(this, this.goNextLevel);
                });
            Push.clear();
        };

        setTimeout(this.sendNotification, 3000);
    }
}