import Level from "../interfaces/level.js";

export default class PinchLevel extends Level {
    constructor() {
        super({
            key: "level-4"
        });
    }
    init(props) {
        this.config = {
            dude: {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2,
                scale: 0.1
            }
        };
        this.ideaMessages = [
            'Now I understand that you don\'t see it',
            'It is very small',
            'You have to pinch the screen'
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
        ).setScale(this.config.dude.scale);

        let dragScale = this.plugins.get('rexpinchplugin').add(this);

        let camera = this.cameras.main;
        let defaultCameraZoom = camera.zoom;
        dragScale.on('pinch', dragScale => {
            let scaleFactor = dragScale.scaleFactor;
            if (
                camera.zoom * scaleFactor >= defaultCameraZoom &&
                camera.zoom * scaleFactor <= 30
            ) {
                camera.zoom *= scaleFactor;
            }
            if (camera.zoom * scaleFactor <= 30) {
                this.dude.setInteractive().on('pointerdown', () => {
                    this.addModal(this, this.goNextLevel, this.finishedMessage);
                }, this);
            }
        }, this);
    }
}