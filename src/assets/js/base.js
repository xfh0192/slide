export default {
    // 获取类型
    _typeof: (arg) => {
        let type = typeof arg;
        if (type === 'number') {
            return /^[-]?([0-9]+\d*)$/.test(target) ? "integer" : "number";
        } else if (type !== 'object') {
            return type;
        }
        if (type === 'object') {
            // let _toString = Object.prototype.toString;
            // let result =  _toString.call(arg);
            // return result === '[object Object]' && 'Object'
            //     || result === '[object Array]' && 'Array'
            //     || result === '[object Date]' && 'Date'
            //     || result === '[object RegExp]' && 'RegExp';
            let text = Object.prototype.toString.call(arg);
            switch (text) {
                case '[object Object]':
                    return 'Object';
                case '[object Array]':
                    return 'Array';
                case '[object Null]':
                    return 'Null';
                case '[object Date]':
                    return 'Date';
                case '[object RegExp]':
                    return 'RegExp';
                default:
                    return type;
            }
        }
        return type;
    },

    // 获取根路径
    _home: () => {
        let host = location.host
        let url = location.protocol + '//' + host
        return url;
    },

    /**
     * 从某个函数的arguments数组中，根据数据类型自定匹配对应的数据
     * 如，输入为[1, "1", {}],则返回{integer : 1, string : "1", object : {}}的json格式
     */
    _reverseArguments : function(args, start, end){
        var typeMap = {};
        
        if(args && args.length){
            start = start || 0;
            end = end || args.length;
            for(var i = start; i < end; i++){
                var arg = args[i];
                var type = _typeOf(arg);
                if(!typeMap.hasOwnProperty(type)){
                    typeMap[type] = arg;
                }
            }
        }
        return typeMap;
    },

    /**
     * 这里采用可变参数，接收以下两个参数
     * path:string类型，如"/list"、"/search/more"等
     * search:object类型，用于设定search条件的key-value关系，如{x:1, y:2}
     */
    // _getApiUri : function (){
    //     var args = _reverseArguments(arguments, 0),
    //         path = args["string"] || args["integer"],
    //         search = args["object"];
        
    //     var uri = _home() + apiBaseUri;
    //     if(typeof(path) == "string"){
    //         if(path.indexOf("http") == 0){
    //             uri = path;//绝对路径
    //         }
    //         else{//相对路径
    //             uri += path[0] == "/" ? path : "/" + path;
    //         }
    //     }
    //     else if(path || path === 0 || path === false){
    //         uri += "/" + path;
    //     }
        
    //     if(search){
    //         var array = [];
    //         for(var k in search){
    //             var v = search[k];
    //             if(angular.isArray(v)){
    //                 v.forEach(function(value){
    //                     array.push(k + "=" + encodeURIComponent(value));
    //                 })
    //             }
    //             else if(angular.isObject(v)){
    //                 array.push(k + "=" + encodeURIComponent($h.request.encode(v)));
    //             }
    //             else if(v || v === 0){
    //                 array.push(k + "=" + encodeURIComponent(v));
    //             }
    //         }
    //         if(array.length){
    //             uri += "?" + array.join("&");
    //         }
    //     }
    //     return uri;
    // }
}