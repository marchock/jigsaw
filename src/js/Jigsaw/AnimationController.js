/*global  JGSW */
JGSW("AnimationController", function (s, u) {
    'use strict';

    var Settings = s,
        Utils = u,
        ele = [],
        counter = 0;

    return {

        start: function (e) {
            ele = e;
            counter = Settings.startLoop;
            this.loop();
        },

        loop: function () {
            if (counter < Settings.stopPoint) {

                this.jigsawTimer(1000 / Settings.load.framerate);

            } else {
                //this.settings.cb("animation completed");
                this.removeClassFromElements();
            }
        },

        removeClassFromElements: function () {
            var i = 0,
                eof = Settings.stopPoint;

            for (i = Settings.startLoop; i < eof; i += 1) {
                Utils.removeClass(ele[i], "animate start");
            }
        },


        addClassToTiles: function () {
            Utils.addClass(ele[counter], "start");
            counter += 1;
            this.loop();
        },


        jigsawTimer: function (time) {
            clearTimeout(this.jTimer);
            var me = this;

            this.jTimer = setTimeout(function () {

                me.addClassToTiles();

            }, time);
        }
    };
});
