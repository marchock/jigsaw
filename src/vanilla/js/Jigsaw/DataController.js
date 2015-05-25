/*global  JGSW */

JGSW("DataController", function () {
    'use strict';

    var Settings,
        Elements,
        Tiles,
        BreakPoints,
        Request,
        DataCached;

    return {

        init: function (s, e, t, b, r) {
            Settings = s;
            Elements = e;
            Tiles = t;
            BreakPoints = b;
            Request = r;

            switch (Settings.getDataFrom) {
            case "html":
            case "page":
                this.html();
                break;
            case "json":
                this.json();
                break;
            case "post":
                break;
            }
        },

        html: function () {
            var $elements = Elements.getChildren(),
                i = 0,
                eof = $elements.length,
                data = [],
                string = "";

            if (Settings.getDataFrom === "page") {
                // page load all tiles inside jigsaw 
                // Setting update with element.length number
                Settings.loadNumOfTiles = eof;
                Settings.stopPoint = eof;
                Settings.eof = eof;
            }

            for (i = 0; i < eof; i += 1) {

                string = $elements[i].getAttribute("class");
                string = string.replace(Settings.classnames.tiles, "");
                string = string.trim();

                data.push({classname: string});
            }

            Tiles.setup(data);
            BreakPoints.browserResize();
        },

        json: function () {

            var filteredData = [],
                url = "";

            if (Settings.urlEndPoint) {
                url = Settings.url + "?" + Elements.getFormData("serialize");
                console.log(url);
            } else {
                url = Settings.url;
            }

            Settings.stopPoint = Settings.loadNumOfTiles;
            Settings.startLoop = 0;

            if (!DataCached) {
                Request.json(url, function (data) {

                    // only cache data for when Settings.filter is true
                    DataCached = Settings.filter ? data : DataCached;


                    Tiles.setup(data.tiles);
                    Elements.createHTMLElements(data.tiles);
                    BreakPoints.browserResize();
                });
            } else {

                var filters = Elements.getFormData("formInputValues"),
                    counter = 0,
                    i = 0,
                    eof = filters.length;

                DataCached.tiles.filter(function (data) {
                    counter = 0;

                    for (i = 0; i < eof; i += 1) {
                        if (data[filters[i].name] === filters[i].val) {
                            counter += 1;
                        }
                    }
                    // match every filter value to push to filteredData array
                    if (counter === eof) {
                        filteredData.push(data);
                    }
                });

                if (filters.length < 1) {
                    filteredData = DataCached.tiles;
                }

                Tiles.setup(filteredData);
                Elements.createHTMLElements(filteredData);
                BreakPoints.browserResize();
            }
        }
    };
});