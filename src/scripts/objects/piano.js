export default (scene, notes, action) => {
    scene.input.addPointer(9);

    var x = scene.game.renderer.width / 2;
    var y = scene.game.renderer.height - scene.game.renderer.height / 4;

    scene.pianoPanel = scene.add.image(x, y, 'piano', 'panel').setOrigin(0.5).setDisplaySize(
        scene.game.renderer.width / 1.5, scene.game.renderer.height / 3
    );
    scene.add.image(
        x, scene.game.renderer.height / 2,
        'sheet'
    ).setOrigin(0.5).setDisplaySize(
        scene.game.renderer.width / 1.5, scene.game.renderer.height / 10
    );

    scene.wrongSound = scene.sound.add('wrong-sound');

    let notesToFollow = {
        'key3': 're',
        'key5': 'mi',
        'key10': 'la',
    };

    var notesCount = 0;

    var keys = [
        ['key1', 'C3'],   // do
        ['key2', 'Db3'],  // do#
        ['key3', 'D3'],   // re
        ['key4', 'Eb3'],  // re#
        ['key5', 'E3'],   // mi
        ['key6', 'F3'],   // fa
        ['key7', 'Gb3'],  //fa#
        ['key8', 'G3'],   //sol
        ['key9', 'Ab3'],  //sol#
        ['key10', 'A3'],  //la
        ['key11', 'Bb3'], //la#
        ['key12', 'B3']   //si
    ];

    var black = ['key2', 'key4', 'key7', 'key9', 'key11'];

    var keyImages = [];

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i][0];
        var note = keys[i][1];

        keyImages[i] = scene.add.image(x, y, 'piano', key).setDisplaySize(
            scene.game.renderer.width / 1.5, scene.game.renderer.height / 3
        );

        keyImages[i].setName(note);
        keyImages[i].setOrigin(0.5);

        if (black.indexOf(key) !== -1) {
            keyImages[i].setDepth(1);
        }

        var frame = keyImages[i].frame;

        var hitArea = new Phaser.Geom.Rectangle(frame.x, frame.y, frame.width, frame.height);

        keyImages[i].setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

        var sound = scene.sound.add(note);

        keyImages[i].on('pointerdown', function (sound, key) {
            sound.play();
            if (notesToFollow[key] === notes[notesCount]) {
                notesCount++;
                if (notesCount === notes.length) {
                    action();
                }
            } else {
                notesCount = 0;
                scene.wrongSound.play();
            }
        }.bind(scene, sound, key));

        keyImages[i].on('pointerover', function (sound, pointer) {
            if (pointer.isDown) sound.play();
        }.bind(scene, sound));
    }
};
