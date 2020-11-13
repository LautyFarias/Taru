import IdeaButton from "../../objects/idea-button";
import Level from "../interfaces/level";

export default class IdeaLevel extends Level {
    constructor() {
        super({ key: 'level-3' });
    }
    init(props) {
        this.config = {
            dude: {
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2
            }
        };
        this.countIdeas = -1;
        this.ideaMessages = [
            "One?",
            "Two??",
            "This is the last tip!",
            "Take this off my face!"
        ];
        this.finishedMessage = {
            title: "Excelent!",
            body: "Much better to be seen"
        };
        if (props.callback) props.callback(this);
    }
    create() {
        this.bg = this.addLevelBg(this);

        this.addReturnButton(this);
        this.ideaButton = this.addIdeaButton(this, () => {
            if (this.countIdeas < this.ideaMessages.length - 1) {
                this.countIdeas++;
            }
            if (this.countIdeas == 3) {
                setTimeout(() => {
                    this.dude = this.add.sprite(
                        this.config.dude.x,
                        this.config.dude.y,
                        'dude', 4
                    ).setScale(1.5).setInteractive().on("pointerdown", () => {
                        this.addModal(this, this.goNextLevel, this.finishedMessage);
                    }, this);
                }, 500);
            }
            this.ideaModal = this.addModal(this, () => {
                this.ideaButton.setInteractive().clearTint();
            }, { body: this.ideaMessages[this.countIdeas] });
        });
    }
    update() {
        this.resizeLevelBg(this.bg);
    }
}