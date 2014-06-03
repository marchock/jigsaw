
// TODO -------

// http://jsfiddle.net/quirksmode/v3ApX/2/

// grab elements and use class names to identify tile widths and heights


// browser resize - reposition tiles not rebuild html


// breakpoint - fix build method to allow one column 


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

                    tileWidth: 200,

                    spacing: 0,

                    url: "",

                    demo: false,

                    tileResizeIndex: 0
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

                    var that = this,
                        w = $(window).width(),
                        i = 0;


                    console.log("WINDOW WIDTH:", w)


                    // find which tile size to use
                    for (i = 0; i < this.settings.tileResize.length; i += 1) {
                        if (this.settings.tileResize[i].bpExitEndPoint >= w &&
                            this.settings.tileResize[i].bpExitStartPoint < w) {
                            this.settings.tileResizeIndex = i;
                        }
                    }

                    this.settings.tileWidth = this.settings.tileResize[this.settings.tileResizeIndex].tileWidth;
                    this.bpEOF = Math.round(this.settings.tileResize[this.settings.tileResizeIndex].bpExitEndPoint / this.settings.tileResize[this.settings.tileResizeIndex].tileWidth);
                    this.setupBreakPoints(this.settings.tileWidth);


                    // setTimeout(function () {

                    //     that.settings.tileWidth = 300

                    //     $(window).resetBreakpoints();
                    //     that.setupBreakPoints(that.settings.tileWidth);

                    //     console.log("working")
                    // }, 5000)

                    

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







                    switch(this.settings.data) {
                        case "html":
                            this.getTilesDataFromHTML();

                          break;

                        case "obj":
                            this.buildTilesData();

                          break;
                    }



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

                demoBlocks: function () {
                    return [
                        {x: 2, y: 2},
                        {x: 2, y: 2},
                        {x: 1, y: 2},
                        {x: 2, y: 1},
                        {x: 1, y: 1},
                        {x: 1, y: 1},
                        {x: 1, y: 2},
                        {x: 2, y: 2},
                        {x: 1, y: 2},
                        {x: 2, y: 2},
                        {x: 1, y: 2},
                        {x: 1, y: 2},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 1, y: 2},
                        {x: 1, y: 1},
                        {x: 2, y: 2},
                        {x: 2, y: 2},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 2},
                        {x: 2, y: 2},
                        {x: 1, y: 2},
                        {x: 2, y: 1},
                        {x: 1, y: 1},
                        {x: 1, y: 1},
                        {x: 1, y: 2},
                        {x: 2, y: 2},
                        {x: 1, y: 2},
                        {x: 2, y: 2},
                        {x: 1, y: 2},
                        {x: 1, y: 2},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 1, y: 2},
                        {x: 1, y: 1},
                        {x: 2, y: 2},
                        {x: 2, y: 2},
                        {x: 2, y: 1},
                        {x: 2, y: 1}
                    ]
                },


                /*
                 * 
                 */
                browserResized: function (containerWidth) {

                    this.containerWidth = containerWidth;

                    // reset start loop to zero 
                    this.startLoop = 0;

                    // calculate the number of columns 
                    this.cols = Math.round(this.containerWidth / this.settings.tileWidth);


                    console.log("browserResized", this.cols, this.containerWidth, this.settings.tileWidth)


                    this.solveJigsaw();
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

                getTilesDataFromHTML: function () {

                    this.tileElements = $(this.element).find(this.settings.tileClassName);

                    this.stopPoint = this.tileElements.length;

                    this.eof = this.tileElements.length;

                    this.startLoop = 0;

                    

                    for (i = 0; i < this.tileElements.length; i += 1) {

                        for (ii = 0; ii < this.settings.tileSizes.length; ii += 1) {

                            if($(this.tileElements[i]).hasClass(this.settings.tileSizes[ii].name)) {
                                x = this.settings.tileSizes[ii].size[0];
                                y = this.settings.tileSizes[ii].size[1];
                                this.tiles.push(this.tileTemplate(x, y));

                                this.tileCounter += (x * y)
                            }
                        }

                    }
                },

                buildTilesData: function () {

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

                solveJigsaw: function () {

                    var testTemplate = this.demoBlocks(),
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

                    $(this.element)[0].style.height = (this.grid.length * this.settings.tileWidth) + "px";

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


                animateTiles: function () {
                    var tile = $(".tile");

                    setTimeout(function () {

                    for (i=0; i < tile.length; i += 1) {
                        tile[i].setAttribute("class", "animate")
                    }

                        //$(".tile").addClass("animate")
                    }, 1000)

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

                consoleLogGrid: function (grid) {
                    var i = 0,
                        eof = grid.length;

                    for (i = 0; i < eof; i += 1) {
                       //console.log(grid[i]) 
                    }
                    //console.log("-----------------------------------------------");
                },

                setupBreakPoints: function (tileWidth) {

                    clearInterval(this.interval);

                    this.previousBreakPoint = 0;
                    this.nbp = 0;


                    var breakpoints = [],
                        i = 0,
                        eof = 0,
                        value = 0,
                        me = this,
                        c = 2,
                        num = me.settings.tileResizeIndex;

                    // for (i = 0; i < (this.bpEOF); i += 1) {
                    //     breakpoints[i] = tileWidth * (c);
                    //     c += 1;
                    // }


                    var s = this.settings.tileResize[num].bpExitStartPoint,
                        e = this.settings.tileResize[num].bpExitEndPoint;

                    while (s <= e) {
                        breakpoints[i] = s;
                        s += this.settings.tileWidth
                        i += 1;
                    }

                    eof = breakpoints.length

                    console.log(breakpoints, this.bpEOF)

                    this.interval = setInterval(function () {
                        var w = $(window).width();

                        // find break point 
                        for (i = 0; i < eof; i += 1) {
                            if (breakpoints[i] <= w && breakpoints[i+1] > w) {
                                me.nbp = breakpoints[i];
                            }
                        }

                        // if break point value has changed update jigsaw
                        if (me.previousBreakPoint !== me.nbp) {
                            me.previousBreakPoint = me.nbp;
                            me.browserResized(me.nbp);
                            $(me.element)[0].style.width = me.nbp + "px";
                        }

                        




                        

                        if (breakpoints[0] > w) {


                            console.log("CHANGE DOWN ------", breakpoints[0], w)

                            me.settings.tileResizeIndex = me.settings.tileResizeIndex > 0 ? me.settings.tileResizeIndex-=1 : me.settings.tileResizeIndex;
                            me.updateBreakPointParam(me.settings.tileResizeIndex);



                        } else if (breakpoints[(breakpoints.length - 1)] < w) {

                            console.log("CHANGE UP----------------", breakpoints[(breakpoints.length - 2)], w)
                            me.settings.tileResizeIndex += 1;
                            me.updateBreakPointParam(me.settings.tileResizeIndex);

                        }



                    }, 200);
                },


                updateBreakPointParam: function (num) {

                    this.bpEOF = Math.round(this.settings.tileResize[num].bpExitEndPoint / this.settings.tileResize[num].tileWidth);
                    this.settings.tileWidth = this.settings.tileResize[num].tileWidth;
                    this.setupBreakPoints(this.settings.tileWidth);

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