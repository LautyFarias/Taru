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
                x: 600,
                y: 0
            },
            stars: {
                initialX: 10,
                incrementalX: 0,
                initialY: 10,
                incrementalY: 0,
                cant: 100
            }
        };
        this.ideaMessages = [
            'Draggin the stars!',
            'You have to are fast!',
            'He moves between the stars!'
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
        this.addLevelBg(this);
        this.addReturnButton(this);
        this.addIdeaButton(this);

        this.dude = this.add.sprite(
            this.config.dude.x,
            this.config.dude.y,
            'dude', 4
        ).setScale(1.5).setInteractive().on('pointerdown', () => {
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

        this.stars = [];

        for (let i = 0, y = 50; y < this.game.renderer.height; i++) {
            this.stars[i] = this.add.image(
                100 * i,
                (i == 9 ? y += 100 : y),
                'button'
            ).setScale(0.3).setInteractive({ draggable: true });
            this.input.setDraggable(this.stars[i]);
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

    }
}