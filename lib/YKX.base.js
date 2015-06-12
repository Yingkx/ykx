/**!
 *  Javascript
 *  Version:1.0.0
 *  YKX.base.js 基础函数库
 *  @author 应开翔
 */

var YKX = {
    version:"1.0.0",
};

/************************************************ Dom ****************************************************/
window.$ = function (sel, father) {
    // 判断选择器获取的值
    var _find = function (sel, father) {
        if (typeof sel == "undefined") {
            return [];
        }
        if (sel instanceof Array) {
            return sel;
        } else {
            if (typeof sel == "object") {
                if(sel.nodeType){
                    return [sel];
                } else if(sel.size){
                    return sel;
                } else {
                    return [sel];
                }
            } else {
                if (typeof sel == "string") {
                    if (father && father.length) {
                        father = father[0];
                    }
                    return selector(sel, father);
                }
            }
        }
    }

    var result = _find(sel, father);
    if (result.length) {
        Object.extend(result, _dom_prototype);
        return result;
    }
    return null;
};

/** 
 * 删除指定位置字符
 * @param          {String}          sel          选择符
 * @param          {Object}          father       父节点
 * eg.$("#test") $(".test") $("div")
 */
function selector(sel, father){

    var doc = father ? father : document,
        exprId = /^#(\w+)$/,
        exprClassName = /^\.(\w+)$/,
        exprNode = /^\w+$/,
        na = [];

    var id = (sel.match(exprId) || na)[1],
        className = !id && (sel.match(exprClassName) || na)[1],
        node = sel.match(exprNode);

    if (id) {
        return [doc.getElementById(id)];
    }

    if (className) {
        var tags = doc.getElementsByTagName("*"),
            ele = [];

        var include = function (node) {
            var temp = node.className.split(" ");
            for (var k = 0, kl = temp.length; k < kl; k++) {
                if (temp[k] == className) {
                    return true;
                }
            }
        }

        for (var i = 0, il = tags.length; i < il; i++) {
            var node = tags[i];
            if (include(node)) {
                ele.push(node);
            }
        }

        return ele;
    }

    if (node) {
        return realArray(doc.getElementsByTagName(node));
    }
}

// 转换成真实的数组
function realArray(c) {
    try {
        return Array.prototype.slice.call(c);
    } catch(e) {
        var ret = [], i = 0, len = c.length;
        for (; i < len; ++i) {
            ret[i] = c[i];
        }
        return ret;
    }
}

// dom对象拓充方法
var _dom_prototype = {
    // 获取dom节点的数量
    size: function () {
        return this.length;
    },

    // 遍历对象
    each: function (callback) {
        for(var i = 0, il = this.length; i < il; i++) {
            callback(i, $(this[i]));
        }
        return this;
    },

    /** 
     * 获取或设置对象的attribute属性值
     * @param          {String}          name          属性名
     * @param          {String}          father        属性值
     */
    attr: function (name, value) {
        // 获取属性值
        if (typeof value == "undefined") {
            var el = this[0];
            switch (name) {
                case "class" :
                    return el.className;
                case "style" :
                    return el.style.cssText;
                default :
                    return el.getAttribute(name);
            }
        // 设置属性值
        } else {

        }
    },

    // 删除节点
    remove: function () {
        this.each(function (i, n){
            n[0].parentNode.removeChild(n[0])
        });
        return this;
    },

    /** 
     * 获取或设置对象css的值
     * @param          {String}          name          css名
     * @param          {String}          father        css值
     */
    css: function (name, value) {
        // 获取css值
        if (typeof value == "undefined") {
            var el = this[0];
            // 兼容IE
            if (name == "opacity") {
                if (YKX.Browser.ie) {
                    return el.filter && el.filter.indexOf("opacity=") >= 0 ? parseFloat(el.filter.match(/opacity=([^)]*)/)[1]) / 100 : 1;
                } else {
                    return el.style.opacity ? parseFloat(el.style.opacity) : 1;
                }
            } else {

            }
        // 设置css值
        } else {

        }
    }
}

/************************************************ String ****************************************************/
/**
 * 1、 去除左右空格
 * 2、 去除左边空格
 * 3、 去除右边空格
 * 4、 获取字符串真实长度
 * 5、 删除指定位置字符
 * 6、 删除指定位置间的字符
 * 7、 将字符串插入指定位置
 * 8、 反序排列字符串
 * 9、 将指定位置字符替换为其他字符或字符串
 * 10、字符串转数组
 * 11、当前字符串是否包含指定字符串
 * 12、将HTML标签转成字符
 * 13、将字符转成HTML标签
 * 14、去除HTML标签
 * 15、字符串拼接
 * 16、字符串截取
 */

// 去除左右空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

// 去除左边空格
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
};

// 去除右边空格
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
};

// 获取字符串真实长度
String.prototype.cnLength = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length;
};

/** 
 * 删除指定位置字符
 * @param          {Number}          i          字符的索引位置
 */
String.prototype.deleteCharAt = function (i) {
    if (i < 0 || i >= this.length) {
        return this.toString();
    } else if (i == 0) {
        return this.substring(1);
    } else if (i == this.length - 1) {
        return this.substring(0, this.length - 1);
    } else {
        return this.substring(0, i) + this.substring(i + 1);
    }
};

/** 
 * 删除指定位置间的字符
 * @param          {Number}          s          字符的起始位置
 * @param          {Number}          e          字符的结束位置
 */
String.prototype.deleteString = function (s, e) {
    if (s == e) {
        return this.deleteCharAt(s);
    } else {
        if (s > e) {
            var t = e;
            e = s;
            s = t;
        }
        if (s < 0) {
            s = 0;
        }   
        if (e > this.length - 1) {
            e = this.length - 1;
        }    
        return this.substring(0, s + 1) + this.substring(e, this.length);
    }
};

/** 
 * 将字符串插入指定位置
 * @param          {Number}          s          插入的起始位置
 * @param          {String}          str        插入的字符串
 */
String.prototype.insert = function (s, str) {
    if (s < 0 || s >= this.length - 1) {
        return this.concat(str);
    }
    return this.substring(0, s + 1) + str + this.substring(s + 1);
};

// 反序排列字符串
String.prototype.reverse = function () {
    var str = "";
    for (var i = this.length - 1; i >= 0; i--) {
        str = str.concat(this.charAt(i));
    }
    return str;
};

/** 
 * 将指定位置字符替换为其他字符或字符串
 * @param          {Number}          s          被替换字符的索引位置
 * @param          {String}          str        替换用的字符串
 */
String.prototype.setCharAt = function (s, str) {
    if (s < 0 || s > this.length - 1) {
        return this.valueOf();
    }
    return this.substring(0, s) + str + this.substring(s + 1);
};

/** 
 * 字符串转数组
 * @param          {String}          str        目标字符串
 * @param          {String}          o          分割字符
 */
String.prototype.toArray = function (str, o) {
    return str.split(o || '');
};

// 当前字符串是否包含指定字符串
String.prototype.contains = function (str) {
    var currentIndex = this.indexOf(str);
    if (currentIndex != -1) {
        return true;
    } else {
        return false;
    }
};

// 将HTML标签转成字符
String.prototype.escapeHTML = function() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};

// 将字符转成HTML标签
String.prototype.unescapeHTML = function() {
    return this.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
};

// 去除HTML标签 
String.prototype.removeHTML = function(){
    return this.replace(/<\/?[^>]+>/gi, '');
};

// 字符串拼接
// eg. "<div>{0}</div>{1}".format(txt0,txt1);
String.prototype.format = function(){
    var  str = arguments[0], args = [];
    for (var i = 1, il = arguments.length; i < il; i++) {
        args.push(arguments[i]);
    }
    return str.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};
 
// 字符串截取
String.prototype.cutStr = function (max) {
    var len = this.length,
        list = this.split(''),
        i, t = 0;
    for (i = 0; i < len; i++) {
        t++;
        if (/[^\x00-\x80]/g.test(list[i])) {
            t++;
        }
        if (t >= max) {
            return this.slice(0, (i + 1)) + '..';
        }
    }
    return this;
}

/************************************************ Array ****************************************************/
/**
 * 1、清空数组
 * 2、获取数组的最后一个值
 * 3、获取当前值或对象在数组的下标
 * 4、当前数组是否包含某个值或对象
 * 5、获取指定元素下标
 * 6、数组去重 
 * 7、清除数组中空值
 */

// 清空数组
Array.prototype.clear = function () {
    this.length = 0;
    return this;
};

// 获取数组的最后一个值
Array.prototype.last = function () {
    return this[this.length - 1];
};

/** 
 * 获取当前值在数组中的下标
 * @param          {Object}          value        目标值
 */
Array.prototype.index = function(value) {
    for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i] == value) {
            return i;
        }
    }
    return -1;
};

/** 
 * 数组是否包含当前值
 * @param          {Object}          value        目标值
 */
Array.prototype.include = function(value) {
    return this.index(value) != -1;
};

/** 
 * 将指定的值从数组中移出
 * @param          {Object}          o            目标值
 */
Array.prototype.remove = function(o) {
    if (typeof o == 'number' && !YKX.Array.include(o)) {
        this.splice(o, 1);
    } else {
        var i = YKX.Array.index(o);
        this.splice(i, 1);
    }
    return this;
};

// 数组去重
Array.prototype.unique = function () {
    var n = [];
    for (var i = 0; i < this.length; i++) {
        if (n.indexOf(this[i]) == -1)
            n.push(this[i]);
    }
    return n;
};

// 清除数组中空值
Array.prototype.clearNull = function () {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == "" || typeof (this[i]) == "undefined") {
            this.splice(i, 1);
            i = i - 1;
        }
    }
    return this;
};

/************************************************ Date ****************************************************/
// 格式化时间
// eg. new Date().format('yyyy-MM-dd');
Date.prototype.format = function(f){
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(f)) {
        f = f.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    } 
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(f)) {
            f = f.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }  
    }
    return f;
};

/************************************************ Object ****************************************************/
/** 
 * 深拷贝
 * @param          {Object}          target            需要复制的对象
 * @param          {Object}          src               被复制对象
 */
Object.extend = function (target,src) {
    for (var it in src) {
        target[it] = src[it];
    }
    return target;
};

/**
 * 克隆对象
 * @param          {Object}          obj               被克隆的对象
 */
Object.clone = function(obj){
    var con = obj.constructor, cloneObj = null;
    if(con == Object){
        cloneObj = new con();
    } else if (con == Function){
        return Como.Function.clone(obj);
    } else cloneObj = new con(obj.valueOf());

    for(var it in obj){
        if(cloneObj[it] != obj[it]){
            if(typeof(obj[it]) != 'object'){
                cloneObj[it] = obj[it];
            } else {
                cloneObj[it] = arguments.callee(obj[it])
            }
        }
    }
    cloneObj.toString = obj.toString;
    cloneObj.valueOf = obj.valueOf;
    return cloneObj;
};

/************************************************ Function ****************************************************/
/**
 * 克隆函数
 * @param          {Object}          fun               被克隆的函数
 */
Function.prototype.clone = function(fun){
    var clone = function(){
        return fun.apply(this, arguments);  
    };
    clone.prototype = fun.prototype;
    for(prototype in fun){
        if(fun.hasOwnProperty(prototype) && prototype != 'prototype'){
            clone[prototype] = fun[prototype];
        }
    }
    return clone;
};

/************************************************* Cookie ******************************************************/
YKX.Cookie = {
    /** 
     * 获取Cookie值
     * @param          {String}          name            cookie名
     */
    get: function(name){
        var v = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
        return v ? decodeURIComponent(v[1]) : null;
    },

    /** 
     * 设置Cookie值
     * @param          {String}          name            cookie名
     * @param          {String}          value           cookie值
     * @param          {Date}            expires         终止时间
     * @param          {String}          path            访问路径
     * @param          {String}          domain          主机名
     */
    set: function(name, value ,expires, path, domain){
        var cookieText = encodeURIComponent(name) + "=" +encodeURIComponent(value);

        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },

    /** 
     * 删除Cookie值
     * @param          {String}          name            cookie名
     * @param          {String}          path            访问路径
     * @param          {String}          domain          主机名
     */
    del: function(name, path, domain){
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
};

/************************************************* 事件 ******************************************************/
YKX.Event = {
    /**
     * 绑定事件
     * @param          {Object}          element          要操作的元素
     * @param          {String}          type             事件名称
     * @param          {Function}        handler          事件执行的函数
     */
    on: function(element,type,handler){
        if (element.addEventListener) {
            element.addEventListener(type,handler,false);
        } else if (element.attachEvent){
            element.attachEvent("on"+type,handler);
        } else {
            element["on"+type] = handler;
        }
    },

    /**
     * 解绑事件
     * @param          {Object}          element          要操作的元素
     * @param          {String}          type             事件名称
     * @param          {Function}        handler          事件执行的函数
     */
    un: function(element,type,handler){
        if (element.removeEventListener) {
            element.removeEventListener(type,handler,false);
        } else if (element.detachEvent){
            element.detachEvent("on"+type,handler);
        } else {
            element["on"+type] = null;
        }
    },

    // 获取事件对象
    getEvent: function(event){
        return event ? event : window.event;
    },

    // 获取产生事件的目标
    getTarget: function(event){
        return event.target || event.srcElement;
    },

    // 取消元素本身的事件
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },

    // 取消事件的冒泡
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },

    // 事件的绝对坐标
    pos: function(e){
        if (e.pageX || e.pageY) {
            return {
                x: e.pageX,
                y: e.pageY
            };
        }
        return {
            x: e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
            y: e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
        };
    },

    /**
     * 模拟用户触发一个事件
     * @param          {Object}          el          要操作的元素
     * @param          {String}          ename        事件名称
     */
    simulate: function(el, ename){
        if(!el) return;
        if(YKX.Browser.ie) {
            el[ename]();
        } else if (document.createEvent) {
            var ev = document.createEvent('HTMLEvents');
            ev.initEvent(ename, false, true);
            el.dispatchEvent(ev);
        }
        return el;
    },
};

/************************************************* BOM ******************************************************/
// 浏览器检测
(function(){
    var agent = navigator.userAgent.toLowerCase();
    YKX.Browser = {
        version: (agent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
        safari: /webkit/i.test(agent) && !this.chrome,
        opera: /opera/i.test(agent),
        firefox:/firefox/i.test(agent),
        ie: /msie/i.test(agent) && !/opera/.test(agent),
        chrome: /chrome/i.test(agent) && /webkit/i.test(agent) && /mozilla/i.test(agent)
    };
})();

// 向URL地址末尾添加查询字符串
YKX.Browser.addURLParam = function(url, name, value){
    url += (url.indexOf("?") == -1 ? "?":"&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

// 获取URL地址中的参数
YKX.Browser.getUrlParam = function () {
    var s = location.search,
        qs = s.length > 0 ? s.substring(1) : "";
    var items = qs.length ? qs.split("&") : [],
        len = items.length;
 
    var args = {};
 
    for (var i = 0; i < len; i++) {
        var item = items[i].split("="),
            name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
 
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

/************************************************* AJAX ******************************************************/
// 获取XHR对象，兼容IE7以下
var createXHR = (function (){
    if (typeof XMLHttpRequest != "undefined"){
        return function (){
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject != "undefined"){
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
            var l,len;
            for (var i=0, len = versions.length; i<len; i++) {
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {

                }
            }
        }

        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("没有XHR对象");
    }
})();

/**
 * 发送请求
 * @param          {String}          method          请求的类型
 * @param          {String}          url             请求地址
 * @param          {Object}          req             请求参数
 * @param          {Boolean}         sync            是否异步发送
 * @param          {Function}        callback        回调函数
 */
function sendAjax(method,url,req,sync,callback){
    var xhr = createXHR();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                var data = JSON.parse(xhr.responseText);
                callback.success(data);
            }else{
                callback.failure(xhr.status);
            }
        }
    };
    xhr.open(method,url,sync);
    xhr.send(req);
}


/************************************************* 其他 ******************************************************/
/**
 * 获取随机数
 * @param       {Number}     n     随机数可能取到值的总数
 * @param       {Number}     f     随机数起始值
 *
 * getRandom(5,2) //2,3,4,5,6 可能出现的值
 */
YKX.Other = {
    ran: function(n, f) {
        return Math.floor(Math.random() * n + f);
    },
}









