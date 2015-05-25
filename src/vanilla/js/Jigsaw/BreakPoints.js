JGSW("BreakPoints", function (s, utils, tiles) {
    'use strict';
    var bwbp = [],
        settings = s;

    (function () {
        var i = 0,
            eof = settings.resize.length,
            start = 0,
            end = 0;

        for (i = 0; i < eof; i += 1) {
            start = settings.resize[i].breakpoint;
            end = eof > (i + 1) ? (settings.resize[i + 1].breakpoint - 1) : 10000;
            bwbp.push([start, end]);
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
            for (i = 0; i < settings.resize.length; i += 1) {
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

                } else if (breakpoints[1] >= w && w >= settings.resize[0].breakpoint) {

                    me.browserResize();
                }

            }, 10); // if performance issues for loading increase interval time
        },
    };
});
