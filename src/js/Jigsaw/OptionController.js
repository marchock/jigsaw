

//NOTE: rename to SelectController or option controller

module.exports =  function () {
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

            switch (Settings.select.option) {
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

            if (Settings.select.option === "page") {
                // page load all tiles inside jigsaw
                // Setting update with element.length number
                Settings.load.index = eof;
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

            if (Settings.select.urlEndPoint) {
                url = Settings.select.url + "?" + Elements.getFormData("serialize");
                console.log(url);
            } else {
                url = Settings.select.url;
            }

            Settings.stopPoint = Settings.load.index;
            Settings.startLoop = 0;

            if (!DataCached) {
                Request.json(url, function (data) {

                    // only cache data for when Settings.select.filter is true
                    DataCached = Settings.select.filter ? data : DataCached;
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
};
