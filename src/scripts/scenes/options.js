export default class Options extends Phaser.Scene {
    constructor() {
        super({
            key: "options"
        });
    }
    init() {
        this.rtnBtnDta = {
            x: 50,
            y: 50,
            scale: 0.1
        };
        this.sndEnaBtnDta = {
            x: this.game.renderer.width / 3,
            y: 250,
            scale: 0.1
        };
        this.sndDisBtnDta = {
            x: this.game.renderer.width - (this.game.renderer.width / 3),
            y: 250,
            scale: 0.4
        };
        this.crsTxtDta = {
            x: this.game.renderer.width / 2,
            oneY: this.game.renderer.height - (this.game.renderer.height / 3),
            twoY: this.game.renderer.height - (this.game.renderer.height / 3) - 100,
            oneTxt: "Icons made by Freepik",
            twoTxt: "From www.flaticon.local",
            origin: 0.5
        };
    }
    preload() {
        this.load.setBaseURL('../../assets')
            .svg('sound-enable', 'svg/sound-avaible.svg')
            .svg('sound-disable', 'svg/sound-inavaible.svg')
            .image('return', 'images/return.png');
    }
    create() {
        this.add.image(0, 0, 'menu-bg')
            .setOrigin(0);

        this.returnButton = this.add.image(this.rtnBtnDta.x, this.rtnBtnDta.y, 'return')
            .setScale(this.rtnBtnDta.scale)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("title-screen");
            });

        this.soundDisableBtn = this.add.image(
            this.sndDisBtnDta.x,
            this.sndDisBtnDta.y,
            'sound-disable'
        ).setScale(this.sndDisBtnDta.scale);
        this.soundEnableBtn = this.add.image(
            this.sndEnaBtnDta.x,
            this.sndEnaBtnDta.y,
            'sound-enable'
        ).setScale(this.sndEnaBtnDta.scale);

        this.add.text(
            this.crsTxtDta.x,
            this.crsTxtDta.oneY,
            this.crsTxtDta.oneTxt
        ).setOrigin(this.crsTxtDta.scale);
        this.add.text(
            this.crsTxtDta.x,
            this.crsTxtDta.twoY,
            this.crsTxtDta.twoTxt
        ).setOrigin(this.crsTxtDta.scale);
    }
}