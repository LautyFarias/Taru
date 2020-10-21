export class TitleScreen extends Phaser.Scene {
    constructor() {
        super({
            key: "menu"
        });
    }
    /**
     * functions order:
     * 1 - init: define variables
     * 2 - preload: load images, audios, etc.
     * 3 - create: first drawn
     * 4 - update: update every 16 ms
     */
    init() { }
    preload() {
        /** assets base url */
        // this.load.setBaseURL('../assets');

        /** image(name, path) */
        this.load.image('play-button', '../../assets/images/play.png');
        this.load.image('options-button', '../../assets/images/button.png');
        this.load.image('lvls-dashboard-button', '../../assets/images/button.png');
        this.load.image('menu-bg', 'http://labs.phaser.io/assets/skies/space3.png');
        this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'http://labs.phaser.io/assets/particles/red.png');

        // this.load.audio(
        //     'menu-music',
        //     'assets/audio/Andrea_Milana_-_Harlequin_-_The_Clockworks_-_Electribe_MX_REMIX.m4a'
        // );
    }
    create() {
        /**
         * image(y, x, name)
         * setOrigin(where start the image render)
         */
        this.add.image(0, 0, 'menu-bg').setOrigin(0);

        // let music = this.sound.add('menu-music');	
        // if (this.sound.context.state === 'suspended') {

        //     this.sound.context.resume();
        // }
        // this.sound.pauseOnBlur = false;
        // music.play({
        //     loop: true
        // });

        let title = this.add.image(this.game.renderer.width / 2, 100, 'logo');
        let playButton = this.add.image(this.game.renderer.width / 2, 250, 'play-button');
        /**
         * setScale (scale) = css scale
         */
        playButton.setScale(0.30);

        /** setInteractive: enable click */        
        playButton.setInteractive();

        playButton.on("pointerover", () => { // hover
        });

        playButton.on("pointerout", () => { // out hover
        });

        playButton.on("pointerdown", () => { // onclick
            /** start a scene */
            // this.scene.start("");
        });

        let lvlsDashboardButton = this.add.image(
            this.game.renderer.width / 2, playButton.y + 150, 'lvls-dashboard-button'
        );
        lvlsDashboardButton.setScale(0.2);

        lvlsDashboardButton.setInteractive();

        lvlsDashboardButton.on("pointerover", () => { // hover
        });

        lvlsDashboardButton.on("pointerout", () => { // out hover
        });

        lvlsDashboardButton.on("pointerdown", () => { // onclick
            this.scene.start("levels-dashboard");
        });

        let OptionsButton = this.add.image(
            this.game.renderer.width / 2, lvlsDashboardButton.y + 150, 'options-button'
        );
        OptionsButton.setScale(0.2);

        OptionsButton.setInteractive();

        OptionsButton.on("pointerover", () => { // hover
        });

        OptionsButton.on("pointerout", () => { // out hover
        });

        OptionsButton.on("pointerdown", () => { // onclick
            this.scene.start("options");
        });
    }
}