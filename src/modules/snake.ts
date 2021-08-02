import '../style/index.less'
import { TailPoint } from './base'


/*
keycode 37 = Left ←
keycode 38 = Up ↑
keycode 39 = Right →
keycode 40 = Down ↓
*/
export class Snake {
    elementParent: HTMLElement
    keyCodes: number[] = [37, 38, 39, 40]
    keyCode: number
    tracks: string[] = []

    constructor() {
        this.elementParent = document.getElementById("snake")!
        this.keyCode = this.keyCodes[Math.round(Math.random() * this.keyCodes.length)]
        this.init()
    }

    init() {
        let x = Math.round(Math.random() * 29) * 10
        let y = Math.round(Math.random() * 29) * 10
        let div: HTMLElement = document.createElement("div")
        div.style.left = `${x}px`
        div.style.top = `${y}px`
        this.elementParent.appendChild(div)
    }

    freahPoints(keyCode: number, updateX?: number, updateY?: number): TailPoint | undefined {
        if (!this.keyCodes.includes(keyCode)) return
        let snakes = this.elementParent.getElementsByTagName("div")
        let tempX: number = -1, tempY: number = -1

        if (snakes.length <= 0) return
        if (!updateX || !updateY) {
            switch (keyCode) {
                case 37:
                    updateX = snakes[0].offsetLeft - 10
                    updateY = snakes[0].offsetTop
                    break
                case 38:
                    updateX = snakes[0].offsetLeft
                    updateY = snakes[0].offsetTop - 10
                    break
                case 39:
                    updateX = snakes[0].offsetLeft + 10
                    updateY = snakes[0].offsetTop
                    break
                case 40:
                    updateX = snakes[0].offsetLeft
                    updateY = snakes[0].offsetTop + 10
                    break
                default: return
            }
        }

        if (updateX < 0 || updateY < 0 || updateX > 290 || updateY > 290) {
            throw Error("GAMEOVER")
        }
        let pos: string = `${updateX}:${updateY}`
        if (this.tracks.includes(pos)) {
            throw Error("GAMEOVER")
        }
        console.log(this.tracks)
        this.tracks = []
        for (let i: number = 0; i < snakes.length; i++) {
            tempX = snakes[i].offsetLeft
            tempY = snakes[i].offsetTop
            snakes[i].style.left = `${updateX}px`
            snakes[i].style.top = `${updateY}px`
            this.tracks.push(`${updateX}:${updateY}`)
            updateX = tempX
            updateY = tempY
        }
        return new TailPoint(tempX, tempY)
    }

    addSnake(tailX: number, tailY: number) {
        let div: HTMLElement = document.createElement("div")
        div.style.left = `${tailX}px`
        div.style.top = `${tailY}px`
        this.elementParent.appendChild(div)
        this.tracks.splice(0, 0, `${tailX}:${tailY}`)
    }

    head(): HTMLElement {
        return this.elementParent.getElementsByTagName("div")[0]
    }

    isDead() {

    }

}



