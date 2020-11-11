import utils from "../../utils.js";
import Level from "../interfaces/level.js";

export default class FindTaru extends Level {
    constructor() {
        super({
            key: "level-10"
        });
    }
    init(props) {
        this.config = {
            dude: {
                scale: 1.5
            },
            clouds: {
                initialX: 10,
                incrementalX: 0,
                initialY: 10,
                incrementalY: 0,
                cant: 100
            }
        };
        this.ideaMessages = [
            'Draggin the clouds!',
            'You have to are fast!',
            'He moves between the clouds!'
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
    preload() { }
    create() {
        this.bg = this.addLevelBg(this);
        
        this.addReturnButton(this);
        this.addIdeaButton(this);

        let randomPosition = utils.getRandomPosition(this);

        this.dude = this.add.sprite(
            randomPosition.x,
            randomPosition.y,
            'dude', 4
        ).setScale(this.config.dude.scale).setInteractive().on('pointerdown', () => {
            this.dude.setVisible(false);
            this.addModal(this, this.goNextLevel, this.finishedMessage);
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.clouds = [];

        for (let i = 0, y = 50; y < this.game.renderer.height; i++) {
            this.clouds[i] = this.add.image(
                this.game.renderer.width / 6 * i,
                (i == 9 ? y += 100 : y),
                'cloud'
            ).setScale(1).setInteractive({ draggable: true });
            this.input.setDraggable(this.clouds[i]);
            if (i == 9) i = -1;
        }

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                utils.moveDude(this.dude, utils.getRandomPosition(this), this);
            },
            callbackScope: this,
            loop: true
        });

    }
    update() {
        this.resizeLevelBg(this.bg)
    }
}