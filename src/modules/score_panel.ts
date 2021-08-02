import '../style/index.less'

class ScoreCount {
    score: number = 0
    level: number = 1
    scoreEle: HTMLElement
    levelEle: HTMLElement
    constructor(readonly maxLevel: number = 3, readonly levelUpScore: number = 5) {
        this.scoreEle = document.getElementById("score")!
        this.levelEle = document.getElementById("level")!
    }

    addScore() {
        this.scoreEle.innerHTML = `${++this.score}`
        if (this.score % this.levelUpScore === 0) return this.addLevel()
        return false
    }

    private addLevel(): boolean {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = `${++this.level}`
            return true
        }
        return false
    }
}


export default ScoreCount