export default {
    // 获取类型
    typeof: (arg) => {
        if (typeof arg !== 'object') {
            return typeof arg;
        } else {
            let _toString = Object.prototype.toString;
            let result =  _toString.call(arg);
            return result === '[object Object]' && 'Object'
                || result === '[object Array]' && 'Array'
                || result === '[object Date]' && 'Date'
                || result === '[object RegExp]' && 'RegExp';
        }
        return false;
    },

    // 获取根路径
    home: () => {
        let host = location.host
        let url = location.protocol + '//' + host
        return url;
    }
}