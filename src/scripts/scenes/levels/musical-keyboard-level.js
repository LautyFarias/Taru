import Level from "../interfaces/level.js";
import createPiano from "../../objects/piano.js";
import utils from "../../utils.js";

export default class MusicalKeyboard extends Level {
    constructor() {
        super({ key: 'level-7' });
    }
    init(props) {
        this.ideaMessages = [
            'mi mi mi mi',
            're mi la',
            'mi re re'
        ];
        this.finishedMessages = {
            title: "Excelent!",
            body: "This sound reminds me of the spirits' world",
        };
        this.notes = ["mi", "mi", "mi", "mi", "re", "mi", "la", "mi", "re", "re"];
        if (props.callback) props.callback(this);
    }
    preload() {
        this.load.atlas('piano', 'images/piano.png', 'json/piano.json')
            .image('sheet', 'images/sheet.png')
            .audio('C3', 'audios/piano/C3.mp3')
            .audio('Db3', 'audios/piano/Db3.mp3')
            .audio('D3', 'audios/piano/D3.mp3')
            .audio('Eb3', 'audios/piano/Eb3.mp3')
            .audio('E3', 'audios/piano/E3.mp3')
            .audio('F3', 'audios/piano/F3.mp3')
            .audio('Gb3', 'audios/piano/Gb3.mp3')
            .audio('G3', 'audios/piano/G3.mp3')
            .audio('Ab3', 'audios/piano/Ab3.mp3')
            .audio('A3', 'audios/piano/A3.mp3')
            .audio('Bb3', 'audios/piano/Bb3.mp3')
            .audio('B3', 'audios/piano/B3.mp3')
            .audio('wrong-sound', 'audios/wrong-sound.mp3')
            .audio('claps', 'audios/claps.mp3');
    }
    create() {
        this.bg = this.addLevelBg(this);

        this.addReturnButton(this);
        this.addIdeaButton(this);

        this.claps = this.sound.add('claps');

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

        this.musicalPieceFinished = () => {
            this.claps.play();
            this.dude = this.add.sprite(
                this.game.renderer.width,
                this.game.renderer.height / 3,
                'dude', 1
            ).setScale(1.5).setInteractive();

            utils.moveDude(this.dude, {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 3
            }, () => {
                setTimeout(this.dude.on("pointerdown", () => {
                    this.addModal(this, this.goNextLevel, this.finishedMessages);
                }), 3000);
            }, 100);

        };

        if (this.sound.locked) {
            var text = this.add.text(10, 10, 'Tap to unlock audio', { font: '16px Courier', fill: '#00ff00' });

            this.sound.once('unlocked', function () {
                text.destroy();
                createPiano(this, this.notes, this.musicalPieceFinished);
            }, this);
        }
        else {
            createPiano(this, this.notes, this.musicalPieceFinished);
        }
    }
    update() {
        this.resizeLevelBg(this.bg);
    }
}