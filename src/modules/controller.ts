import ScoreCount from './score_panel'
import Food from './food'
import { Snake } from './Snake'
import { TailPoint } from './base'

export class SnakeController {
    scorePanel: ScoreCount
    food: Food<HTMLElement>
    snake: Snake
    speed: number = 500
    kCode: number = -1
    autoInterVal: any
    constructor() {
        this.scorePanel = new ScoreCount()
        this.food = new Food()
        this.snake = new Snake()
        this.keyEvtHandler = this.keyEvtHandler.bind(this)
        this.init()
    }
    init() {
        document.addEventListener("keydown", this.keyEvtHandler.bind(this))
    }
    keyEvtHandler(evt: KeyboardEvent) {
        this.kCode = evt.keyCode
    }

    move() {
        try {
            let tail: TailPoint | undefined = this.snake.freahPoints(this.kCode)
            if (tail) {
                this.isEaten(tail.tailX, tail.tailY)
            }
        } catch (e) {
            this.isGameOver()
        }
    }

    isEaten(tailX: number, tailY: number) {
        if (
            this.snake.head().offsetLeft === this.food.element.offsetLeft &&
            this.snake.head().offsetTop === this.food.element.offsetTop
        ) {
            this.snake.addSnake(tailX, tailY)
            this.food.freshPoint()
            let isSpeedUp: boolean = this.scorePanel.addScore()
            if (isSpeedUp && this.speed > 200) this.speed -= 100
        }
    }
    isGameOver() {
        /*
            two kinds of death 
            (1)  out of bound
            (2)  hit itself
        */
        alert("GAME_OVER")
        document.removeEventListener("keydown", this.keyEvtHandler, false)
        clearInterval(this.autoInterVal)
    }
    auto() {
        this.autoInterVal = setInterval(
            () => {
                if (this.kCode === -1) {
                    this.kCode = this.snake.keyCode
                }
                this.move()
            },
            this.speed
        )
    }

}

