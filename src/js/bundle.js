(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = function (s, u) {
    
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
};

},{}],2:[function(require,module,exports){

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

},{}],3:[function(require,module,exports){

module.exports = function (s, u, e, a) {
    'use strict';

    var Settings = s,
        Utils = u,
        Events = e,
        Animation = a,
        cachedData,
        $parent = document.querySelector(".jigsaw"),
        $children = $parent.querySelectorAll("." + Settings.classnames.tiles),
        $btnLoadMore = document.querySelector(Settings.classnames.btnLoadMore),
        $form = document.querySelector(Settings.classnames.formElement);

    if (Settings.load.btn) {
        Events.loadMoreBtn($btnLoadMore, "click");

        if (Settings.load.animate && !Settings.load.framerate) {
            //setDefault value
            Settings.load.framerate = 16;
        }
    }

    /*
     * Loop through form and find elements (radio and select) to attach events to
     */
    if (Settings.select.filter || Settings.select.urlEndPoint) {

        var ele = $form.elements,
            c = 0,
            eof = (ele.length - 1),
            createEvent = false;

        for (c = eof; c >= 0; c -= 1) {

            createEvent = false;

            if (ele[c].nodeName === "INPUT" &&
                    ele[c].type === "radio") {
                createEvent = true;

            } else if (ele[c].nodeName === "SELECT" &&
                    ele[c].type === "select-one") {
                createEvent = true;
            }

            if (createEvent) {
                Events.filterGrid(ele[c], "change", Settings.select.filter);
            }
        }
    }

    return {

        getChildren: function () {
            return $children;
        },

        updateChildren: function () {
            $children = $parent.querySelectorAll("." + Settings.classnames.tiles);
        },

        removeChildren: function () {
            $parent.innerHTML = "";
        },

        getFormData: function (string) {
            //serialize
            //formInputValues

            return Utils[string]($form);
        },

        getLength: function () {
            return $children.length;
        },

        getForm: function () {
            return $form;
        },

        updateTiles: function (tiles) {
            var i = 0,
                w = 0;

            for (i = Settings.startLoop; i < Settings.stopPoint; i += 1) {

                // if tile option is resize then width is calculated to fit...
                w = Utils.tileResize(tiles[i].cssWidth);

                $children[i].style.width = w + "px";
                $children[i].style.height = tiles[i].cssHeight + "px";
                $children[i].style.left = tiles[i].l + "px";
                $children[i].style.top = tiles[i].t + "px";
                $children[i].style.display = tiles[i].display;

                if (Settings.load.animate) {
                    Utils.addClass($children[i], "animate");
                }
            }

            if (Settings.load.animate) {

                Animation.start($children);

                // stop browser resizing triggering animation
                Settings.load.animate = false;
            }
        },

        appendData: function (data) {
            $parent.innerHTML += data;
            this.updateChildren();
        },

        updateWidth: function (w) {
            $parent.style.width = w + "px";
        },

        updateHeight: function (h) {
            $parent.style.height = h + "px";
        },

        createHTMLElements: function (data) {
            var i = 0;

            if (data) {
                cachedData = data;
                this.removeChildren();
            }

            for (i = Settings.startLoop; i < Settings.stopPoint; i += 1) {
                Settings.tileTemplate(cachedData[i], $parent);
            }
            this.updateChildren();
        },

        hide: function (string) {
            switch (string) {

            case "loadMore":
                if (Settings.load.btn) {
                    $btnLoadMore.style.display = "none";
                }
                break;
            }
        },

        show: function (string) {
            switch (string) {

            case "loadMore":
                if (Settings.load.btn) {
                    $btnLoadMore.style.display = "block";
                }
                break;
            }
        }
    };
};

},{}],4:[function(require,module,exports){

module.exports =  function () {
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
};
},{}],5:[function(require,module,exports){

module.exports = function (defaultSettings, options) {
    'use strict';
    var settings = defaultSettings;
    Object.keys(options).forEach(function (key) {
        settings[key] = options[key];
    });
    return settings;
};
},{}],6:[function(require,module,exports){

module.exports =  function (s, u, e) {
    'use strict';
    var grid = [],
        settings = s,
        utils = u,
        elements = e;

    return {

        resetgrid: function () {
            grid = [];
        },

        createRowsAndCols: function () {
            var i = 0;
            for (i = 0; i < settings.rows; i += 1) {

                // if grid row does not have an array then create an array to represent columns
                if (!grid[i]) {
                    grid[i] = utils.setArrayLength(settings.cols);
                }
            }
        },

        spaceAvailable: function (row, column) {
            var v;

            if (arguments.length > 1) {
                v = grid[row][column];
            } else {
                v = grid[row];
            }

            return v;
        },

        hasSpace: function (w, h, row, column) {

            var b = true,
                i = 0,
                ii = 0;

            for (i = 0; i < h; i += 1) {

                for (ii = 0; ii < w; ii += 1) {

                    if ((column + ii) < settings.cols) {

                        // Add another grid row to fit tile
                        if (grid.length <= (row + i)) {
                            grid[grid.length] = utils.setArrayLength(settings.cols);
                        }

                        if (!grid[row + i][column + ii]) {
                            b = true;

                        } else {
                            b = false;
                            break;
                        }

                    } else {

                        b = false;
                        break;
                    }
                }

                // if false stop for loop
                if (!b) { break; }
            }

            return b;
        },


        update: function (w, h, row, column) {

            var i = 0,
                ii = 0;

            for (i = 0; i < h; i += 1) {

                for (ii = 0; ii < w; ii += 1) {

                    grid[row + i][column + ii] = 1;
                }
            }
        },


        removeEmptyRows: function () {
            var i,
                c,
                ii,
                d = [],
                height = 0;

            // search rows for empty columns 
            for (i = 0; i < grid.length; i += 1) {
                c = 0;
                for (ii = 0; ii < grid[i].length; ii += 1) {
                    if (!grid[i][ii]) {
                        c += 1;
                    }
                }

                // if the entire row is false then add row number to be deleted
                if (c === settings.cols) {
                    d.push(i);
                }

            }
            // reverse array to start the delete loop with the highest number 
            d.reverse();

            for (i = 0; i < d.length; i += 1) {
                grid.splice(d[i], 1);
            }

            height = settings.showGutter ? (grid.length * settings.modifyTileHeight) : ((grid.length * settings.modifyTileHeight) - settings.padding);
            elements.updateHeight(height);
        },

        newRow: function (array) {
            grid[grid.length] = array;
        },

        getRowLength: function () {
            return grid.length;
        }
    };
};

},{}],7:[function(require,module,exports){


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

},{}],8:[function(require,module,exports){

module.exports =  function () {
    'use strict';

    var xmlhttp;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return {

        page: function (Settings, callBack) {

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    callBack(xmlhttp.responseText);
                }
            };
            xmlhttp.open("GET", Settings.select.url + Settings.select.pageIndex + ".html", true);
            xmlhttp.send();
        },

        json: function (url, callBack) {

            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    callBack(JSON.parse(xmlhttp.responseText));
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
    };
};

},{}],9:[function(require,module,exports){

module.exports =  function () {
    'use strict';
    return {

        showGutter: false,

        classnames: {
            container: ".container",
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
};

},{}],10:[function(require,module,exports){

module.exports =  function (s, u, g, e, r, o) {
    'use strict';
    var Settings = s,
        Utils = u,
        Grid = g,
        Elements = e,
        Request = r,
        Optn = o,
        Tiles = [],
        me;

    return {

        setup: function (data) {
            // (me = this) to handle scope issues from event calls
            // .addMore() event is called from Events Controller
            me = this;

            // reset tiles;
            Tiles = [];

            var i = 0,
                ii = 0,
                eof = data.length,
                eof2 = Settings.tile.length,
                w = 0,
                h = 0,
                classname;

            if (Settings.stopPoint > eof) {
                Settings.stopPoint = eof;
                if (Settings.select.option !== "page") {
                    Elements.hide("loadMore");
                }
            } else {
                if (Settings.select.option !== "page") {
                    Elements.show("loadMore");
                }
            }

            //loop through tile Elements
            for (i = 0; i < eof; i += 1) {

                classname = data[i].classname; // Depending on the data structure this will change

                // loop through Settings tiles
                for (ii = 0; ii < eof2; ii += 1) {

                    if (classname === Settings.tile[ii].classname) {

                        w = Settings.tile[ii].w;

                        h = Settings.tile[ii].h;

                        Tiles.push(this.tileTemplate(w, h, classname));
                    }
                }
            }
        },

        build: function () {
            var i = 0;

            // set tiles created to false to reposition.
            for (i = 0; i < Tiles.length; i += 1) {
                Tiles[i].created = false;
                Tiles[i].display = "block";
            }

            Grid.resetgrid();
            this.updateGrid();
        },

        updateGrid: function () {

            // get the number of tiles
            Settings.numOfTiles = Utils.getNumberOfTiles(Settings.stopPoint, Tiles);
            // get the number of rows
            Settings.rows = Math.round(Settings.numOfTiles / Settings.cols);
            // create and expand rows inside the grid
            Grid.createRowsAndCols();
            this.jigsawEngine();
        },


        jigsawEngine: function () {
            // fits tiles into a grid layout

            var i = 0,
                acC = 0,// array counter column
                acR = 0,// array counter row
                tc = 0,
                addTile,
                w = 0,
                h = 0;

            /*
             * search grid array for empty spaces to fit tiles
             */
            for (i = 0; i < Settings.numOfTiles; i += 1) {

                addTile = true;
                w = this.resize(Tiles[tc].w);
                h = Tiles[tc].h;

                // if grid position is false then space is available for a tile
                if (!Grid.spaceAvailable(acR, acC)) {

                    if (!Tiles[tc].created) {

                        if (Grid.hasSpace(w, h, acR, acC)) {

                            Grid.update(w, h, acR, acC);

                        } else {
                            addTile = false;
                            this.searchForTile(tc, acR, acC);
                        }

                    } else {

                        addTile = false;
                        tc += 1;
                        this.searchForTile(tc, acR, acC);
                    }

                    if (addTile) {
                        this.updateTile(tc, acR, acC);
                        tc += 1;
                    }
                }

                /**
                 * Update array counters
                 *
                 * tracks the position of the grid by row and column
                 * starts from left to right
                 */
                if (acC < (Settings.cols - 1)) {
                    acC += 1;

                } else {
                    acC = 0;
                    acR += 1;

                    // if grid row is empty create new row if for loop has not finished
                    if (i < (Settings.numOfTiles - 1)) {
                        if (!Grid.spaceAvailable(acR)) {
                            Grid.newRow(Utils.setArrayLength(Settings.cols));
                        }
                    }
                }

                if (!Tiles[tc] || tc === Settings.stopPoint) {
                    Elements.updateTiles(Tiles);
                    break;
                }

                // if tile counter has not reached end of count and for loop
                // counter (i) is equal to or greater than this.numOfTiles
                // then a new grid row is to be crated and this.numOfTiles plus 1
                if (tc < Settings.stopPoint && i >= (Settings.numOfTiles - 1)) {

                    if (Grid.getRowLength() === acR) {
                        Grid.newRow(Utils.setArrayLength(Settings.cols));
                    }

                    Settings.numOfTiles += 1;
                }
            }
            Grid.removeEmptyRows();
        },

        resize: function (w) {
            var width = Utils.getWidth();

            if ((Settings.tileWidth * w) > width) {
                w = this.shrink(w);
            }
            return w;
        },

        searchForTile: function (index, row, column) {
            // search for a tile to fit inside grid position row and column
            var c = index,
                w = 0,
                h = 0;

            for (c = index; c < Settings.stopPoint; c += 1) {

                w = this.resize(Tiles[c].w);
                h = Tiles[c].h;

                if (!Tiles[c].created) {

                    if (Grid.hasSpace(w, h, row, column)) {

                        Grid.update(w, h, row, column);
                        this.updateTile(c, row, column);
                        break;
                    }
                }
            }
        },

        // this is triggered from the breakpoints object
        updateSettings: function (w, index, ele) {

            Settings.padding = Settings.breakpoints[index].tile.padding;
            Settings.tileWidth = Settings.breakpoints[index].tile.width;
            Settings.tileHeight = Settings.breakpoints[index].tile.height;

            // calculate the number of columns (MAth.floor rounds the number down)
            Settings.cols = Math.floor(w / Settings.tileWidth);

            // calculate tiles to fit window
            Settings.tileWidth += Math.floor((w - (Settings.tileWidth * Settings.cols)) / Settings.cols);


            if (Settings.select.option !== "page") {
                Settings.startLoop = 0;
            }

            // NOTE --- FIRST LOAD

            // the first get width is the width of the window without scroll bar
            // when listenForBrowserResize is triggered then width is different and
            // triggers another  browser resize.

            // update containing element width
            Elements.updateWidth(Settings.cols * Settings.tileWidth);

            this.build(ele);
        },



        updateTile: function (index, row, column) {

            // showGutter: if guttering is false then the padding removed must be divided evenly across all tiles

                // calculate padding between tiles
            var padding = Settings.showGutter ? (Settings.padding / 2) : (Settings.padding / Settings.cols),

                // calculate tile width
                tileWidth = Settings.showGutter ? Settings.tileWidth : (Settings.tileWidth + padding),

                // calculate tile height
                tileHeight = Settings.showGutter ? Settings.tileHeight : (Settings.tileHeight + padding),
                //tileHeight = Settings.tileHeight,

                // calculate top position
                top = Settings.showGutter ? (row * Settings.tileHeight) + padding : (row * (Settings.tileHeight + padding)),

                // calculate left position
                left = Settings.showGutter ? (column * Settings.tileWidth) + padding : (column * (Settings.tileWidth + padding)),

                // calculate tile width
                w = ((tileWidth * Tiles[index].w) - Settings.padding),

                // calculate tile height
                h = ((tileHeight * Tiles[index].h) - Settings.padding);

                // this is used to calculate the container height
                Settings.modifyTileHeight = tileHeight;

            // Update tile object
            Tiles[index].created = true;
            Tiles[index].t = top;
            Tiles[index].l = left;
            Tiles[index].cssWidth = w;
            Tiles[index].cssHeight = h;
            Tiles[index].created = true;

        },

        addMore: function () {
            // (me = this) to handle scope issues from event calls

            // framerate defualt value is null
            if (Settings.load.framerate) {
                Settings.load.animate = true;
            }

            switch (Settings.select.option) {

            case "html":

                if ((Settings.stopPoint + Settings.load.index) < Tiles.length) {

                    Settings.stopPoint += Settings.load.index;

                } else {
                    // hide load more button
                    Elements.hide("loadMore");
                    Settings.stopPoint = Tiles.length;
                }

                Settings.startLoop += Settings.load.index;

                me.showMore();

                break;

            case "page":

                Settings.select.pageIndex += 1;

                Request.page(Settings, function (data) {

                    Elements.appendData(data);

                    Settings.startLoop = Settings.stopPoint;

                    Settings.stopPoint = Elements.getLength();

                    Settings.eof = Elements.getLength();

                    if (Settings.select.pageIndex >= Settings.select.pageEnd) {
                        Elements.hide("loadMore");
                    }

                    Optn.html();
                });

                break;

            case "json":

                if ((Settings.stopPoint + Settings.load.index) < Tiles.length) {

                    Settings.stopPoint += Settings.load.index;

                } else {
                    // hide load more button
                    Elements.hide("loadMore");
                    Settings.stopPoint = Tiles.length;
                }

                Settings.startLoop += Settings.load.index;

                Elements.createHTMLElements();

                me.showMore();
                break;
            }
        },

        tileTemplate: function (w, h, classname, html) {
            return {
                w: w,
                h: h,
                t: 0,
                l: 0,
                cssWidth: 0,
                cssHeight: 0,
                classname: classname || "",
                created: false,
                display: "block",
                html: html || ""
            };
        },

        getTilesLength: function () {
            return Tiles.length;
        },

        update: function (t) {
            Tiles = t;

            if (!Settings.stopPoint) {
                Settings.stopPoint = Tiles.length;
                Settings.eof = Tiles.length;
            }
        },

        showMore: function () {
            this.updateGrid();
        }
    };
};

},{}],11:[function(require,module,exports){

module.exports =  function (s) {
    'use strict';

    var Settings = s;

    return {
        getWidth: function () {
            // TESTING REQUIRED - all browsers and devices (getWidth)
            // http://www.javascriptkit.com/dhtmltutors/dhtmlcascade4.shtml
            // http://stackoverflow.com/questions/8136501/whats-the-difference-bewteen-document-defaultview-getcomputedstyle-and-window-g
            // TODO: might be a cross browser issue with getComputedStyle

            var w;

            if (Settings.classnames.container) {

                w = this.getComputedStyle(document.querySelector(Settings.classnames.container));

            } else {

                w = this.getComputedStyle(document.getElementsByTagName("body")[0]);
            }

            w = w > Settings.breakpoints[0].position ? w : Settings.breakpoints[0].position;

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
                w = (Settings.tileWidth * Settings.cols) - Settings.padding;
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
        },

        hasClass: function (ele, cls) {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },

        addClass: function (ele, cls) {
            if (!this.hasClass(ele, cls)) {
                ele.className += " " + cls;
            }
        },

        removeClass: function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                ele.className = ele.className.replace(reg, ' ');
            }
        }
    };
};

},{}],12:[function(require,module,exports){
/*global Jigsaw */


var options = {

    select: {
        option: "html",
    },

    load: {
        btn: true,
        index: 20,
        animate: true,
        framerate: 16
    },

    breakpoints: [
        {
            position: 320,
            tile: {
                width: 120,
                height: 120,
                padding: 8
            }
        },
        {
            position: 480,
            tile: {
                width: 160,
                height: 130,
                padding: 10
            }
        },
        {
            position: 1200,
            tile: {
                width: 200,
                height: 180,
                padding: 18
            }
        }
    ],

    tile: [
        {
            classname: "largeitem",
            w: 2,
            h: 2
        },
        {
            classname: "smallitem",
            w: 1,
            h: 1
        }
    ]
};
    var AnimationController = require('./jigsaw/AnimationController');
    var BreakPoints = require('./jigsaw/BreakPoints');
    var ElementsController = require('./jigsaw/ElementsController');
    var EventsController = require('./jigsaw/EventsController');
    var Extend = require('./jigsaw/Extend');
    var GridController = require('./jigsaw/Grid');
    var OptionController = require('./jigsaw/OptionController');
    var Request = require('./jigsaw/Request');
    var Settings = require('./jigsaw/Settings');
    var TileConstructor = require('./jigsaw/TileConstructor');
    var Utils = require('./jigsaw/Utils');


    var settings = Extend(Settings(), options);
    settings.stopPoint = settings.load.index;
    settings.eof = settings.load.index;

    var utils = new Utils(settings),
        option = new OptionController(),
        events = new EventsController(),
        optController = new OptionController(),
        animation = new AnimationController(settings, utils),
        elements = new ElementsController(settings, utils, events, animation),
        grid = new GridController(settings, utils, elements),
        tiles = new TileConstructor(settings, utils, grid, elements, optController, option),
        breakPoints = new BreakPoints(settings, utils, tiles);

    events.getMethod(tiles, "addMore");
    events.getMethod(option, "json");
    option.init(settings, elements, tiles, breakPoints, optController);

// function Jigsaw(options) {
//     this.init(options);
// }

// Jigsaw.prototype.init = function (options) {
//     'use strict';
//     var settings = this.Extend(this.Settings(), options);
//     settings.stopPoint = settings.load.index;
//     settings.eof = settings.load.index;

//     var utils = new this.Utils(settings),
//         option = new this.OptionController(),
//         events = new this.EventsController(),
//         request = new this.DataRequest(),
//         animation = new this.AnimationController(settings, utils),
//         elements = new this.ElementsController(settings, utils, events, animation),
//         grid = new this.GridController(settings, utils, elements),
//         tiles = new this.TileConstructor(settings, utils, grid, elements, request, option),
//         breakPoints = new this.BreakPoints(settings, utils, tiles);

//     events.getMethod(tiles, "addMore");
//     events.getMethod(option, "json");
//     option.init(settings, elements, tiles, breakPoints, request);
// };

},{"./jigsaw/AnimationController":1,"./jigsaw/BreakPoints":2,"./jigsaw/ElementsController":3,"./jigsaw/EventsController":4,"./jigsaw/Extend":5,"./jigsaw/Grid":6,"./jigsaw/OptionController":7,"./jigsaw/Request":8,"./jigsaw/Settings":9,"./jigsaw/TileConstructor":10,"./jigsaw/Utils":11}]},{},[12]);
