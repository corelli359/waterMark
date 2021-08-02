import './style/index.less'
import { SnakeController } from './modules/controller'
import { Settings as waterConfig,WaterMark } from './modules/water_mark'




let snakeController: SnakeController = new SnakeController()
let wcfg: waterConfig = new waterConfig({
    watermark_x: 100, watermark_y: 100
})

// let wcfg: waterConfig = new waterConfig(
//     watermark_x:number= 100, watermark_y:number= 100
// )

let wm = new WaterMark(wcfg)
wm.load()
console.log("wcfg --> ", wcfg)
console.log("wm --> ", wm)

// snakeController.auto()


function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
  }
  
  interface Person {
      name: string;
      age: number;
  }
  let person: Person = {
      name: 'Jarid',
      age: 35
  };
  let strings: string[] = pluck(person, ['name']);
  console.log(strings)