import '../style/index.less'

import { Pointer } from './base'


class Food<T> implements Pointer<T>{
    element: HTMLElement
    stage?: HTMLElement

    constructor() {
        this.element = document.getElementById("food")!
        // this.stage = document.getElementById("stage")!
        this.freshPoint()
    }
    get X() {
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }

    freshPoint() {
        let x = Math.round(Math.random() * 29) * 10
        let y = Math.round(Math.random() * 29) * 10
        this.element.style.left = `${x}px`
        this.element.style.top = `${y}px`
    }
}


export default Food