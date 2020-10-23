export class LevelTwo extends Phaser.Scene {
    constructor() {
        super({
            key: "level-2"
        });
    }
    init() { }
    preload() {
        this.load.image('wall', 'https://labs.phaser.io/assets/sprites/platform.png');
        this.load.spritesheet('dude',
            'https://labs.phaser.io/assets/sprites/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    create() {
        this.add.image(0, 0, 'menu-bg').setOrigin(0);

        let platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'wall').setScale(2).refreshBody();

        platforms.create(600, 400, 'wall');
        platforms.create(50, 250, 'wall');
        platforms.create(750, 220, 'wall');

        self.player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

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

        self.cursors = this.input.keyboard.createCursorKeys();

    }
    update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-1000000000);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(1000000000);

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }

    }
}