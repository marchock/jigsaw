
// TODO -------


// refresh tiles until 19th tile does not load, investigate why...


// LOAD MORE -- search grid for spaces then load more tiles to grid







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

                    tileWidth: 200,

                    spacing: 0,

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
                    var that = this;

                    // track where tiles are positioned "3 Dimensional ARRAY"
                    this.grid = [];

                    // tile properties "ARRAY"
                    this.tiles = [];

                    // number of tiles created "NUMBER"
                    this.numOfTiles = 0;


                    // limit the number of tiles created 
                    this.stopPoint = 20;

                    // get end of file number
                    this.eof = 20;

                    this.startLoop = 0



                    this.setupBreakPoints();

                    $(".load-more").click(function () {
                        console.log("YEAH WORKING")
                        //that.stopPoint = 40;
                        that.addMoreTiles();
                    });

                },

                demoBlocks: function () {
                    return [
                        {x: 1, y: 1},
                        {x: 2, y: 2},
                        {x: 1, y: 1},
                        {x: 2, y: 1},
                        {x: 1, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 2},
                        {x: 1, y: 1},
                        {x: 1, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 1, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 1, y: 2},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 1, y: 2},
                        {x: 1, y: 1}
                    ]
                },


                browserResized: function (containerWidth) {
                    this.containerWidth = containerWidth;

                    // calculate the number of columns 
                    this.cols = Math.round(this.containerWidth / this.settings.tileWidth);

                    this.solveJigsaw();
                },

                addMoreTiles: function () {
                    // limit the number of tiles created 
                    this.stopPoint += 20;

                    // get end of file number
                    this.eof += 20;

                    this.startLoop += 20;

                   this.solveJigsaw(); 
                },

                solveJigsaw: function (containerWidth) {

                    
                    // get the number of tile rows
                    this.rows = 0;


                    var testTemplate = this.demoBlocks(),
                        i = 0,
                        x,  
                        y;

                    // created array with tile properties and find total number of tiles



                    // TODO - if browser is resized reload tiles into position not create new tiles 



                    for (i = this.startLoop; i < this.eof; i += 1) {

                        if (this.settings.demo) {
                            x = testTemplate[i].x;
                            y = testTemplate[i].y;
                        } else {
                            x = this.getNum();
                            y = this.getNum();
                        }

                        // apply tile template to tiles array
                        this.tiles[i] = this.tileTemplate(x, y);

                        // calculate the total number of tiles
                        this.numOfTiles += (x * y)

                        //console.log(i, this.tiles, this.numOfTiles)
                    }

                    this.rows = Math.round(this.numOfTiles / this.cols);

                    for (i = this.grid.length; i <= this.rows+1; i += 1) {
                        this.grid[i] = this.setArrayLength(this.cols)
                    }

                    this.build();
                },

                build: function () {

                    var i = 0,
                        acC = 0,
                        acR = 0,
                        tc = 0,
                        addTile;
                    /*
                     * Set-up grid array
                     */
                    for (i=0; i < this.numOfTiles; i += 1) {
                        
                        addTile = true;

                        // if grid block is false then space available for a block 

                        // acR = array counter row
                        // acC = array counter column 

                        if (!this.grid[acR][acC]) {



                            /*
                             * 2 X 2 TILE  
                             */
                            if (this.isTileCreated(tc, 2, 2)) {

                                if (this.gridHasSpace(acR, acC)) {

                                    this.updateGrid(this.tiles[tc].className, acR, acC); 

                                } else {

                                    addTile = false;
                                    this.searchForTile(tc, acR, acC);
                                }



                            /*
                             * 2 X 1 TILE  
                             */
                            } else if (this.isTileCreated(tc, 2, 1)) {


                                if (this.gridHasSpace(acR, acC)) {

                                    this.updateGrid(this.tiles[tc].className, acR, acC); 

                                } else {

                                    addTile = false;
                                    this.searchForTile(tc, acR, acC);
                                }



                            /*
                             * 1 X 2 TILE  
                             */
                            } else if (this.isTileCreated(tc, 1, 2)) {

                                this.updateGrid(this.tiles[tc].className, acR, acC);



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
                                    this.createTile(this.tiles[tc].className, acC, acR, this.tiles[tc], tc);
                                    this.tiles[tc].created = true;
                                    this.updateTile(tc, acR, acC);

                                    tc += 1;
                                }
                            }
                        }

                        /**
                         * Update array counters 
                         *
                         * 
                         */
                        if (acC < this.cols-1) {
                            acC += 1;

                        } else {
                            acC = 0;
                            acR += 1;
                        }


                        if (!this.tiles[tc] || tc === this.stopPoint) {
                            console.log("COMPLETED", acR)
                            break;
                        }
                    }

                    // Apply height to container
                    $(this.element)[0].style.height = ((acR + 1) * this.settings.tileWidth) + "px";
                },


                searchForTile: function (index, acR, acC) {
                    var c = index;

                    for (c = c; c < this.tiles.length; c += 1) {

                        if (this.tiles[c].w === 1 && !this.tiles[c].created) {

                            this.createTile(this.tiles[c].className, acC, acR, this.tiles[c], c);
                            this.updateGrid(this.tiles[c].className, acR, acC);
                            this.tiles[c].created = true;
                            this.updateTile(index, acR, acC);

                            break;

                        } else if (this.tiles[c].w === 2 && !this.tiles[c].created) {

                            if (this.gridHasSpace(acR, acC)) {

                                this.createTile(this.tiles[c].className, acC, acR, this.tiles[c], c);
                                this.updateGrid(this.tiles[c].className, acR, acC);
                                this.tiles[c].created = true;
                                this.updateTile(index, acR, acC);

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
                    var top = (row * this.settings.tileWidth + (this.settings.spacing/2)),
                        left = (column * this.settings.tileWidth + (this.settings.spacing/2));

                    this.tiles[index].t = top;
                    this.tiles[index].l = left;
                    this.tiles[index].created = true;
                },


                gridHasSpace: function (row, column) {
                    var b = false;

                    if (!this.grid[row][column + 1] && 
                        (column + 1) < this.cols) {
                        b = true;
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


                getNum: function () {
                    return Math.floor((Math.random()*2)+1);
                },

                createTile: function (cn, l, t, size, index) {
                    var c = document.querySelector(".container"),
                        e = document.createElement("div"),
                        i = document.createElement("img"),
                        ts = this.settings.tileWidth,
                        s = this.settings.spacing;

                    e.setAttribute("class", cn);
                    e.setAttribute("style", 
                        "top: " + (t * ts + (s/2)) + "px;" + 
                        "left: " + ((l * ts) + (s/2)) + "px;" +
                        "width: " + ((ts * size.w) - s) + "px;" +
                        "height: " + ((ts * size.h) - s) + "px;");

                    e.innerHTML = index + ": " + size.w +  " X " + size.h;


                    c.appendChild(e);
                },

                consoleLogGrid: function (grid) {
                    var i = 0,
                        eof = grid.length;

                    for (i = 0; i < eof; i += 1) {
                       console.log(grid[i]) 
                    }
                    console.log("-----------------------------------------------");
                },

                setupBreakPoints: function () {

                    var that = this,
                        i = 0,
                        eof = this.settings.breakpoints.length,
                        value = 0;

                    for (i = 0; i < eof; i += 1) {

                        value = that.settings.breakpoints[i];

                        $(window).bind('enterBreakpoint' + value, value, function (e) {

                            $(that.element)[0].innerHTML = "";
                            $(that.element)[0].style.width = e.data + "px";
                            that.browserResized(e.data);
                            
                        });

                    }

                    $(window).setBreakpoints();

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