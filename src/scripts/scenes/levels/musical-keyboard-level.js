import Level from "../interfaces/level.js";
import createPiano from "../../objects/piano.js";

export default class MusicalKeyboard extends Level {
    constructor() {
        super({ key: 'level-7' });
    }
    init(props) {
        this.currentLevel = props.currentLevel ? props.currentLevel : this.scene.key.split('-')[1];
        if (props.callback) props.callback(this);
    }
    preload() {
        this.load.atlas('piano', 'images/piano.png', 'json/piano.json');

        this.load.audio('C3', 'audios/piano/C3.mp3');
        this.load.audio('Db3', 'audios/piano/Db3.mp3');
        this.load.audio('D3', 'audios/piano/D3.mp3');
        this.load.audio('Eb3', 'audios/piano/Eb3.mp3');
        this.load.audio('E3', 'audios/piano/E3.mp3');
        this.load.audio('F3', 'audios/piano/F3.mp3');
        this.load.audio('Gb3', 'audios/piano/Gb3.mp3');
        this.load.audio('G3', 'audios/piano/G3.mp3');
        this.load.audio('Ab3', 'audios/piano/Ab3.mp3');
        this.load.audio('A3', 'audios/piano/A3.mp3');
        this.load.audio('Bb3', 'audios/piano/Bb3.mp3');
        this.load.audio('B3', 'audios/piano/B3.mp3');
    }
    create() {
        this.bg = this.addLevelBg(this);

        this.addReturnButton(this);
        this.addIdeaButton(this);
        
        if (this.sound.locked) {
            var text = this.add.text(10, 10, 'Tap to unlock audio', { font: '16px Courier', fill: '#00ff00' });

            this.sound.once('unlocked', function () {
                text.destroy();
                createPiano(this);
            }, this);
        }
        else {
            createPiano(this);
        }
    }
    update() {
        this.resizeLevelBg(this.bg);
    }
}