
module.exports = function (s, utils, tiles) {
    'use strict';
    var bwbp = [],
        settings = s;

    (function () {
        var i = 0,
            eof = settings.breakpoints.length,
            startPosition = 0,
            endPosition = 0;

        for (i = 0; i < eof; i += 1) {
            startPosition = settings.breakpoints[i].position;
            endPosition = eof > (i + 1) ? (settings.breakpoints[i + 1].position - 1) : 10000;
            bwbp.push([startPosition, endPosition]);
        }
    }());

    return {

        browserResize: function (ele) {
            clearInterval(this.interval);

            var w = utils.getWidth(),
                breakpoints = [],
                i = 0,
                index = 0;

            // find which tile size to use
            for (i = 0; i < settings.breakpoints.length; i += 1) {
                if (bwbp[i][1] >= w &&
                        bwbp[i][0] < w) {
                    index = i;
                }
            }
            tiles.updateSettings(w, index, ele);

            // recalculate tile width
            breakpoints.push(w + 1);
            breakpoints.push(w - 1);

            this.listenForBrowserResize(breakpoints);
        },

        listenForBrowserResize: function (breakpoints) {

            var w,
                me = this;

            this.interval = setInterval(function () {
                w = utils.getWidth();

                if (breakpoints[0] <= w) {

                    me.browserResize();

                } else if (breakpoints[1] >= w && w >= settings.breakpoints[0].position) {

                    me.browserResize();
                }

            }, 10); // if performance issues for loading increase interval time
        }
    };
};
