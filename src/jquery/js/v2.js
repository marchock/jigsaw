
/*global jQuery, window, document, setTimeout, clearTimeout, setInterval, clearInterval, console, undefined */

;(function ($, window, document, undefined) {

    'use strict';

    var pluginName = "jigsaw",

        defaults = {

            getDataFrom: "html-static",

            url: "",

            // url: "html/page-",

            loadNumOfTiles: null,

            getWidthFrom: "",

            tileOption: "Resize",

            showGutter: true,

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

            classname: "item",

            cb: null

        };


    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    };

    Plugin.prototype = {

        init: function () {

            // track where tiles are positioned "3 Dimensional ARRAY"
            this.grid = [];

            // tile properties "ARRAY"
            this.tiles = [];

            // number of tiles created "NUMBER"
            this.numOfTiles = 0;

            this.tileCounter = 0;

            this.startLoop = 0;

            this.lastStopLoopLoaded = 0;

            this.animationCounter = 0;


            // limit the number of tiles created
            this.stopPoint = this.settings.loadNumOfTiles;

            // get end of file number
            this.eof = this.settings.loadNumOfTiles;

            // html paging option is selected then set the start page
            if (this.settings.paging) {
                this.pageNum = this.settings.paging.start;
            }

            this.createBrowserWidthBreakPoints();
            this.setupEvents();
            this.getDataFrom(this.settings.getDataFrom);
        },



        /************************************************************************************
         * Get Tile data from HTML or JSON
         *
         *
         * NOTE: static html -  set number of tiles to show and without
         *
         *************************************************************************************/
        getDataFrom: function (string) {

            switch (string) {

            case "html-paging":

                // provide the option to start page 1 inside of index.html or grab
                // page data
                if (this.settings.paging.start > 1) {
                    this.getTilesDataFromHTML();
                } else {
                   this.addMoreTiles();
                }

                break;
            case "html-static":
                this.getTilesDataFromHTML();

                break;

            case "json":
                this.getTileDataFromJSON();

                break;

            case "form":
                this.getTileDataFromForm();

                break;
            }
        },


        getTilesDataFromHTML: function () {

            this.tiles = [];

            var i = 0,
                ii = 0,
                w = 0,
                h = 0;

            // get all child elements (tiles)
            this.tileElements = $(this.element).children();

            this.largestTileWidth = 0;

            // loop through tile elements
            for (i = 0; i < this.tileElements.length; i += 1) {

                // loop through settings.tile
                for (ii = 0; ii < this.settings.tile.length; ii += 1) {

                    // identify if tile element has class name matching settings.tile
                    if ($(this.tileElements[i]).hasClass(this.settings.tile[ii].classname)) {

                        w = this.settings.tile[ii].w;

                        h = this.settings.tile[ii].h;

                        // create new tile
                        this.tiles.push(this.tileTemplate(w, h));

                        this.largestTileWidth = this.largestTileWidth < w ? w : this.largestTileWidth;

                        break;
                    }
                }
            }

            // Only on first load
            if (!this.stopPoint) {
                this.stopPoint = this.tiles.length;
                this.eof = this.tiles.length;
            }

            this.browserResized();
        },


        getTileDataFromJSON: function (url) {

            url = url ? url : this.settings.url;

            var me = this;

            $.getJSON(url, function(data) {

                me.settings.json = data;

                var i = 0,
                    ii = 0,
                    eof = data.length,
                    w = 0,
                    h = 0,
                    classname;

                // loop through datajson
                for (i = 0; i < eof; i += 1) {

                    //classname = i < 1 ? "largeitem" : "smallitem";
                    classname = me.getTileClassName(i);

                    // loop through settings tiles
                    for (ii = 0; ii < me.settings.tile.length; ii += 1) {

                        if (classname === me.settings.tile[ii].classname) {

                            w = me.settings.tile[ii].w;

                            h = me.settings.tile[ii].h;

                            me.tiles.push(me.tileTemplate(w, h, classname));

                            me.largestTileWidth = me.largestTileWidth < w ? w : me.largestTileWidth;
                        }
                    }
                }

                me.eof = me.settings.loadNumOfTiles;
                me.stopPoint = me.settings.loadNumOfTiles;
                me.createHTMLElements(data);

            })
                .fail(function(e) {
                    //console.log("error", e);
                });
        },

        getTileDataFromForm: function () {

            var me = this,
                id = this.settings.formID;

            this.pageCounter = 1;
            this.updateURL();


            $(this.settings.formID).change(function (event) {
                event.preventDefault();

                // remove all child elements from container
                $(me.element).empty();


                // reset grid and tiles or privous data will be outputted
                me.grid = [];
                me.tiles = [];
                me.startLoop = 0;
                me.lastStopLoopLoaded = 0;
                me.animationCounter = 0;
                $(".jigsaw-container").addClass("show-loader");


                me.updateURL();
            });

        },


        /************************************************************************************
         * UTILS to support getting data
         *************************************************************************************/


        getTileClassName: function (num) {
            var string = "",
                eof = (this.settings.pattern.tiles.length);

            // TODO: implement tile class names comes from the json file

            // this.settings.json


            if (num >= eof) {

                if (this.settings.pattern.repeat) {

                    while(eof <= num) {

                        num -= eof;
                    }

                    string = this.settings.pattern.tiles[num];

                } else {

                    // default class name set
                    if (this.settings.pattern.default !== "") {
                        string = this.settings.pattern.default;
                    } else {
                        console.log("defulat tile not specified");
                    }
                }

            } else {

                string = this.settings.pattern.tiles[num];
            }

            return string;
        },

        updateURL: function () {
            var jsonString = this.settings.url,
                url = jsonString + this.stripEmptyParam(this.settings.formID);

            this.getTileDataFromJSON(url);
        },

        // remove all empty parameters from string
        stripEmptyParam: function (ele) {

            var param = $(ele + " :input")
                .filter(function(index, element) {
                    return $(element).val() !== "";
                })
                .serialize();

            return param;

        },


        /************************************************************************************
         * Tile Options
         *
         *
         *
         *
         *************************************************************************************/


        tileOptionResize: function (string, w) {

            if (this.settings.tileOption === "Resize") {

                var width = this.getWidth();

                switch (string) {
                case "html":

                    if (w > width) {
                        w = (this.settings.tileWidth * this.cols) - this.settings.spacing;
                    }
                    break;

                case "grid":

                    if ((this.settings.tileWidth * w) > width) {
                        w = this.shrink(w);
                    }
                    break;
                }
            }

            return w;
        },

        removeLargeTiles: function () {
            var w = this.getWidth(),
                i = 0;

            for (i = 0; i < this.tiles.length; i += 1) {
                if ((this.tiles[i].w * this.settings.tileWidth) > w) {
                    this.tiles[i].display = "none";
                }
            }
        },


        setMinNumOfCols: function () {

            /* USED when Tile Option Grid Lock is selected;
             *
             */

            // if width is less than largest tile width then extend columns

            var w = this.getWidth(),
                eof = this.largestTileWidth,
                i = 0;

            for (i = 0; i <= eof; i += 1) {

                if (w < (this.settings.tileWidth * i)) {
                    this.cols += 1;
                }
            }
        },

        /************************************************************************************
         * Construct tile data
         *
         *
         *
         *
         *************************************************************************************/

        solveJigsaw: function (string) {

            var i = 0;


            // reset number of tiles
            this.numOfTiles = this.getNumberOfTiles();

            // a browser resize will not need to create more tiles
            // there for tiles will only be created when addMoreTiles method
            // has been triggered


            switch (string) {
            case "moreTiles":

                //console.log("Add more tiles");

                break;
            case "browserResize":

                // reset all tiles created to false when browser resized

                this.startLoop = 0;

                for (i = 0; i < this.tiles.length; i += 1) {
                    this.tiles[i].created = false;
                    this.tiles[i].display = "block";
                }

                this.grid = [];
                break;
            }

            // set tile options
            this["tileOption" + this.settings.tileOption]();

            // calculate the number of rows
            this.rows = Math.round(this.numOfTiles / this.cols);

            // create columns for each row
            for (i = 0; i < this.rows; i += 1) {

                // if grid row does not have an array then create an array to represent columns
                if (!this.grid[i]) {
                    this.grid[i] = this.setArrayLength(this.cols);
                }
            }

            this.build();
        },


        build: function () {

            var i = 0,
                acC = 0,// array counter column
                acR = 0,// array counter row
                tc = 0, //this.startLoop,
                addTile;

            /*
             * search grid array for empty spaces to fit tiles
             */
            for (i = 0; i < this.numOfTiles; i += 1) {

                addTile = true;


                // if grid position is false then space is available for a tile
                if (!this.grid[acR][acC]) {

                    if (!this.tiles[tc].created) {

                        if (this.gridHasSpace(this.tiles[tc].w, this.tiles[tc].h, acR, acC)) {

                            this.updateGrid(this.tiles[tc].w, this.tiles[tc].h, acR, acC);

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
                if (acC < (this.cols - 1)) {
                    acC += 1;

                } else {
                    acC = 0;
                    acR += 1;


                    // if grid row is empty create new row if for loop has not finished
                    if (i < (this.numOfTiles - 1)) {
                        if (!this.grid[acR]) {

                            this.grid[this.grid.length] = this.setArrayLength(this.cols);
                        }
                    }
                }


                if (!this.tiles[tc] || tc === this.stopPoint) {

                    this.updateHTMLElements();

                    break;
                }

                // if tile counter has not reached end of count and for loop
                // counter (i) is equal to or greater than this.numOfTiles
                // then a new grid row is to be crated and this.numOfTiles plus 1
                if (tc < this.stopPoint && i >= (this.numOfTiles - 1)) {

                    if (this.grid.length === acR) {

                        this.grid[this.grid.length] = this.setArrayLength(this.cols);
                    }

                    this.numOfTiles += 1;
                }
            }
            this.removeEmptyRowsFromGrid();
        },


        searchForTile: function (index, row, column) {
            // search for a tile to fit inside grid position row and column
            var c = index;

            for (c = index; c < this.stopPoint; c += 1) {

                if (!this.tiles[c].created) {

                    if (this.gridHasSpace(this.tiles[c].w, this.tiles[c].h, row, column)) {

                        this.updateGrid(this.tiles[c].w, this.tiles[c].h, row, column);
                        this.updateTile(c, row, column);

                        break;
                    }
                }
            }
        },


        isTileCreated: function (index, w, h) {
            var b = false;

            if (this.tiles[index].w === w &&
                    this.tiles[index].h === h &&
                    !this.tiles[index].created) {

                b = true;
            }
            return b;
        },


        updateTile: function (index, row, column) {

            // showGutter: if guttering is false then the spacing removed must be divided evenly across all tiles

                // calculate spacing between tiles
            var spacing = this.settings.showGutter ? (this.settings.spacing / 2) : Math.floor(this.settings.spacing / this.cols),

                // calculate tile width
                tileWidth = this.settings.showGutter ? this.settings.tileWidth : (this.settings.tileWidth + spacing),


                tileHeight = this.settings.showGutter ? this.settings.tileHeight : (this.settings.tileHeight + spacing),

                // calculate top position
                top = this.settings.showGutter ? (row * this.settings.tileHeight) + spacing : (row * (this.settings.tileHeight + spacing)),

                // calculate left position
                left = this.settings.showGutter ? (column * this.settings.tileWidth) + spacing : (column * (this.settings.tileWidth + spacing)),

                // calculate tile width
                w = ((tileWidth * this.tiles[index].w) - this.settings.spacing),

                // calculate tile height
                h = ((tileHeight * this.tiles[index].h) - this.settings.spacing);

            // Update tile object
            this.tiles[index].created = true;
            this.tiles[index].t = top;
            this.tiles[index].l = left;
            this.tiles[index].cssWidth = w;
            this.tiles[index].cssHeight = h;
            this.tiles[index].created = true;
        },



        /************************************************************************************
         * GRID
         *
         *
         *
         *
         *************************************************************************************/
        gridHasSpace: function (w, h, row, column) {

            var b = true,
                i = 0,
                ii = 0;


            // RESIZE TILE OPTION --------------------------------------------
            w = this.tileOptionResize("grid", w);


            for (i = 0; i < h; i += 1) {

                for (ii = 0; ii < w; ii += 1) {

                    if ((column + ii) < this.cols) {

                        // Add another grid row to fit tile
                        if (this.grid.length <= (row + i)) {
                            this.grid[this.grid.length] = this.setArrayLength(this.cols);
                        }

                        if (!this.grid[row + i][column + ii]) {
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


        updateGrid: function (w, h, row, column) {

            // RESIZE TILE OPTION --------------------------------------------
            w = this.tileOptionResize("grid", w);

            var i = 0,
                ii = 0;

            for (i = 0; i < h; i += 1) {

                for (ii = 0; ii < w; ii += 1) {

                    this.grid[row + i][column + ii] = 1;
                }
            }
        },


        removeEmptyRowsFromGrid: function () {
            var i, c, ii, d = [];
            // search rows for empty columns
            for (i = 0; i < this.grid.length; i += 1) {
                c = 0;
                for (ii = 0; ii < this.grid[i].length; ii += 1) {
                    if (!this.grid[i][ii]) {
                        c += 1;
                    }
                }

                // if the entire row is false then add row number to be deleted
                if (c === this.cols) {
                    d.push(i);
                }

            }
            // reverse array to start the delete loop with the highest number
            d.reverse();

            for (i = 0; i < d.length; i += 1) {
                this.grid.splice(d[i], 1);
            }

            this.updateElementHeight(this.grid.length * this.settings.tileHeight);
            //this.animateTiles($(".tile"));
        },


        /************************************************************************************
         * HTML ELEMENTS
         *
         *
         *
         *
         *************************************************************************************/

        updateHTMLElements: function () {

            var i = this.startLoop,
                eof = this.stopPoint,
                w = 0;

            for (i = this.startLoop; i < eof; i += 1) {


                // if tile option is resize then width is calculated to fit...
                w = this.tileOptionResize("html", this.tiles[i].cssWidth);

                this.tileElements[i].style.width = w + "px";
                this.tileElements[i].style.height = this.tiles[i].cssHeight + "px";
                this.tileElements[i].style.left = this.tiles[i].l + "px";
                this.tileElements[i].style.top = this.tiles[i].t + "px";
                this.tileElements[i].style.display = this.tiles[i].display;
                //this.tileElements[i].innerHTML = i;

                if (this.settings.animate) {
                    $(this.tileElements[i]).addClass("animate");
                }
            }

            if (this.settings.animate) {
                this.animationController();
            }
        },


        createHTMLElements: function (data) {

            var i = this.startLoop,
                eof = 0;

                if (this.stopPoint >= data.length) {

                    this.showHideLoadMoreBtn("hide");
                    eof = data.length;
                    this.stopPoint = data.length;

                } else {
                    this.showHideLoadMoreBtn("show");
                    eof = this.stopPoint;
                }


            for (i = this.startLoop; i < eof; i += 1) {

                // template
                this.settings.tileTemplate(data[i], this.tiles[i].classname, this.element)

            }

            this.settings.cb();

            this.tileElements = $(this.element).children();

            this.browserResized("moreTiles");
        },


        /************************************************************************************
         * ANIMATION CONTROLLER
         *
         *
         *
         *
         *************************************************************************************/


        animationController: function () {

            if (this.animationCounter < this.stopPoint) {

                this.jigsawTimer(1000 / this.settings.animate.frameRate);

            } else {
                this.settings.cb("animation completed");
                $(this.tileElements).removeClass("animate start");

            }
        },


        addClassToTiles: function () {

            $(this.tileElements[this.animationCounter]).addClass("start");
            this.animationCounter += 1;
            this.animationController();
        },


        jigsawTimer: function (time) {
            clearTimeout(this.jTimer);
            var me = this;

            this.jTimer = setTimeout(function () {

                me.addClassToTiles();

            }, time);
        },

        /************************************************************************************
         * EVENTS
         *
         *
         *
         *
         *************************************************************************************/

        setupEvents: function () {

            if (this.settings.loadMore) {
                this.btnLoadMore = $(".load-more");
                this.loadMoreButton();
            }


            if (this.settings.scroll) {
                this.scrollDown();
            }
        },

        loadMoreButton: function () {
            var me = this;
            this.btnLoadMore.click(function () {
                me.addMoreTiles();
            });
        },

        showHideLoadMoreBtn: function (string) {
            this.btnLoadMore[string]();
        },


        scrollDown: function () {
            var me = this;
            $(window).scroll(function () {
               if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
                  me.addMoreTiles();
               }
            });
        },


        /************************************************************************************
         * support methods
         *
         *
         *
         *
         *************************************************************************************/
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


        getNumberOfTiles: function () {
            var i = 0,
                eof = this.stopPoint,
                x = 0,
                y = 0,
                num = 0;

            for (i = 0; i < eof; i += 1) {

                x = this.tiles[i].w;
                y = this.tiles[i].h;

                num += (x * y);
            }

            return num;

            // calculates the total number of 1x1 tiles within the tiles object
        },


        shrink: function (w) {

            var width = this.getWidth(),
                i = 0,
                tw = w;

            for (i = 0; i <= w; i += 1) {

                if (width < (this.settings.tileWidth * i)) {
                    tw -= 1;
                }
            }

            return tw;
        },


        setArrayLength: function (c) {
            var a = [],
                i = 0;

            for (i = 0; i < c; i += 1) {
                a[i] = 0;
            }

            return a;
        },


        getNum: function (num) {
            return Math.floor((Math.random() * num) + 1);
        },


        getWidth: function () {
            var w;

            if (this.settings.getWidthFrom) {
                w = $(this.settings.getWidthFrom).width();
            } else {
                w = $(window).width();
            }

            w = w > this.settings.resize[0].breakpoint ? w : this.settings.resize[0].breakpoint;

            return w;
        },


        updateElementWidth: function (width) {
            $(this.element)[0].style.width = width + "px";
        },

        updateElementHeight: function (height) {

            // this is the same logic in line 656 (method updateTile) for finding the tile height
            var spacing = this.settings.showGutter ? (this.settings.spacing / 2) : Math.floor(this.settings.spacing / this.cols),

                tileHeight = this.settings.showGutter ? this.settings.tileHeight : (this.settings.tileHeight + spacing),

                // calculate tile height
                h = (tileHeight * this.grid.length);


            $(this.element)[0].style.height = h + "px";
        },


        consoleLogGrid: function (grid) {
            var i = 0,
                eof = grid.length;

            for (i = 0; i < eof; i += 1) {
                console.log(grid[i]);
            }
            console.log("-----------------------------------------------");
        },


        /************************************************************************************
         * LOADING DATA
         *
         * HTML STATIC
         * HTML PAGING
         * JSON
         *
         *************************************************************************************/
        addMoreTiles: function () {

            var me = this;

            switch (this.settings.getDataFrom) {

            case "html-paging":

            // number of page set in the parameters
                if (this.settings.paging.end >= this.pageNum) {

                    $.get(this.settings.paging.url + this.pageNum + ".html", function(data) {

                        $(me.element).append(data);

                        me.getTilesDataFromHTML();

                        me.startLoop = me.eof;

                        me.stopPoint = me.tiles.length;

                        me.eof = me.tiles.length;

                        me.solveJigsaw("moreTiles");

                        me.pageNum += 1;

                    });
                }


                break;



            case "html-static":

                if ((this.stopPoint + this.settings.loadNumOfTiles) < this.tiles.length) {

                    this.stopPoint += this.settings.loadNumOfTiles;

                } else {

                    this.stopPoint = this.tiles.length;
                }


                // get end of file number
                this.eof += this.settings.loadNumOfTiles;

                // start position of loop
                this.startLoop = this.lastStopLoopLoaded

                if ((this.startLoop + this.settings.loadNumOfTiles) < this.tiles.length) {

                    this.startLoop += this.settings.loadNumOfTiles;

                } else {

                    this.startLoop = this.tiles.length;
                    alert("NO MORE TILES")
                    return;
                }

                this.lastStopLoopLoaded = this.startLoop;
                this.solveJigsaw("moreTiles");


                break;

            case "json":
            case "form":

                if ((this.stopPoint + this.settings.loadNumOfTiles) < this.tiles.length) {

                    this.stopPoint += this.settings.loadNumOfTiles;

                } else {

                    this.stopPoint = this.tiles.length;
                }

                // get end of file number
                this.eof += this.settings.loadNumOfTiles;


                // start position of loop
                this.startLoop = this.lastStopLoopLoaded

                if ((this.startLoop + this.settings.loadNumOfTiles) < this.tiles.length) {

                    this.startLoop += this.settings.loadNumOfTiles;

                } else {

                    this.startLoop = this.tiles.length;

                }

                this.lastStopLoopLoaded = this.startLoop;

                this.createHTMLElements(this.settings.json);

              break;
            }
        },




        /************************************************************************************
         * BROWSER RESIZE
         *
         *
         *
         *
         *************************************************************************************/
        browserResized: function (option) {

            clearInterval(this.interval);

            var w = this.getWidth(),
                breakpoints = [];

            this.defineTileProperties(w);

            // find breakpoint to recalculate tile width
            breakpoints.push(w + 1);
            breakpoints.push(w - 1);


            // NOTE --- FIRST LOAD

            // the first get width is the width of the window without scroll bar
            // when listenForBrowserResize is triggered then width is different and
            // triggers another  browser resize.

            // update containing element width
            this.updateElementWidth(this.cols * this.settings.tileWidth);

            // reset start loop to zero
            //this.startLoop = 0;

            this.solveJigsaw(option || "browserResize");

            this.listenForBrowserResize(breakpoints);
        },


        defineTileProperties: function (w) {

            var i = 0,
                resizeIndex = 0;

            // find which tile size to use
            for (i = 0; i < this.settings.resize.length; i += 1) {
                if (this.bwbp[i][1] >= w &&
                        this.bwbp[i][0] < w) {

                    resizeIndex = i;
                }
            }

            this.settings.spacing = this.settings.resize[resizeIndex].tileSpace;
            this.settings.tileWidth = this.settings.resize[resizeIndex].tileWidth;
            this.settings.tileHeight = this.settings.resize[resizeIndex].tileHeight;

            // calculate the number of columns (MAth.floor rounds the number down)
            this.cols = Math.floor(w / this.settings.tileWidth);

            // calculate tiles to fit window
            this.settings.tileWidth += Math.floor((w - (this.settings.tileWidth * this.cols)) / this.cols);
        },


        listenForBrowserResize: function (breakpoints) {
            var w,
                me = this;

            this.interval = setInterval(function () {
                w = me.getWidth();

                if (breakpoints[0] <= w) {

                    me.browserResized();

                } else if (breakpoints[1] >= w && w >= me.settings.resize[0].breakpoint) {

                    me.browserResized();
                }

            }, 200);
        },

        createBrowserWidthBreakPoints: function () {
            this.bwbp = [];

            var i = 0,
                eof = this.settings.resize.length,
                s = 0,
                e = 0;

            for (i = 0; i < eof; i += 1) {
                s = this.settings.resize[i].breakpoint;
                e = eof > (i + 1) ? (this.settings.resize[i + 1].breakpoint - 1) : 3000;
                this.bwbp.push([s, e]);
            }
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });

        // chain jQuery functions
        return this;
    };

})(jQuery, window, document);
