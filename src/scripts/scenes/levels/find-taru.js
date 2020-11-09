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
            starts: {
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
    preload() {
        this.load.setBaseURL('assets')
            .spritesheet('dude',
                'images/dude.png',
                { frameWidth: 32, frameHeight: 48 }
            );
    }
    create() {
        this.addLevelBg(this);
        this.addReturnButton(this);
        this.addIdeaButton(this);

        this.dude = this.add.image(
            this.config.dude.x,
            this.config.dude.y,
            'dude', 4
        ).setScale(1.5).setInteractive().on('pointerdown', () => {
            this.addModal(this, this.goNextLevel, this.finishedMessage);
        });

        this.walls = [];

        for (let i = 0; i < this.walls.cant; i++) {
            this.walls[i] = this.add.image(
                this.walls.initialX * (i + 1),
                this.walls.initialY * (i + 1),
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