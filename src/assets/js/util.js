
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
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，不属于style，只有document.body才能用
    if (attr == 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        // target = document.defaultView.getComputedStyle(element,null)[attr]; 
        target = document.defaultView.getComputedStyle(element,null)[attr];
    }
    return target;
    //在获取 opactiy 时需要获取小数 parseFloat
    // return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
}