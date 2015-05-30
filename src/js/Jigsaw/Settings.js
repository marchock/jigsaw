/*global  JGSW */
JGSW("Settings", function () {
    'use strict';
    return {

        classnames: {
            tiles: "item", // do not include the dot
            formElement: ".json-form",
            btnLoadMore: ".load-more"
        },

        getDataFrom: "html",

        url: "",

        urlEndPoint: false,

        filter: false,

        loadNumOfTiles: null,

        getWidthFrom: "",

        showGutter: true,

        page: {
            url: "",
            num: 1,
            end: 2
        },

        tile: [
            {
                classname: "smallitem",
                w: 1,
                h: 1
            },
            {
                classname: "largeitem",
                w: 2,
                h: 2
            },
            {
                classname: "longitem",
                w: 2,
                h: 1
            },
            {
                classname: "tallitem",
                w: 1,
                h: 2
            }
        ],

        resize: [
            {
                breakpoint: 320,
                tileWidth: 160,
                tileHeight: 160,
                tileSpace: 8
            }
        ],

        animate: false,

        scroll: false,

        loadMore: false,

        cols: 0,

        rows: 0,

        numOfTiles: 0,

        stopPoint: 0,

        eof: 0,

        startLoop: 0
    };
});
