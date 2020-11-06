import Level from "../interfaces/level.js";
import IdeaModal from "../interfaces/idea-modal.js";

export class LevelFive extends Level {
    constructor() {
        super({
            key: "level-5"
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
            x: this.game.renderer.width / 2,
            y: this.game.renderer.height / 2
        };
        this.wallsDta = {
            initialX: 10,
            incrementalX: 0,
            initialY: 10,
            incrementalY: 0,
            cant: 100
        };
        this.ideaMessage = "Dale boludon!";
    }
    preload() {
        this.load.plugin(
            'rexpinchplugin',
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js',
            true
        );
        this.load.setBaseURL('assets')
            .spritesheet('dude',
                'images/dude.png',
                { frameWidth: 32, frameHeight: 48 }
            )
            .image('return', 'images/return.png')
            .image('lamp', 'images/lamp.png');

    }
    create() {
        this.bg = this.add.image(0, 0, 'menu-bg')
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

        this.dude = this.add.image(
            this.dudeDta.x,
            this.dudeDta.y,
            'dude'
        ).setScale(0.1);

        var dragScale = this.plugins.get('rexpinchplugin').add(this);

        var camera = this.cameras.main;
        let defaultCameraZoom = camera.zoom;
        dragScale.on('pinch', function (dragScale) {
            var scaleFactor = dragScale.scaleFactor;
            if (
                camera.zoom * scaleFactor >= defaultCameraZoom &&
                camera.zoom * scaleFactor <= 30
            ) {
                camera.zoom *= scaleFactor;
            }
            if (camera.zoom * scaleFactor <= 30) {
                this.dude.setInteractive().on('pointerdown', () => {
                    this.createWindow(IdeaModal);
                    this.scene.start("title-screen");
                });
            }
        }, this);
    }
}