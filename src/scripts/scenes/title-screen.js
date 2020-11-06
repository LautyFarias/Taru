export default class TitleScreen extends Phaser.Scene {
    constructor() {
        super({
            key: "title-screen"
        });
    }
    /**
     * functions order:
     * 1 - init: define variables
     * 2 - preload: load images, audios, etc.
     * 3 - create: first drawn
     * 4 - update: update every 16 ms
     */
    init() {
        this.bgDta = {
            // send to preload scene
            x: 0,
            y: 0,
            origin: 0
        };
        this.logoDta = {
            x: this.game.renderer.width / 2,
            y: 100
        };
        this.playBtnDta = {
            x: this.game.renderer.width / 2,
            y: 250,
            scale: 0.3
        };
        this.lvlsDashbrdBtnDta = {
            x: this.game.renderer.width / 2,
            y: this.playBtnDta.y + 150,
            scale: 0.2
        };
        this.optsBtnDta = {
            x: this.game.renderer.width / 2,
            y: this.lvlsDashbrdBtnDta.y + 150,
            scale: 0.2
        };
    }
    preload() {
        /**
         * assets base url
         * 
         * image(name, path)
         */
        this.load.setBaseURL('assets')
            .image('play-btn', 'images/play.png')
            .image('options-btn', 'images/button.png')
            .image('lvls-dashbrd-btn', 'images/button.png')
            .image('menu-bg', 'images/space.png')
            .image('logo', 'images/title.png');
        // .audio(
        //     'menu-music',
        //     'assets/audio/title-screen-music.ext'
        // );
    }
    create() {
        /**
         * image(x, y, name)
         * setOrigin(where start the image render)
         */
        this.add.image(
            this.bgDta.x,
            this.bgDta.y,
            'menu-bg'
        ).setOrigin(this.bgDta.origin);

        // this.music = this.sound.add('menu-music');	
        // if (this.sound.context.state === 'suspended') {
        //     this.sound.context.resume();
        // }
        // this.sound.pauseOnBlur = false;
        // this.music.play({
        //     loop: true
        // });

        this.add.image(this.logoDta.x, this.logoDta.y, 'logo');

        /**
         * 
         * setScale (scale) = css sDtacale
         * 
         * setInteractive: enable click,
         * scale: 0.30
         */
        this.playBtn = this.add.image(
            this.playBtnDta.x,
            this.playBtnDta.y,
            'play-btn'
        ).setScale(this.playBtnDta.scale)
            .setInteractive()
            .on("pointerover", () => { })// hover
            .on("pointerout", () => { })// out hover
            .on("pointerdown", () => { // onclick
                /** start a scene */
                console.log("works")
                // this.scene.start("");
            });

        this.lvlsDashbrdBtn = this.add.image(
            this.lvlsDashbrdBtnDta.x,
            this.lvlsDashbrdBtnDta.y,
            'lvls-dashbrd-btn'
        ).setScale(this.lvlsDashbrdBtnDta.scale)
            .setDepth(3)
            .setInteractive()
            .on("pointerover", () => { })// hover
            .on("pointerout", () => { })// out hover
            .on("pointerdown", () => { // onclick
                this.scene.start("levels-dashboard");
            });

        this.optionsBtn = this.add.image(
            this.optsBtnDta.x,
            this.optsBtnDta.y,
            'options-btn'
        ).setScale(this.optsBtnDta.scale)
            .setInteractive()
            .on("pointerover", () => { })// hover
            .on("pointerout", () => { })// out hover
            .on("pointerdown", () => { // onclick
                this.scene.start("options");
            });
    }
}