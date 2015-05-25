/*global JGSW */
JGSW("Utils", function (s) {
    'use strict';

    var settings = s;

    return {
        getWidth: function () {
            // TESTING REQUIRED - all browsers and devices (getWidth)
            // http://www.javascriptkit.com/dhtmltutors/dhtmlcascade4.shtml
            // http://stackoverflow.com/questions/8136501/whats-the-difference-bewteen-document-defaultview-getcomputedstyle-and-window-g
            // TODO: might be a cross browser issue with getComputedStyle

            var w;

            if (settings.getWidthFrom) {

                w = this.getComputedStyle(document.querySelector(settings.getWidthFrom));

            } else {

                w = this.getComputedStyle(document.getElementsByTagName("body")[0]);
            }

            w = w > settings.resize[0].breakpoint ? w : settings.resize[0].breakpoint;

            return w;
        },

        getComputedStyle: function (ele) {
            var comStyle = document.defaultView.getComputedStyle(ele, "");
            // parseInt removes the "px" at the end and converts to a number
            return parseInt(comStyle.getPropertyValue("width"), 10);
        },

        // calculates the total number of 1x1 tiles within the tiles object
        getNumberOfTiles: function (stopPoint, tiles) {

            var i = 0,
                x = 0,
                y = 0,
                num = 0;

            for (i = 0; i < stopPoint; i += 1) {
                x = tiles[i].w;
                y = tiles[i].h;
                num += (x * y);
            }
            return num;
        },

        setArrayLength: function (c) {
            var a = [],
                i = 0;

            for (i = 0; i < c; i += 1) {
                a[i] = 0;
            }
            return a;
        },

        tileResize: function (w) {
            var width = this.getWidth();

            if (w > width) {
                w = (settings.tileWidth * settings.cols) - settings.spacing;
            }
            return w;
        },

        serialize: function (form) {
            var ary = [],
                i = 0;

            ary = this.getFormData(form, ary, "SELECT", "select-one");
            ary = this.getFormData(form, ary, "INPUT", "hidden");
            ary = this.getFormData(form, ary, "INPUT", "radio");

            for (i = 0; i < ary.length; i += 1) {
                if (ary[i].val) {
                    ary[i] = ary[i].name + "=" + encodeURIComponent(ary[i].val);
                } else {
                    ary[i] = "";
                }
            }
            return ary.join("&");
        },

        formInputValues: function (form) {
            var ary = [],
                filter = [],
                i = 0;

            ary = this.getFormData(form, ary, "SELECT", "select-one");
            ary = this.getFormData(form, ary, "INPUT", "radio");

            for (i = 0; i < ary.length; i += 1) {
                if (ary[i].val) {
                    filter.push(ary[i]);
                }
            }
            return filter;
        },

        // code reference
        //https://code.google.com/p/form-serialize/source/browse/trunk/serialize-0.1.js
        getFormData: function (form, data, input, inputType) {
            var ele = form.elements,
                i = 0,
                eof = ele.length;

            for (i = eof - 1; i >= 0; i = i - 1) {

                if (ele[i].nodeName === input &&
                        ele[i].type === inputType) {

                    data.push({
                        name: ele[i].name,
                        ele: ele[i],
                        val: ele[i].value
                    });
                }
            }
            return data;
        }
    };
});