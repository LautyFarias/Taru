import Push from 'push.js';

export default class Preload extends Phaser.Scene {
    init() {
        var customConfig = {
            levelUnlocked: 10, // Update this value to unlock all levels
            bg: {
                x: 0,
                y: 0,
                origin: 0,
                img: 'menu-bg.png'
            },
            levelBg: {
                img: 'level-bg.png'
            },
            modal: {
                width: this.game.renderer.width - 100,
                height: this.game.renderer.height - 500,
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2,
                color: 0x00bcd4,
                depth: 3,
                contentStyle: {
                    title: {
                        font: "700 2em Roboto",
                        wordWrap: {
                            width: this.game.renderer.width - 200,
                            useAdvancedWrap: true
                        }
                    },
                    body: {
                        font: "400 1.8em Roboto",
                        wordWrap: {
                            width: this.game.renderer.width - 200,
                            useAdvancedWrap: true
                        },
                        align: "center"
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
                x: this.game.renderer.width / 10,
                y: this.game.renderer.height / 14,
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
            .image('space-bg', 'images/space.png')
            .image('idea-button', 'images/' + this.game.config.custom.ideaButton.img)
            .image('return-button', 'images/' + this.game.config.custom.returnButton.img)
            .image('button', 'images/button.png')
            .image('level-button', 'images/button-level.png')
            .image('level-unavailable', 'images/level-unavailable.png')
            .image('logo', 'images/title.png')
            .image('cloud', 'images/cloud.png')
            .image('cloud2', 'images/cloud2.png')
            .spritesheet(
                'dude', 'images/dude.png', { frameWidth: 32, frameHeight: 48 }
            );
        // .audio('menu-music', 'audio/title-screen-music.ext');
    }
    create() {

        if (!localStorage.getItem('currentLevel')) localStorage.setItem("currentLevel", 1);
        if (!localStorage.getItem('levelUnlocked')) {
            localStorage.setItem('levelUnlocked', this.game.config.custom.levelUnlocked);
        }

        this.input.mouse.disableContextMenu();

        // Push.Permission.request(null, () => {
        //     alert("Some mechanics may not work properly");
        // });

        this.scene.start('title-screen');
    }
}