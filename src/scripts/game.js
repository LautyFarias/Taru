import 'phaser';
import '@babel/polyfill';

import ButtonPlugin from 'phaser3-rex-plugins/plugins/button-plugin.js';
import ScalePlugin from 'phaser3-rex-plugins/plugins/scale-plugin.js';

import Preload from './scenes/preload.js';
import TitleScreen from "./scenes/title-screen.js";
import LevelsDashboard from "./scenes/levels-dashboard.js";
import Options from "./scenes/options.js";
import LevelOne from "./scenes/levels/intro-level.js";
import LevelTwo from "./scenes/levels/level-two.js";
import LevelFive from "./scenes/levels/shake-level.js";
import LevelThree from "./scenes/levels/level-three.js";
import LevelNine from "./scenes/levels/level-four.js";
import LevelFour from "./scenes/levels/level-five.js";
import LevelTen from "./scenes/levels/level-ten.js";

var config = {
    /** Game configs */
    type: Phaser.AUTO,
    // TODO: hacer responsive
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    plugins: {
        global: [{
            key: 'rexButton',
            plugin: ButtonPlugin,
            start: true
        },{
            key: 'rexscaleplugin',
            plugin: ScalePlugin,
            start: true
        }]
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 800
    },
    scene: [
        Preload, TitleScreen, LevelsDashboard, Options,
        LevelOne,
        LevelTwo,
        LevelThree,
        LevelFour,
        LevelFive,
        // LevelSeven,
        // LevelNine,
        LevelTen,
    ],
};

window.addEventListener('load', () => {
    const game = new Phaser.Game(config);
});
