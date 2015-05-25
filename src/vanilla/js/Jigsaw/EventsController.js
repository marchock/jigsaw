/*global  JGSW */
JGSW("EventsController", function () {
    'use strict';
    var btnAddMore,
        filterObject;

    return {
        getMethod: function (obj, method) {
            switch (method) {
            case "addMore":
                btnAddMore = obj[method];
                break;
            case "json":
                filterObject = obj[method];
                break;
            }
        },

        loadMoreBtn: function (ele, eventType) {
            ele.addEventListener(eventType, function () {
                btnAddMore();
            });
        },

        filterGrid: function (ele, eventType, filter) {
            ele.addEventListener(eventType, function (e) {

                var i = 0,
                    eof = e.target.length,
                    value = "";

                if (filter) {
                    for (i = 0; eof > i; i += 1) {
                        if (e.target[i].selected) {
                            value = e.target[i].value;
                        }
                    }
                }

                filterObject(value);
            });
        }
    };
});