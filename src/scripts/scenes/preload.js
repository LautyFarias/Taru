export default class Preload extends Phaser.Scene {
    init() {
        var customConfig = {
            startCurrentLevel: 10, // Update this value to unlock all levels
            bg: {
                x: 0,
                y: 0,
                origin: 0,
                img: 'menu-bg.png'
            },
            levelBg: {
                img: 'level-bg.png'
            },
            defaultButton: {
                width: 200,
                height: 100,
                color: 0x00bcd4,
            },
            modal: {
                width: this.game.renderer.width - 100,
                height: this.game.renderer.height - 500,
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2,
                color: 0x00bcd4,
                depth: 3,
                defaultContent: {
                    title: {
                        text: "Default Title",
                        style: {}
                    },
                    body: {
                        text: "Default body",
                        style: {}
                    }
                }
            },
            ideaButton: {
                x: this.game.renderer.width - this.game.renderer.width / 14,
                y: this.game.renderer.height / 14,
                scale: 0.1,
                depth: 2,
                img: 'lamp.png',
                modal: {
                    width: this.game.renderer.width - 100,
                    height: this.game.renderer.height - 500,
                    x: this.game.renderer.width / 2,
                    y: this.game.renderer.height / 2,
                    color: 0x00bcd4,
                    depth: 3
                }
            },
            returnButton: {
                x: this.game.renderer.width / 14,
                y:  this.game.renderer.height / 14,
                scale: 0.15,
                depth: 2,
                img: 'return.png'
            },
        };
        this.game.config.custom = customConfig;
    }
    preload() {
        /**
        * assets base url
        * 
        * image(name, path)
        */
        this.load
            .image('menu-bg', 'images/' + this.game.config.custom.bg.img)
            .image('level-bg', 'images/' + this.game.config.custom.levelBg.img)
            .image('idea-button', 'images/' + this.game.config.custom.ideaButton.img)
            .image('return-button', 'images/' + this.game.config.custom.returnButton.img)
            .image('button', 'images/button.png')
            .image('logo', 'images/title.png')
            .image('cloud', 'images/cloud.png')
            .spritesheet(
                'dude', 'images/dude.png', { frameWidth: 32, frameHeight: 48 }
            );
        // .audio('menu-music', 'audio/title-screen-music.ext');
    }
    create() {

        if (!this.cache.json.exists("currentLevel")) {
            this.cache.json.add(
                "currentLevel", this.game.config.custom.startCurrentLevel
            );
        }

        this.input.mouse.disableContextMenu();
        this.scene.start('title-screen');
    }
}