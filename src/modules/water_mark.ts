// Type definitions for watermark-dom 2.3
// Project: https://github.com/saucxs/watermark-dom
// Definitions by: shenhaoliang <https://github.com/shlroland>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// export as namespace watermark
interface ISettings {
    /**
     * 水印总体的id
     *
     * @default wm_div_id
     */
    watermark_id?: string
    /**
     * 小水印的id前缀
     *
     * @default mask_div_id
     */
    watermark_prefix?: string
    /**
     * 水印的内容
     *
     * @default 测试水印
     */
    watermark_txt?: string
    /**
     * 水印起始位置x轴坐标
     *
     * @default 20
     */
    watermark_x?: number | undefined
    /**
     * 水印起始位置Y轴坐标
     *
     * @default 20
     */
    watermark_y?: number | undefined
    /**
     * 水印行数
     *
     * @default 0
     */
    watermark_rows?: number | undefined
    /**
     * 水印列数
     *
     * @default 0
     */
    watermark_cols?: number | undefined
    /**
     * 水印x轴间隔
     *
     * @default 50
     */
    watermark_x_space?: number
    /**
     * 水印y轴间隔
     *
     * @default 50
     */
    watermark_y_space?: number
    /**
     * 水印字体
     *
     * @default 微软雅黑
     */
    watermark_font?: string | undefined
    /**
     * 水印字体颜色
     *
     * @default 水印字体颜色
     */
    watermark_color?: string | undefined
    /**
     * 水印字体大小
     *
     * @default 18px
     */
    watermark_fontsize?: string | undefined
    /**
     * 水印透明度
     *
     * @description 要求设置在大于等于0.005
     * @default 0.15
     *
     */
    watermark_alpha?: number | undefined
    /**
     * 水印宽度
     *
     * @default 100
     */
    watermark_width?: number
    /**
     * 水印长度
     *
     * @default 100
     */
    watermark_height?: number
    /**
     * 水印倾斜度数
     *
     * @default 15
     */
    watermark_angle?: number
    /**
     * 水印的总体宽度
     *
     * @default body的scrollWidth和clientWidth的较大值
     */
    watermark_parent_width?: number
    /**
     * 水印的总体高度
     *
     * @default body的scrollHeight和clientHeight的较大值
     */
    watermark_parent_height?: number
    /**
     * 水印插件挂载的父元素element,不输入则默认挂在body上
     */
    watermark_parent_node?: string
    /**
     * monitor 是否监控， true: 不可删除水印 false: 可删水印。
     */
    monitor?: boolean
}


export class Settings implements ISettings {
    [key: string]: any
    watermark_id = 'wm_div_id'
    watermark_prefix = 'mask_div_id'
    watermark_txt = '测试水印'
    watermark_x = 20
    watermark_y = 20
    watermark_rows = 0
    watermark_cols = 0
    watermark_x_space = 50
    watermark_y_space = 50
    watermark_font = ""
    watermark_color = 'red'
    watermark_fontsize = '18px'
    watermark_alpha = 0.13
    watermark_width = 100
    watermark_height = 20
    watermark_angle = 15;

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
export class WaterMark {
    settings: Settings
    constructor(settings: Settings) {
        this.settings = settings
    };
    load() {

        // resize重新加载水印
        window.addEventListener('resize', () => {
            this.load();
        });

        /*如果元素存在则移除*/
        let watermark_element = document.getElementById(this.settings.watermark_id)
        watermark_element && watermark_element.parentNode && watermark_element.parentNode.removeChild(watermark_element)


        /*如果设置水印挂载的父元素的id*/
        console.log("this.settings.watermark_parent_node", this.settings.watermark_parent_node)
        let parentEle = this.settings.watermark_parent_node === undefined ? document.body : document.getElementById(this.settings.watermark_parent_node)!
        console.log("watermark_hook_element:", parentEle)
        console.log("watermark_hook_element:", parentEle.clientHeight)

        /* 设置宽、高 */
        let page_width: number = Math.max(parentEle.scrollWidth, parentEle.clientWidth)
        let page_height: number = Math.max(parentEle.scrollHeight, parentEle.clientHeight)


        let page_offsetTop = 0
        let page_offsetLeft = 0

        if (this.settings.watermark_parent_width || this.settings.watermark_parent_height) {
            /*指定父元素同时指定了宽或高*/
            if (parentEle) {
                page_offsetTop = parentEle.offsetTop || 0
                page_offsetLeft = parentEle.offsetLeft || 0
                this.settings.watermark_x = this.settings.watermark_x + page_offsetLeft
                this.settings.watermark_y = this.settings.watermark_y + page_offsetTop
            }
        } else {
            if (parentEle) {
                page_offsetTop = parentEle.offsetTop || 0
                page_offsetLeft = parentEle.offsetLeft || 0
            }
        }

        /*创建水印外壳div*/
        let otdiv: HTMLElement | null = document.getElementById(this.settings.watermark_id)
        console.log(`otdiv --> ${otdiv}`)
        let shadowRoot: any = null
        if (!otdiv) {
            otdiv = document.createElement('div');
            /*创建shadow dom*/
            otdiv.id = this.settings.watermark_id;
            otdiv.setAttribute('style', 'pointer-events: none !important; display: block !important');
            /*判断浏览器是否支持attachShadow方法*/
            if (typeof otdiv.attachShadow === 'function') {
                /* createShadowRoot Deprecated. Not for use in new websites. Use attachShadow*/
                shadowRoot = otdiv.attachShadow({ mode: 'open' })
            } else {
                shadowRoot = otdiv
            }
            /*将shadow dom随机插入body内的任意位置*/
            var nodeList = parentEle.children;
            var index = Math.floor(Math.random() * (nodeList.length - 1));
            if (nodeList[index]) {
                parentEle.insertBefore(otdiv, nodeList[index]);
            } else {
                parentEle.appendChild(otdiv);
            }
        } else if (otdiv.shadowRoot) {
            shadowRoot = otdiv.shadowRoot;
        }


        /*三种情况下会重新计算水印列数和x方向水印间隔：1、水印列数设置为0，2、水印宽度大于页面宽度，3、水印宽度小于于页面宽度*/
        console.log(page_width - this.settings.watermark_x)
        console.log(this.settings.watermark_width + this.settings.watermark_x_space)
        this.settings.watermark_cols = Math.round((page_width - this.settings.watermark_x) / (this.settings.watermark_width + this.settings.watermark_x_space))
        var temp_watermark_x_space = Math.round((page_width - this.settings.watermark_x - this.settings.watermark_width * this.settings.watermark_cols) / (this.settings.watermark_cols));
        this.settings.watermark_x_space = temp_watermark_x_space ? this.settings.watermark_x_space : temp_watermark_x_space;
        var allWatermarkWidth;

        /*三种情况下会重新计算水印行数和y方向水印间隔：1、水印行数设置为0，2、水印长度大于页面长度，3、水印长度小于于页面长度*/
        this.settings.watermark_rows = Math.round(
            (page_height - this.settings.watermark_y) / (this.settings.watermark_height + this.settings.watermark_y_space)
        )
        let temp_watermark_y_space = Math.round(
            (page_height - this.settings.watermark_y - this.settings.watermark_height * this.settings.watermark_rows) / (this.settings.watermark_rows)
        );
        this.settings.watermark_y_space = temp_watermark_y_space ? this.settings.watermark_y_space : temp_watermark_y_space;
        let allWatermarkHeight;

        if (parentEle) {
            allWatermarkWidth = this.settings.watermark_x + this.settings.watermark_width * this.settings.watermark_cols + this.settings.watermark_x_space * (this.settings.watermark_cols - 1);
            allWatermarkHeight = this.settings.watermark_y + this.settings.watermark_height * this.settings.watermark_rows + this.settings.watermark_y_space * (this.settings.watermark_rows - 1);
        } else {
            allWatermarkWidth = page_offsetLeft + this.settings.watermark_x + this.settings.watermark_width * this.settings.watermark_cols + this.settings.watermark_x_space * (this.settings.watermark_cols - 1);
            allWatermarkHeight = page_offsetTop + this.settings.watermark_y + this.settings.watermark_height * this.settings.watermark_rows + this.settings.watermark_y_space * (this.settings.watermark_rows - 1);
        }


        var x;
        var y;
        for (var i = 0; i < this.settings.watermark_rows; i++) {
            if (parentEle) {
                y = page_offsetTop + this.settings.watermark_y + (page_height - allWatermarkHeight) / 2 + (this.settings.watermark_y_space + this.settings.watermark_height) * i;
            } else {
                y = this.settings.watermark_y + (page_height - allWatermarkHeight) / 2 + (this.settings.watermark_y_space + this.settings.watermark_height) * i;
            }
            for (var j = 0; j < this.settings.watermark_cols; j++) {
                if (parentEle) {
                    x = page_offsetLeft + this.settings.watermark_x + (page_width - allWatermarkWidth) / 2 + (this.settings.watermark_width + this.settings.watermark_x_space) * j;
                } else {
                    x = this.settings.watermark_x + (page_width - allWatermarkWidth) / 2 + (this.settings.watermark_width + this.settings.watermark_x_space) * j;
                }
                var mask_div = document.createElement('div');
                var oText = document.createTextNode(this.settings.watermark_txt);
                mask_div.appendChild(oText);
                /*设置水印相关属性start*/
                mask_div.id = this.settings.watermark_prefix + i + j;
                /*设置水印div倾斜显示*/
                mask_div.style.webkitTransform = "rotate(-" + this.settings.watermark_angle + "deg)";
                // mask_div.style.MozTransform = "rotate(-" + this.settings.watermark_angle + "deg)";
                // mask_div.style.msTransform = "rotate(-" + this.settings.watermark_angle + "deg)";
                // mask_div.style.OTransform = "rotate(-" + this.settings.watermark_angle + "deg)";
                mask_div.style.transform = "rotate(-" + this.settings.watermark_angle + "deg)";
                mask_div.style.visibility = "";
                mask_div.style.position = "absolute";
                /*选不中*/
                mask_div.style.left = x + 'px';
                mask_div.style.top = y + 'px';
                mask_div.style.overflow = "hidden";
                mask_div.style.zIndex = "9999999";
                mask_div.style.opacity = this.settings.watermark_alpha.toString();
                mask_div.style.fontSize = this.settings.watermark_fontsize;
                mask_div.style.fontFamily = this.settings.watermark_font;
                mask_div.style.color = this.settings.watermark_color;
                mask_div.style.textAlign = "center";
                mask_div.style.width = this.settings.watermark_width + 'px';
                mask_div.style.height = this.settings.watermark_height + 'px';
                mask_div.style.display = "block";
                // mask_div.style['-ms-user-select'] = "none";
                /*设置水印相关属性end*/
                shadowRoot.appendChild(mask_div);
            }
        }

        // 是否监控， true: 不可删除水印; false: 可删水印。

        // if (this.settings.monitor  && hasObserver) {
        //     watermarkDom.observe(watermark_hook_element, option);
        //     watermarkDom.observe(document.getElementById(this.settings.watermark_id).shadowRoot, option);
        // }

    }
}

