import 'phaser';
import '@babel/polyfill';

import TitleScreen from "./scenes/title-screen.js";
import LevelsDashboard from "./scenes/levels-dashboard.js";
import Options from "./scenes/options.js";
import { LevelTwo } from "./scenes/levels/level-two.js";
import { LevelThree } from "./scenes/levels/level-three.js";
import { LevelFour } from "./scenes/levels/level-four.js";
import { LevelFive } from "./scenes/levels/level-five.js";
import { LevelTen } from "./scenes/levels/level-ten.js";

var config = {
    /** Game configs */
    type: Phaser.AUTO,
    // TODO: hacer responsive
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 800
    },
    scene: [
        TitleScreen, LevelsDashboard, Options,
        // LevelOne,
        LevelTwo,
        LevelThree,
        LevelFour,
        LevelFive,
        LevelTen,
    ]
};

window.addEventListener('load', () => {
    const game = new Phaser.Game(config);
});
