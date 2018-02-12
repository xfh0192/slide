
/**
 * 观察者模式
 */
function Mediator() {
    /**
     * 存储订阅事件的列表
     * {
     *      click: [{fn:fn1, ctx:xx, ctx2:xx}, {fn:fn2, ctx:xx, ctx2:xx} ...]
     * }
     */
    var eventMap = {};

    // // 对事件列表的每一项进行处理，提供包装功能
    // function eachEvent(type, fn, iterator) {
    //     eventMap[type].every(function (set) {
    //         iterator(set.e, set.fn);
    //         return true;
    //     })
    // }

    var mediator = {

        /**
         * 绑定事件
         * @method on
         * @grammar on(type, fn[, context]) => self
         * @param {String}      [type]    事件名
         * @param {Function}    [fn]      事件处理器
         * @param {Object}      [context]   事件处理器的上下文
         * @return {self}   返回自身，方便链式调用
         * @chainable 
         * @class Mediator
         */
        on: function (type, fn, context) {
            var _this = this;
            var handlers = eventMap[type] || (eventMap[type] = [])
            var set = {};       // 包含该回调函数的信息

            if (!fn) {
                return this;
            }

            set.e = type;
            set.fn = fn;
            set.ctx = context;
            set.ctx2 = _this;
            set.id = eventMap[type]

            handlers.push(set)

            return this;
        },

        once: function (type, fn, context) {
            var _this = this;
            var handlers = eventMap[type] || (eventMap[type] = [])
            var set = {};

            if (!fn) {
                return this;
            }

            set.e = type;
            // set.fn = fn;
            set.ctx = context;
            set.ctx2 = _this;
            set.id = eventMap[type]
            var once = function () {
                _this.off(type, once, context)
                return fn.apply(context || _this, arguments);
            }
            set.fn = once;

            handlers.push(set)

            return this;
        },

        /**
         * 解除事件绑定
         * @method off
         * @grammar off(type, fn[, context]) => self
         * @param {String}      [type]      事件名
         * @param {Function}    [fn]        事件处理器
         * @param {Object}      [context]   事件处理器的上下文
         * @return {self}       返回自身，方便链式
         * @chainable
         */
        off: function (type, fn, context) {
            var handlers = eventMap[type]

            if (!handlers) {
                return this;
            }

            // 没有指定fn，则清空该事件处理器列表
            if (!type && !fn && !context) {
                handlers = [];
                return this;
            }

            // 指定了fn，解除该fn            
            for(var i = 0; i < handlers.length; i++) {
                var set = handlers[i];
                if(set.e === type && set.fn === fn && set.ctx === context) {
                    handlers.splice(i, 1)
                    return this;
                }
            }
        },

        trigger: function (type) {
            var handlers = eventMap[type]
            var len = handlers.length

            if (!type || !handlers) {
                return this;
            }

            for (var i = 0; i < len; i++) {
                var handler = handlers[i]
                handler.fn.apply(handler.ctx || handler.ctx2, arguments)
            }
        }
    }

    return mediator;
}

export default Mediator();