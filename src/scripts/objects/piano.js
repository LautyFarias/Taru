export default (scene) => {
    scene.input.addPointer(9);

    var x = 100;
    var y = 0;

    scene.add.image(x, y, 'piano', 'panel').setOrigin(0);

    var keys = [
        ['key1', 'C3'],
        ['key2', 'Db3'],
        ['key3', 'D3'],
        ['key4', 'Eb3'],
        ['key5', 'E3'],
        ['key6', 'F3'],
        ['key7', 'Gb3'],
        ['key8', 'G3'],
        ['key9', 'Ab3'],
        ['key10', 'A3'],
        ['key11', 'Bb3'],
        ['key12', 'B3']
    ];

    var black = ['key2', 'key4', 'key7', 'key9', 'key11'];

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i][0];
        var note = keys[i][1];

        var singleKey = scene.add.image(x, y, 'piano', key);

        singleKey.setName(note);
        singleKey.setOrigin(0);

        if (black.indexOf(key) !== -1) {
            singleKey.setDepth(1);
        }

        var frame = singleKey.frame;

        var hitArea = new Phaser.Geom.Rectangle(frame.x, frame.y, frame.width, frame.height);

        singleKey.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

        var sound = scene.sound.add(note);

        singleKey.on('pointerdown', function (sound) {
            sound.play();

        }.bind(scene, sound));

        singleKey.on('pointerover', function (sound, pointer) {
            if (pointer.isDown) {
                sound.play();
            }
        }.bind(scene, sound));
    }
}
