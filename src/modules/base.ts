export interface Pointer<T = HTMLElement> {
    get X(): number
    get Y(): number
}



export class TailPoint {
    tailX: number
    tailY: number
    constructor(tailX: number, tailY: number) {
        this.tailX = tailX
        this.tailY = tailY
    }
}


// export default Pointer