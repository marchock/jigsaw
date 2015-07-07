/*global  JGSW */
JGSW("Settings", function () {
    'use strict';
    return {

        showGutter: false,

        classnames: {
            container: ".container",
            jigsaw: ".jigsaw",
            tiles: "item", // do not include the dot
            formElement: ".json-form",
            btnLoadMore: ".load-more"
        },

        select: {

            option: "HTML",

            url: "",

            filter: false,

            urlEndPoint: false,

            pageIndex: 1,

            pageEnd: 2
        },

        load: {
            btn: false,
            scroll: false,
            index: null,
            animate: false,
            framerate: null
        },

        breakpoints: [
            {
                position: 320,
                tile: {
                    width: 120,
                    height: 120,
                    padding: 8
                }
            }
        ],


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

        modifyTileHeight: 0,

        padding: 0,

        cols: 0,

        rows: 0,

        numOfTiles: 0,

        stopPoint: 0,

        eof: 0,

        startLoop: 0
    };
});
