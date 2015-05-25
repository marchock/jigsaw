/*global  JGSW */
JGSW("TileConstructor", function (s, u, g, e, r, d) {
    'use strict';
    var Settings = s,
        Utils = u,
        Grid = g,
        Elements = e,
        Request = r,
        Data = d,
        Tiles = [],
        me;

    return {

        setup: function (data) {
            // (me = this) to handle scope issues from event calls
            // .addMore() method is where it is used, event is called from Events Controller
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

            //Settings.stopPoint = (Settings.stopPoint > eof) ? eof : Settings.stopPoint;

            if (Settings.stopPoint > eof) {
                Settings.stopPoint = eof;
                if (Settings.getDataFrom !== "page") {
                    Elements.hide("loadMore");
                }
            } else {
                if (Settings.getDataFrom !== "page") {
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
            Settings.startLoop = 0;
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

            Settings.spacing = Settings.resize[index].tileSpace;
            Settings.tileWidth = Settings.resize[index].tileWidth;
            Settings.tileHeight = Settings.resize[index].tileHeight;

            // calculate the number of columns (MAth.floor rounds the number down)
            Settings.cols = Math.floor(w / Settings.tileWidth);

            // calculate tiles to fit window
            Settings.tileWidth += Math.floor((w - (Settings.tileWidth * Settings.cols)) / Settings.cols);


            // reset start loop to zero
            Settings.startLoop = 0;

            // NOTE --- FIRST LOAD

            // the first get width is the width of the window without scroll bar
            // when listenForBrowserResize is triggered then width is different and
            // triggers another  browser resize.

            // update containing element width
            Elements.updateWidth(Settings.cols * Settings.tileWidth);

            this.build(ele);
        },



        updateTile: function (index, row, column) {

            // showGutter: if guttering is false then the spacing removed must be divided evenly across all tiles

                // calculate spacing between tiles
            var spacing = Settings.showGutter ? (Settings.spacing / 2) : Math.floor(Settings.spacing / Settings.cols),

                // calculate tile width
                tileWidth = Settings.showGutter ? Settings.tileWidth : (Settings.tileWidth + spacing),

                // calculate tile height
                tileHeight = Settings.showGutter ? Settings.tileHeight : (Settings.tileHeight + spacing),

                // calculate top position
                top = Settings.showGutter ? (row * Settings.tileHeight) + spacing : (row * (Settings.tileHeight + spacing)),

                // calculate left position
                left = Settings.showGutter ? (column * Settings.tileWidth) + spacing : (column * (Settings.tileWidth + spacing)),

                // calculate tile width
                w = ((tileWidth * Tiles[index].w) - Settings.spacing),

                // calculate tile height
                h = ((tileHeight * Tiles[index].h) - Settings.spacing);

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

            switch (Settings.getDataFrom) {

            case "html":

                if ((Settings.stopPoint + Settings.loadNumOfTiles) < Tiles.length) {

                    Settings.stopPoint += Settings.loadNumOfTiles;

                } else {
                    // hide load more button
                    Elements.hide("loadMore");
                    Settings.stopPoint = Tiles.length;
                }

                Settings.startLoop += Settings.loadNumOfTiles;

                me.showMore();

                break;

            case "page":

                Settings.page.num += 1;

                Request.page(Settings, function (data) {

                    Elements.appendData(data);

                    Settings.startLoop = Settings.eof;

                    Settings.stopPoint = Elements.getLength();

                    Settings.eof = Elements.getLength();

                    if (Settings.page.num >= Settings.page.end) {
                        Elements.hide("loadMore");
                    }


                    Data.html();
                });

                break;

            case "json":

                if ((Settings.stopPoint + Settings.loadNumOfTiles) < Tiles.length) {

                    Settings.stopPoint += Settings.loadNumOfTiles;

                } else {
                    // hide load more button
                    Elements.hide("loadMore");
                    Settings.stopPoint = Tiles.length;
                }

                Settings.startLoop += Settings.loadNumOfTiles;

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
