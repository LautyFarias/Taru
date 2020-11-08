import Level from "../interfaces/level.js";

export default class LevelTen extends Level {
    constructor() {
        super({
            key: "level-10"
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
            x: 600,
            y: 0
        };
        this.wallsDta = {
            initialX: 10,
            incrementalX: 0,
            initialY: 10,
            incrementalY: 0,
            cant: 100
        };
        this.ideaMessage = "Dale boludon!";
        this.currentLevel = props.currentLevel ? props.currentLevel : this.scene.key.split('-')[1];
        if (props.callback) props.callback(this);
    }
    preload() {
        this.load.setBaseURL('../../../assets')
            .spritesheet('dude',
                'images/dude.png',
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
                this.createWindow(IdeaModal);
            });

        this.dude = this.add.image(
            this.dudeDta.x,
            this.dudeDta.y,
            'dude'
        ).setInteractive()
            .on('pointerdown', () => {
                this.addModal(this, this.goNextLevel);
            });

        this.walls = [];

        for (let i = 0; i < this.wallsDta.cant; i++) {
            this.walls[i] = this.add.image(
                this.wallsDta.initialX * (i + 1),
                this.wallsDta.initialY * (i + 1),
                'button'
            ).setInteractive({ draggable: true });
            this.input.setDraggable(this.walls[i]);
        }

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }
}