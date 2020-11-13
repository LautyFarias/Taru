import 'phaser';
import '@babel/polyfill';

import ScalePlugin from 'phaser3-rex-plugins/plugins/scale-plugin.js';
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin.js';
import PinchPlugin from 'phaser3-rex-plugins/plugins/pinch-plugin';
import MoveToPlugin from 'phaser3-rex-plugins/plugins/moveto-plugin';

import Preload from './scenes/preload.js';
import TitleScreen from "./scenes/title-screen.js";
import LevelsDashboard from "./scenes/levels-dashboard.js";
import Options from "./scenes/options.js";
import LevelOne from "./scenes/levels/intro-level.js";
import LevelTwo from "./scenes/levels/hold-pressed-level.js";
import LevelThree from './scenes/levels/idea-level.js';
import LevelFour from "./scenes/levels/pinch-level.js";
import LevelFive from "./scenes/levels/shake-level.js";
import LevelSix from "./scenes/levels/darkness-level.js";
import LevelSeven from "./scenes/levels/musical-keyboard-level.js";
import LevelEight from "./scenes/levels/sound-level.js";
// import LevelNine from "./scenes/levels/push-level.js";
import LevelTen from "./scenes/levels/find-taru.js";
import FinalSceneLevel from './scenes/levels/final-scene-level.js';


(() => {
    const ZOOM_LEVEL = 1;

    var config = {
        /** Game configs */
        type: Phaser.AUTO,
        pixelArt: true,
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
                }, {
                    key: 'rexmovetoplugin',
                    plugin: MoveToPlugin,
                    start: true
                },
            ]
        },
        loader: {
            baseURL: "assets",
        },
        scale: {
            mode: Phaser.Scale.NONE,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: window.innerWidth / ZOOM_LEVEL,
            height: window.innerHeight / ZOOM_LEVEL,
            zoom: ZOOM_LEVEL,
            parent: "phaser-game"
        },
        scene: [
            Preload, TitleScreen, LevelsDashboard, Options,
            LevelOne,
            LevelTwo,
            LevelThree,
            LevelFour,
            LevelFive,
            LevelSix,
            LevelSeven,
            LevelEight,
            // LevelNine,
            LevelTen,
            FinalSceneLevel
        ],
    };

    window.addEventListener('load', () => {
        const game = new Phaser.Game(config);
        if (window.innerWidth > 800) {
            game.scale.resize(800, window.innerHeight / ZOOM_LEVEL);
        } else {
            game.scale.resize(
                window.innerWidth / ZOOM_LEVEL,
                window.innerHeight / ZOOM_LEVEL
            );
        }
        window.addEventListener("resize", () => {
            game.scale.resize(
                window.innerWidth / ZOOM_LEVEL,
                window.innerHeight / ZOOM_LEVEL
            );
            if (window.width > 800) {
                game.scale.resize(800, window.innerHeight / ZOOM_LEVEL);
            }
        }, false);
    });
})();