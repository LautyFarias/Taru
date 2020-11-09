import Level from "../interfaces/level";

export default class HoldPressedLevel extends Level {
    constructor() {
        super({ key: 'level-2' });
    }
    init(props) {
        this.config = {
            dude: {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2
            }
        };
        this.ideaMessages = [
            'It is slippery',
            'Strangle it!',
            'Hold clicked the dude'
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
        this.cache.json.add('currentLevel', this.currentLevel);
        if (props.callback) props.callback(this);
    }
    preload() { }
    create() {
        this.addLevelBg(this);
        this.addIdeaButton(this);
        this.addReturnButton(this);

        this.dude = this.physics.add.sprite(
            this.config.dude.x,
            this.config.dude.y,
            'dude', 4)
            .setScale(1.5)
            .setInteractive().on("pointerup", () => {
                this.moveDude();
            }, this);

        this.dude.body.setAllowGravity(false);

        this.input.setDraggable(this.dude).dragTimeThreshold = 2000;

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

        this.dude.moveTo = this.plugins.get('rexmovetoplugin').add(this.dude, {
            speed: 400,
        }).on('complete', function () {
            this.dude.anims.play('turn', true);
        }, this);
    }
    update() {
        this.dude.on("dragstart", () => {
            this.dude.catched = true;
        }, this);
        if (this.dude.catched) {
            delete this.dude.catched;
            this.addModal(this, this.goNextLevel, this.finishedMessage);
        }
    }
    moveDude() {
        let randomPosition = this.getRandomPosition();
        if (randomPosition.x > this.dude.x) {
            this.dude.anims.play('right', true);
        }
        if (randomPosition.x < this.dude.x) {
            this.dude.anims.play('left', true);
        }
        this.dude.moveTo.moveTo(randomPosition.x, randomPosition.y);
    }
    getRandomPosition() {
        let randomX = Phaser.Math.Between(
            this.game.renderer.width - (this.game.renderer.width - 100),
            this.game.renderer.width - 100
        );
        let randomY = Phaser.Math.Between(
            this.game.renderer.height - (this.game.renderer.height - 200),
            this.game.renderer.height - 200
        );
        return {
            x: randomX,
            y: randomY
        };
    }
}