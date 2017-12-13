
import _ from 'lodash'

/**
 *  存储localStorage
 */
export const setStorage = (key, value) => {
    if (!name) {
        return;
    }
    if (typeof value !== 'string') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

/**
 *  获取localStorage
 */
export const getStorage = (key) => {
    if (!key) return;
    return window.localStorage.getItem(key)
}

/**
 *  删除localStorage
 */
export const removeStorage = (key) => {
    if (!key) return;
    window.localStorage.removeItem(key)
}

/**
 *  获取style某样式
 */
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
// http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，不属于style，只有document.body才能用
    if (attr == 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        // ie, 返回最终css属性值(如2em)
        // 获取属性用getAttribute，也可避免怪异key，需要驼峰写法
        target = element.currentStyle[attr];
    } else {
        // ie9+, 返回最终使用的属性值（计算后的，如24px）
        // target = windos.getComputedStyle(element,null)[attr]; 
        // 在许多在线的演示代码中, getComputedStyle 是通过 document.defaultView 对象来调用的。 大部分情况下，这是不需要的， 因为可以直接通过window对象调用。但有一种情况，你必需要使用 defaultView,  那是在firefox3.6上访问子框架内的样式 (iframe)
        
        // 获取属性可以使用 getPropertyValue,避免怪异key，且不支持驼峰写法
        target = document.defaultView.getComputedStyle(element,null)[attr];
    }

    // 在获取 opactiy 时需要获取小数 parseFloat
    if (attr == 'opacity') {
        return NumberMode == 'float'? parseFloat(target) : parseInt(target);
    }
    return target;
}

/**
 * 运动效果
 * @param {HtmlElement} element     运动对象，必选
 * @param {JSON}        target      属性：目标值，必选(尺寸单位：px或rem)
 * @param {number}      duration    运动时间
 * @param {string}      mode        运动模式，可选
 * @param {function}    callback    可选，回调函数
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    // 先深拷贝
    let target = _clone(target, true);

    // 获取dom样式
    const attrStyle = attr => {
        if (attr == 'opacity') {
            return Math.round(getStyle(element, attr, 'float') * 100)
        } else {
            return getStyle(element, attr)
        }
    }

    // 根字体大小，需要将 rem 转换为 px 进行运算
    const rootSize = parseFloat(getStyle(document.documentElement, 'fontSize'))

    const unit = {}
    const initState = {}

    // 获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px'
        } else {
            unit[attr] = 'px'
        }
        initState[attr] = parseInt(target[attr])
    })

    // 去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr])*rootSize)
        } else {
            target[attr] = parseInt(target[attr])
        }
    })

    let flag = true     //假设所有运动到达终点
    const rememberSpeed = {}    // 记录上一个速度值，ease-in模式下用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0  //步长
            let iCurrent = attrStyle(attr) || 0 // 当前元素属性值
            let speedBase = 0   // 目标点需要减去的基础值，三种运动状态的值不同
            let intervalTime    // 将目标值分为多少步执行
            switch (mode) {
                case 'ease-out':
                    speedBase = iCurrent
                    intervalTime = duration*5/400
                    break;
            
                default:
                    speedBase = iCurrent
                    intervalTime = duration*5/400
                    break;
            }

            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
            }

            // 判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch (mode) {
                case 'ease-out':
                    status = iCurrent != target[attr]
                    break;
                default:
                    status = iCurrent != target[attr]
            }

            if (status) {
                flag = false;
                if (attr == 'opacity') {
                    element.style.filter = 'alpha(opacity:' + (iCurrent + iSpeed) + ')'
                    element.style.opacity = (iCurrent + iSpeed) / 100
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed
                } else {
                    element.style[attr] = iCurrent + iSpeed + 'px'
                }
            } else {
                flag = true
            }

            if (flag) {
                clearInterval(element.timer)
                if (callback && element.timer) {
                    element.timer = null
                    callback()
                }
            }

        })
    }, 20)
    
}