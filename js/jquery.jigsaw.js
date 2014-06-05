
// ------------------------------------------------------------------------

 // TODO LATER 



// animate tiles 

// click on a tile and the tile will cover the entire screen (animated in and out )

// create an object data template 

// clicking on load more - if there are more tiles to load on not

// scrolling down to the end will load more tiles (create as an option)


// comment code descriptively as possible 







// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

        // undefined is used here as the undefined global variable in ECMAScript 3 is
        // mutable (ie. it can be changed by someone else). undefined isn't really being
        // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
        // can no longer be modified.

        // window and document are passed through as local variable rather than global
        // as this (slightly) quickens the resolution process and can be more efficiently
        // minified (especially when both are regularly referenced in your plugin).

        // Create the defaults once
        var pluginName = "jigsaw",

                defaults = {

                    data: "html",

                    tileWidth: 0,

                    spacing: 0,

                    tile: {},


                    // tile: {

                    //     className: ".item",

                    //     size: [
                    //         {
                    //             name: "smallitem",
                    //             size: [1, 1]
                    //         },
                    //         {
                    //             name: "largeitem",
                    //             size: [2, 2]
                    //         }
                    //     ]
                    // }


                    url: "",

                    demo: false
        };

        // The actual plugin constructor
        function Plugin ( element, options ) {
                this.element = element;
                // jQuery has an extend method which merges the contents of two or
                // more objects, storing the result in the first object. The first object
                // is generally empty as we don't want to alter the default options for
                // future instances of the plugin
                this.settings = $.extend( {}, defaults, options );
                this._defaults = defaults;
                this._name = pluginName;
                this.init();
        }

        Plugin.prototype = {

                init: function () {

                    // track where tiles are positioned "3 Dimensional ARRAY"
                    this.grid = [];

                    // tile properties "ARRAY"
                    this.tiles = [];

                    // number of tiles created "NUMBER"
                    this.numOfTiles = 0;
                    this.tileCounter = 0;


                    // limit the number of tiles created 
                    this.stopPoint = 20;

                    // get end of file number
                    this.eof = 20;

                    this.startLoop = 0;



                    switch(this.settings.getDataFrom) {
                        case "html":
                            this.getTilesDataFromHTML();

                          break;

                        case "obj":
                            this.buildTilesData();

                          break;
                    }

                    this.createBrowserWidthBreakPoints();
                    this.browserResized();
                    this.setupEvents();
                },



                /************************************************************************************
                 * Get Tile data from HTML, JSON or Object
                 *
                 *
                 *
                 *
                 *************************************************************************************/

                getTilesDataFromHTML: function () {

                    this.tileElements = $(this.element).children();

                    this.stopPoint = this.tileElements.length;

                    this.eof = this.tileElements.length;

                    this.startLoop = 0;


                    for (i = 0; i < this.tileElements.length; i += 1) {

                        for (ii = 0; ii < this.settings.tile.length; ii += 1) {

                            if($(this.tileElements[i]).hasClass(this.settings.tile[ii].classname)) {

                                x = this.settings.tile[ii].w;

                                y = this.settings.tile[ii].h;

                                this.tiles.push(this.tileTemplate(x, y));

                                this.tileCounter += (x * y)
                            }
                        }
                    }
                },

                buildTilesData: function () {

                    // TODO --  this is broken 

                    for (i = this.startLoop; i < eof; i += 1) {

                        if (this.settings.demo) {
                            // demo || could be used for dynamic content
                            x = testTemplate[i].x;
                            y = testTemplate[i].y;
                        } else {
                            // random tiles created
                            x = this.getNum(2);
                            y = this.getNum(2);
                        }

                        // apply tile template to tiles array
                        this.tiles[i] = this.tileTemplate(x, y);

                        // calculate the total number of tiles
                        this.numOfTiles += (x * y)

                    }
                },


                /************************************************************************************
                 * Construct tile param data
                 *
                 *
                 *
                 *
                 *************************************************************************************/

                solveJigsaw: function () {

                    var testTemplate = demoTiles,
                        i = 0,
                        eof = this.eof,
                        x,  
                        y;


                    // reset number of tiles
                    this.numOfTiles = this.tileCounter;
                
                    // a browser resize will not need to create more tiles 
                    // there for tiles will only be created when addMoreTiles method
                    // has been triggered
                    if (this.tiles.length < eof) {


                    } else {

                        // reset all tiles created to false when browser resized 

                        for (i = 0; i < this.tiles.length; i += 1) {
                            this.tiles[i].created = false;
                        }

                        this.grid = [];
                    }

                    // calculate the number of rows
                    this.rows = Math.round(this.numOfTiles / this.cols);


                    // create columns inside of each row
                    for (i = 0; i < this.rows; i += 1) {

                        // if grid row has no array then create columns
                        if (!this.grid[i]) {
                            this.grid[i] = this.setArrayLength(this.cols)
                        }
                    }

                    this.build();
                },

                build: function () {

                    var i = 0,
                        acC = 0,// array counter column 
                        acR = 0,// array counter row
                        tc = this.startLoop,
                        addTile;

                    /*
                     * search grid array for empty spaces to fit tiles
                     */
                    for (i=0; i < this.numOfTiles; i += 1) {

                        
                        addTile = true;


                        // if grid position is false then space is available for a tile 
                        if (!this.grid[acR][acC]) {

                            // is tile created 
                            // check if tile can fit in grid
                            // true then create tile
                            // false search for tile to fit.


// ************************************************************************************


// use this code to rework BUILD method

// should be able to add a tiles of any size to grid 



                            // if (this.tiles[tc].created) {

                            //     if (this.gridHasSpace(this.tiles[tc].className, acR, acC)) {
                            //         this.updateGrid(this.tiles[tc].className, acR, acC);
                            //     } else {
                            //         addTile = false;
                            //         this.searchForTile(tc, acR, acC);
                            //     }
                            // else {
                            //         addTile = false;
                            //         this.searchForTile(tc, acR, acC);
                            // }




// ************************************************************************************


                            /*
                             * 2 X 2 TILE
                             *
                             * has this tile been created and can it fit in grid current position 
                             */
                            if (this.isTileCreated(tc, 2, 2)) {


                                if (this.gridHasSpace(this.tiles[tc].className, acR, acC)) {

                                    this.updateGrid(this.tiles[tc].className, acR, acC); 

                                } else {

                                    addTile = false;
                                    this.searchForTile(tc, acR, acC);
                                }



                            /*
                             * 2 X 1 TILE  
                             */
                            } else if (this.isTileCreated(tc, 2, 1)) {


                                if (this.gridHasSpace(this.tiles[tc].className, acR, acC)) {

                                    this.updateGrid(this.tiles[tc].className, acR, acC); 

                                } else {

                                    addTile = false;
                                    this.searchForTile(tc, acR, acC);
                                }



                            /*
                             * 1 X 2 TILE  
                             */
                            } else if (this.isTileCreated(tc, 1, 2)) {



                                if (this.gridHasSpace(this.tiles[tc].className, acR, acC)) {
                                    this.updateGrid(this.tiles[tc].className, acR, acC);
                                } else {
                                    addTile = false;
                                    this.searchForTile(tc, acR, acC);
                                }



                            /*
                             * 1 X 1 TILE  
                             */
                            } else if (this.isTileCreated(tc, 1, 1)) {

                                this.updateGrid(this.tiles[tc].className, acR, acC); 



                            /*
                             * Tile created 
                             */
                            } else if (this.tiles[tc].created) {

                                addTile = false;
                                tc += 1;
                                this.searchForTile(tc, acR, acC);
                            }


                            if (addTile) {
                                if (this.tiles[tc].className) {
                                    //this.createTile(this.tiles[tc].className, acC, acR, this.tiles[tc], tc);
                                    //this.tiles[tc].created = true;
                                    this.updateTile(tc, acR, acC);

                                    tc += 1;
                                }
                            }
                        }

                        /**
                         * Update array counters 
                         *
                         * tracks the position of the grid by row and column 
                         * starts from left to right and then down left to start again
                         */
                        if (acC < this.cols-1) {
                            acC += 1;

                        } else {
                            acC = 0;
                            acR += 1;


                            // if grid row is empty create new row if for loop has not finished
                            if (i < (this.numOfTiles - 1)) {
                                if (!this.grid[acR]) {

                                    this.grid[this.grid.length] = this.setArrayLength(this.cols)
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
                                this.grid[this.grid.length] = this.setArrayLength(this.cols)
                            }

                            this.numOfTiles++;
                        }
                    }


                    // Apply height to container


                    var c, ii, d = [];
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

                    this.updateElementHeight(this.grid.length * this.settings.tileWidth);
                    //this.animateTiles($(".tile"));
                },


                updateHTMLElements: function () {
                    var i = 0;
                        eof = this.tileElements.length;

                    for (i = 0; i < eof; i += 1) {

                        this.tileElements[i].style.width = this.tiles[i].cssWidth + "px";
                        this.tileElements[i].style.height = this.tiles[i].cssHeight + "px";
                        this.tileElements[i].style.left = this.tiles[i].l + "px";
                        this.tileElements[i].style.top = this.tiles[i].t + "px";
                        this.tileElements[i].innerHTML = i
                    }
                },


                searchForTile: function (index, acR, acC) {
                    // search for a tile to fit inside grid position row and column
                    var c = index;

                    for (c = c; c < this.tiles.length; c += 1) {

                        if (this.tiles[c].w === 1 && !this.tiles[c].created) {

                            // check grid space available goes here 

                            if (this.gridHasSpace(this.tiles[c].className, acR, acC)) {

                                this.updateGrid(this.tiles[c].className, acR, acC);
                                this.tiles[c].created = true;
                                this.updateTile(c, acR, acC);

                                break;
                            }

                        } else if (this.tiles[c].w === 2 && !this.tiles[c].created) {

                            if (this.gridHasSpace(this.tiles[c].className, acR, acC)) {

                                this.updateGrid(this.tiles[c].className, acR, acC);
                                this.tiles[c].created = true;
                                this.updateTile(c, acR, acC);

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
                    var top = (row * this.settings.tileWidth + (this.settings.spacing / 2)),
                        left = (column * this.settings.tileWidth + (this.settings.spacing / 2)),
                        w = ((this.settings.tileWidth * this.tiles[index].w) - this.settings.spacing),
                        h = ((this.settings.tileWidth * this.tiles[index].h) - this.settings.spacing);

                    this.tiles[index].created = true;
                    this.tiles[index].t = top;
                    this.tiles[index].l = left;
                    this.tiles[index].cssWidth = w;
                    this.tiles[index].cssHeight = h;
                    this.tiles[index].created = true;
                },


                gridHasSpace: function (string, row, column) {
                    var b = false;

                    switch(string) {
                        case "box-1-1":

                            // 1 0
                            // 0 0

                            b = true;
                          
                          break;
                        case "box-2-1":

                            // 1 1
                            // 0 0

                            if (!this.grid[row][column + 1] &&
                                (column + 1) < this.cols) {

                                b = true;
                            }
                          
                          break;
                        case "box-1-2":

                            // 1 0
                            // 1 0

                            if (this.grid.length === (row + 1)) {

                                this.grid[this.grid.length] = this.setArrayLength(this.cols)
                            }

                            if (!this.grid[row + 1][column]) {
                                b = true;
                            }
                          
                          break;
                        case "box-2-2":

                            // 1 1
                            // 1 1

                            if (this.grid.length === (row + 1)) {

                                this.grid[this.grid.length] = this.setArrayLength(this.cols)
                            }

                            if (!this.grid[row][column + 1] &&
                                !this.grid[row + 1][column] &&
                                !this.grid[row + 1][column + 1] &&
                                (column + 1) < this.cols) {

                                b = true;
                            }
                          break;
                    }

                        return b;
                },

                updateGrid: function (string, row, column) {

                    switch(string) {
                        case "box-1-1":

                            // 1 0
                            // 0 0

                            this.grid[row][column] = 1;
                          
                          break;
                        case "box-2-1":

                            // 1 1
                            // 0 0

                            this.grid[row][column] = 1;
                            this.grid[row][column + 1] = 1;
                          
                          break;
                        case "box-1-2":

                            // 1 0
                            // 1 0

                            this.grid[row][column] = 1;
                            this.grid[row + 1][column] = 1;
                          
                          break;
                        case "box-2-2":

                            // 1 1
                            // 1 1

                            this.grid[row][column] = 1;
                            this.grid[row][column + 1] = 1;
                            this.grid[row + 1][column] = 1;
                            this.grid[row + 1][column + 1] = 1;

                          break;
                    }
                },

                /************************************************************************************
                 * support methods 
                 *
                 *
                 *
                 *
                 *************************************************************************************/

                setupEvents: function () {

                    $(".load-more").click(function () {
                        //console.log("YEAH WORKING")
                        //that.stopPoint = 40;
                        that.addMoreTiles();
                    });


                    // scroll to end of page and create more tiles

                    // $(window).scroll(function () { 
                    //    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
                    //       that.addMoreTiles();
                    //    }
                    // });

                },

                tileTemplate: function (w, h) {
                    return {
                        w: w,
                        h: h,
                        t: 0,
                        l: 0,
                        cssWidth: 0,
                        cssHeight: 0,
                        className: "box-" + w + "-" + h,
                        created: false
                    }
                },



                setArrayLength: function (c) {
                    var a = [];
                    for (i=0; i < c; i += 1) {
                        a[i] = 0;
                    }
                     return a
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

                    return w;
                },


                updateElementWidth: function (width) {
                    $(this.element)[0].style.width = width + "px";
                },

                updateElementHeight: function (height) {
                    $(this.element)[0].style.height = height + "px";
                },


                consoleLogGrid: function (grid) {
                    var i = 0,
                        eof = grid.length;

                    for (i = 0; i < eof; i += 1) {
                       //console.log(grid[i]) 
                    }
                    //console.log("-----------------------------------------------");
                },


                animateTiles: function () {
                    var tile = $(".tile");

                    setTimeout(function () {

                    for (i=0; i < tile.length; i += 1) {
                        tile[i].setAttribute("class", "animate")
                    }

                        //$(".tile").addClass("animate")
                    }, 1000)

                },


                addMoreTiles: function () {
                    // limit the number of tiles created 
                    this.stopPoint += 20;

                    // get end of file number
                    this.eof += 20;

                    // start position of loop
                    this.startLoop = this.tiles.length;

                    this.solveJigsaw(); 
                },



                /************************************************************************************
                 * create tile elements and output to HTML
                 *
                 *
                 *
                 *
                 *************************************************************************************/
                createTile: function (cn, l, t, size, index) {
                    var c = document.querySelector(".container"),
                        e = document.createElement("div"),
                        i = document.createElement("img"),
                        ts = this.settings.tileWidth,
                        s = this.settings.spacing;
                        

                    var lorempixel = ["abstract", "animals", "business", "cats", "city", "food", "nightlife", "fashion", "people", "nature", "sports", "technics", "transport"];

                    var num = this.getNum(10);
                    var lorempixelIndex = this.getNum(lorempixel.length-1);


                    i.src = "http://lorempixel.com/" +
                            ((ts * size.w) - s) + 
                            "/" + ((ts * size.h) - s) + "/" + lorempixel[lorempixelIndex] + "/" + num +"/";

                    

                    e.setAttribute("class", cn + " tile");
                    e.setAttribute("style", 
                        "top: " + (t * ts + (s/2)) + "px;" + 
                        "left: " + ((l * ts) + (s/2)) + "px;" +
                        "width: " + ((ts * size.w) - s) + "px;" +
                        "height: " + ((ts * size.h) - s) + "px;");

                    //e.innerHTML = index + ": " + size.w +  " X " + size.h;
                    e.appendChild(i);
                    c.appendChild(e);
                },


                /************************************************************************************
                 * BROWSER RESIZE 
                 * 
                 *
                 * 
                 *
                 *************************************************************************************/
                browserResized: function (tileWidth) {

                    clearInterval(this.interval);

                    var w = this.getWidth(),
                        breakpoints = [],
                        me = this;

                    this.defineTileProperties(w);

                    // find breakpoint to recalculate tile width
                    breakpoints.push(w + 1);
                    breakpoints.push(w - 1);

                    // update containing element width
                    this.updateElementWidth(this.cols * this.settings.tileWidth)

                    // reset start loop to zero 
                    this.startLoop = 0;

                    this.solveJigsaw();

                    this.listenForBrowserResize(breakpoints);
                },


                defineTileProperties: function (w) {

                    // find which tile size to use
                    for (i = 0; i < this.settings.resize.length; i += 1) {
                        if (this.bwbp[i][1] >= w &&
                            this.bwbp[i][0] < w) {

                            this.settings.resizeIndex = i;

                        }
                    }

                    this.settings.spacing = this.settings.resize[this.settings.resizeIndex].tileSpace;
                    this.settings.tileWidth = this.settings.resize[this.settings.resizeIndex].tileWidth;

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

                        if (breakpoints[0] < w) {
                            me.browserResized();

                        } else if (breakpoints[1] > w) {
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
                        e = eof > (i+1) ? (this.settings.resize[i+1].breakpoint - 1) : 3000;
                        this.bwbp.push([s, e]);
                    }
                }
        };

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[ pluginName ] = function ( options ) {
                this.each(function() {
                        if ( !$.data( this, "plugin_" + pluginName ) ) {
                                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                        }
                });

                // chain jQuery functions
                return this;
        };

})( jQuery, window, document );