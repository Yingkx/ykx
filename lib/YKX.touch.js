// 手势
(function() {
    var touch = {
        "version": "1.0.0",

        on: function(ele, type, callback) {
            switch (type) {
                case "tap":
                    touch.tap(ele, callback);
                    break;
                case "longTap":
                    touch.longTap(ele, callback);
                    break;
                case "swipeUp":
                case "swipeDown":
                case "swipeLeft":
                case "swipeRight":
                    touch.swipe(ele, callback, type);
                    break;
            }
        },

        addEvent: function(ele, type, callback) {
            ele.addEventListener(type, callback, false);
        },

        // 点击
        tap: function(ele, callback) {
            var sX, sY, sT;

            var handles = {
                touchstart: function(e) {
                    e.preventDefault();

                    var touches = e.touches[0];
                    sX = touches.clientX;
                    sY = touches.clientY;

                    sT = Date.now();
                },

                touchend: function(e) {
                    var touches = e.changedTouches[0],
                        eX = touches.clientX,
                        eY = touches.clientY;

                    var duration = Date.now() - sT;

                    if (duration < 250 && Math.abs(eX - sX) < 6 && Math.abs(eY - sY) < 6) {
                        callback(e);
                    }
                }
            };

            touch.addEvent(ele, "touchstart", handles.touchstart);
            touch.addEvent(ele, "touchend", handles.touchend);
        },

        // 长按
        longTap: function(ele, callback) {
            var sX, sY, timer = null;

            var clearTime = function() {
                clearTimeout(timer);
                timer = null;
            }

            var handles = {
                touchstart: function(e) {
                    e.preventDefault();

                    var touches = e.touches[0];
                    sX = touches.clientX;
                    sY = touches.clientY;

                    timer = setTimeout(function() {
                        callback(e);
                    }, 750);
                },

                touchmove: function(e) {
                    e.preventDefault();

                    var touches = e.touches[0],
                        mX = touches.clientX,
                        mY = touches.clientY;

                    if (timer && Math.abs(mX - sX) > 5 && Math.abs(mY - sY) > 5) {
                        clearTime();
                    }
                },

                touchend: function() {
                    if (timer) {
                        clearTime();
                    }
                }
            }

            touch.addEvent(ele, "touchstart", handles.touchstart);
            touch.addEvent(ele, "touchmove", handles.touchmove);
            touch.addEvent(ele, "touchend", handles.touchend);
        },

        swipe: function(ele, callback, type) {
            var sX, sY, isTouchMove;

            var handles = {
                touchstart: function(e) {
                    e.preventDefault();

                    var touches = e.touches[0];
                    sX = touches.clientX;
                    sY = touches.clientY;
                    isTouchMove = false;
                },

                touchmove: function() {
                    isTouchMove = true;
                },

                touchend: function(e) {
                    if (!isTouchMove) {
                        return;
                    }

                    var touches = e.changedTouches[0],
                        eX = touches.clientX,
                        eY = touches.clientY,
                        dX = eX - sX,
                        dY = eY - sY;

                    if (Math.abs(dX) > Math.abs(dY)) {
                        if (dX < -20) {
                            if (type == "swipeLeft") {
                                callback(e);
                            }
                        } else if (dX > 20) {
                            if (type == "swipeRight") {
                                callback(e);
                            }
                        }
                    } else {
                        if (dY < -20) {
                            if (type == "swipeUp") {
                                callback(e);
                            }
                        } else if (dY > 20) {
                            if (type == "swipeDown") {
                                callback(e);
                            }
                        }
                    }
                }
            };

            touch.addEvent(ele, "touchstart", handles.touchstart);
            touch.addEvent(ele, "touchmove", handles.touchmove);
            touch.addEvent(ele, "touchend", handles.touchend);
        },
    }

    window.touch = touch;

})(window);