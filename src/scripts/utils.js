export default {
    getRandomPosition: (scene) => {
        let randomX = Phaser.Math.Between(
            scene.game.renderer.width - (scene.game.renderer.width - scene.game.renderer.width / 8),
            scene.game.renderer.width - scene.game.renderer.width / 8
        );
        let randomY = Phaser.Math.Between(
            scene.game.renderer.height - (scene.game.renderer.height - scene.game.renderer.height / 8),
            scene.game.renderer.height - scene.game.renderer.height / 8
        );
        return {
            x: randomX,
            y: randomY
        };
    },
    moveDude: (dude, randomPosition, scene) => {
        if (!dude.moveTo) {
            dude.moveTo = scene.plugins.get('rexmovetoplugin').add(dude, {
                speed: 400,
            }).on('complete', function () {
                dude.anims.play('turn', true);
            }, scene);
        }

        if (randomPosition.x > dude.x) {
            dude.anims.play('right', true);
        }
        if (randomPosition.x < dude.x) {
            dude.anims.play('left', true);
        }
        dude.moveTo.moveTo(randomPosition.x, randomPosition.y);
    }
};