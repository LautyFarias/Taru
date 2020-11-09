import 'phaser';
import '@babel/polyfill';

import ScalePlugin from 'phaser3-rex-plugins/plugins/scale-plugin.js';
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin.js';
import PinchPlugin from 'phaser3-rex-plugins/plugins/pinch-plugin';

import Preload from './scenes/preload.js';
import TitleScreen from "./scenes/title-screen.js";
import LevelsDashboard from "./scenes/levels-dashboard.js";
import Options from "./scenes/options.js";
import LevelOne from "./scenes/levels/intro-level.js";
import LevelTwo from "./scenes/levels/hold-pressed-level.js";
import LevelFive from "./scenes/levels/shake-level.js";
import LevelSix from "./scenes/levels/darkness-level.js";
import LevelNine from "./scenes/levels/push-level.js";
import LevelFour from "./scenes/levels/pinch-level.js";
import LevelTen from "./scenes/levels/find-taru.js";

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
        global: [
            {
                key: 'rexRoundRectanglePlugin',
                plugin: RoundRectanglePlugin,
                start: true
            }, {
                key: 'rexscaleplugin',
                plugin: ScalePlugin,
                start: true
            }, {
                key: 'rexpinchplugin',
                plugin: PinchPlugin,
                start: true
            }
        ]
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
        // LevelThree,
        LevelFour,
        LevelFive,
        LevelSix,
        // LevelSeven,
        // LevelEight,
        LevelNine,
        LevelTen,
    ],
};

window.addEventListener('load', () => {
    const game = new Phaser.Game(config);
});
