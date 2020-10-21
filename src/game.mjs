import { TitleScreen } from "./scenes/title-screen.js";
import { LevelsDashboard } from "./scenes/levels-dashboard.js";
import { Options } from "./scenes/options.js";

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
        TitleScreen, LevelsDashboard, Options
    ],
    pixelArt: true
};

var game = new Phaser.Game(config);
