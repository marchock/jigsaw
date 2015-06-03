/*global  JGSW */
JGSW("TileConstructor", function (s, u, g, e, r, o) {
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
});
