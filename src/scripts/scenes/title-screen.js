import MenuScreen from './interfaces/menu-screen.js';
export default class TitleScreen extends MenuScreen {
    constructor() {
        super({ key: "title-screen" });
    }
    /**
     * functions order:
     * 1 - init: define variables
     * 2 - preload: load images, audios, etc.
     * 3 - create: first drawn
     * 4 - update: update every 16 ms
     */
    init() {
        this.config = {
            logo: {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 6
            },
            playButton: {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2,
            },
            lvlsDashbrdBtn: {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2 + 150,
            },
            // optionsButton: {
            //     width: this.game.config.custom.defaultButton.width,
            //     height: this.game.config.custom.defaultButton.height,
            //     x: this.game.renderer.width - this.game.renderer.width / 4,
            //     y: 550,
            //     color: this.game.config.custom.defaultButton.color,
            // }
        };
    }
    preload() { }
    create() {
        /**
         * image(x, y, name)
         * setOrigin(where start the image render)
         */
        this.bg = this.addBg(this);
        // this.music = this.sound.add('menu-music');	
        // if (this.sound.context.state === 'suspended') {
        //     this.sound.context.resume();
        // }
        // this.sound.pauseOnBlur = false;
        // this.music.play({
        //     loop: true
        // });

        this.title = this.add.image(this.config.logo.x, this.config.logo.y, 'logo');

        /**
         * 
         * setScale (scale) = css scale
         * 
         * setInteractive: enable click,
         * scale: 0.30
         */
        this.addButton(this, () => {
            this.scene.start(
                `level-${this.cache.json.exists('currentLevel') ? this.cache.json.get('currentLevel') : 1}`, {
                currentLevel: this.cache.json.exists('currentLevel') ? this.cache.json.get('currentLevel') : 1,
                callback: scene => scene.cameras.main.fadeIn(1000, 0, 0, 0)
            });
        }, "Play", this.config.playButton);

        this.addButton(this, () => {
            this.scene.start("levels-dashboard", {
                currentLevel: this.cache.json.exists('currentLevel') ? this.cache.json.get('currentLevel') : 1,
                callback: scene => scene.cameras.main.fadeIn(1000, 0, 0, 0)
            });
        }, "Levels", this.config.lvlsDashbrdBtn);

        // this.addButton(this, () => {
        //     this.scene.start("options", {
        //         callback: scene => scene.cameras.main.fadeIn(1000, 0, 0, 0)
        //     });
        // }, "Options", this.config.optionsButton);
    }
    update() {
        this.resizeBg(this.bg);
        this.title.setDisplaySize(
            this.game.renderer.width / 1.5,
            this.game.renderer.height / 6
        ).setPosition(
            this.game.renderer.width / 2,
            this.game.renderer.height / 6
        );
    }
}