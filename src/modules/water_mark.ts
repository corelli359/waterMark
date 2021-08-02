// Type definitions for watermark-dom 2.3
// Project: https://github.com/saucxs/watermark-dom
// Definitions by: shenhaoliang <https://github.com/shlroland>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// export as namespace watermark;
interface ISettings {
    /**
     * 水印总体的id
     *
     * @default wm_div_id
     */
    watermark_id?: string;
    /**
     * 小水印的id前缀
     *
     * @default mask_div_id
     */
    watermark_prefix?: string;
    /**
     * 水印的内容
     *
     * @default 测试水印
     */
    watermark_txt?: string;
    /**
     * 水印起始位置x轴坐标
     *
     * @default 20
     */
    watermark_x?: number | undefined;
    /**
     * 水印起始位置Y轴坐标
     *
     * @default 20
     */
    watermark_y?: number | undefined;
    /**
     * 水印行数
     *
     * @default 0
     */
    watermark_rows?: number | undefined;
    /**
     * 水印列数
     *
     * @default 0
     */
    watermark_cols?: number | undefined;
    /**
     * 水印x轴间隔
     *
     * @default 50
     */
    watermark_x_space?: number | undefined;
    /**
     * 水印y轴间隔
     *
     * @default 50
     */
    watermark_y_space?: number | undefined;
    /**
     * 水印字体
     *
     * @default 微软雅黑
     */
    watermark_font?: string | undefined;
    /**
     * 水印字体颜色
     *
     * @default 水印字体颜色
     */
    watermark_color?: string | undefined;
    /**
     * 水印字体大小
     *
     * @default 18px
     */
    watermark_fontsize?: string | undefined;
    /**
     * 水印透明度
     *
     * @description 要求设置在大于等于0.005
     * @default 0.15
     *
     */
    watermark_alpha?: number | undefined;
    /**
     * 水印宽度
     *
     * @default 100
     */
    watermark_width?: number | undefined;
    /**
     * 水印长度
     *
     * @default 100
     */
    watermark_height?: number | undefined;
    /**
     * 水印倾斜度数
     *
     * @default 15
     */
    watermark_angle?: number | undefined;
    /**
     * 水印的总体宽度
     *
     * @default body的scrollWidth和clientWidth的较大值
     */
    watermark_parent_width?: number | undefined;
    /**
     * 水印的总体高度
     *
     * @default body的scrollHeight和clientHeight的较大值
     */
    watermark_parent_height?: number | undefined;
    /**
     * 水印插件挂载的父元素element,不输入则默认挂在body上
     */
    watermark_parent_node?: string | undefined;
    /**
     * monitor 是否监控， true: 不可删除水印; false: 可删水印。
     */
    monitor?: boolean | undefined;
}


export class Settings implements ISettings {
    [key: string]: any
    watermark_id = 'wm_div_id';
    watermark_prefix = 'mask_div_id';
    watermark_txt = '测试水印';
    watermark_x = 20;
    watermark_y = 20;
    watermark_rows = 0;
    watermark_cols = 0;
    watermark_x_space = 50;
    watermark_y_space = 50;
    watermark_font = "";
    watermark_color = 'red';
    watermark_fontsize = '18px';
    watermark_alpha = 0.15;
    watermark_width = 100;
    watermark_height = 100;
    watermark_angle = 15;
    // watermark_parent_width = undefined;
    // watermark_parent_height = undefined;
    // watermark_parent_node = undefined;
    // monitor = undefined;
    

    constructor(objs: any = {}) {
        let intersection = [...new Set(Object.keys(this))].filter(x => new Set(Object.keys(objs)).has(x))
        console.log('intersection -> ', intersection)
        if (intersection.length > 0) {
            for (let key of intersection) {
                if (!objs[key]) {
                    this[key] = objs[key]
                }
            }
        }
    }
}

// abstract class WaterMarkABC<T extends ISettings> {


//     abstract init(): void
//     abstract load<T>(arg: T): void
//     abstract remove(): void
// }

export class WaterMark {
    settings: Settings
    constructor(settings: Settings) {
        this.settings = settings
    }

    init() { }
    load() {
        /*如果元素存在则移除*/
        let watermark_element = document.getElementById(this.settings.watermark_id);
        watermark_element && watermark_element.parentNode && watermark_element.parentNode.removeChild(watermark_element);


        /*如果设置水印挂载的父元素的id*/
        console.log("this.settings.watermark_parent_node",this.settings.watermark_parent_node)
        var watermark_parent_element = this.settings.watermark_parent_node === undefined ? document.getElementsByTagName("body") : document.getElementById(this.settings.watermark_parent_node) ;
        console.log("watermark_parent_element:",watermark_parent_element)
        var watermark_hook_element = watermark_parent_element ? watermark_parent_element : document.body;
        
    }
    remove() { }
}

