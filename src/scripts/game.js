import 'phaser';
import '@babel/polyfill';

import { TitleScreen } from "./scenes/title-screen.js";
import { LevelsDashboard } from "./scenes/levels-dashboard.js";
import { Options } from "./scenes/options.js";
import { LevelOne } from "./scenes/levels/level-one.js";
import { LevelTwo } from "./scenes/levels/level-two.js";
import { LevelThree } from "./scenes/levels/level-three.js";
import { LevelFor } from "./scenes/levels/level-for.js";

var config = {
    /** Game configs */
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    // TODO: hacer responsive
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 800
    },
    scene: [
        TitleScreen, LevelsDashboard, Options,
        LevelOne, LevelTwo, LevelThree, LevelFor
    ]
};

window.addEventListener('load', () => {
    const game = new Phaser.Game(config);
});
