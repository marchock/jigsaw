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

                    this.setupBreakPoints();

                    $(".load-more").click(function () {
                        console.log("YEAH WORKING")
                        that.stopPoint = 40;
                        that.build();
                    });

                },

                solveJigsaw: function (containerWidth) {



                    var testTemplate = [
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 2},
                        {x: 2, y: 2},
                        {x: 1, y: 1},
                        {x: 2, y: 2},
                        {x: 2, y: 2},
                        {x: 1, y: 1},
                        {x: 2, y: 1},
                        {x: 1, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 1, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 1},
                        {x: 2, y: 1}
                    ]



                    var numOfImages = 20;

                    this.cols = Math.round(containerWidth / this.settings.tileWidth);

                    console.log("COLUMN NUMBER: ", this.cols)

                    var i = 0,
                        x, 
                        y,
                        acC = 0,
                        acR = 0,
                        tc = 0,
                        addTile;


                        this.grid = [];
                        this.tiles = [];
                        this.numOfTiles = 0;
                        this.rows = 0;
                        this.stopPoint = 20;


                    for (i=0; i < numOfImages; i += 1) {
                        // x = this.getNum();
                        // y = this.getNum();

                        x = testTemplate[i].x;
                        y = testTemplate[i].y;

                        //console.log(x, y);

                        this.tiles[i] = this.tileTemplate(x, y);
                        this.numOfTiles += (x * y)
                    }

                    this.rows = Math.round(this.numOfTiles / this.cols);

                    // Apply width to container
                    $(this.element)[0].style.height = ((this.rows+1)*this.settings.tileWidth) + "px";


                    for (i = 0; i <= this.rows+1; i += 1) {
                        this.grid[i] = this.setArrayLength(this.cols)
                    }

                    this.build();
                },

                build: function () {

                    //console.log(this.grid)

                    var i = 0,
                        acC = 0,
                        acR = 0,
                        tc = 0,
                        addTile;
/*
                     * Set-up grid array
                     */
                    for (i=0; i < this.numOfTiles; i += 1) {

                        //this.consoleLogGrid(this.grid);
                        
                        addTile = true;
                        console.log(i, "GRID SPACE AVAILABLE = ", this.grid[acR][acC], tc, this.tiles[tc], acC)

                        //console.log("2X1 - num", tc, this.grid[0]);
                        //console.log("2X1 - num", tc, this.grid[1]);

                        // if grid block is false then update block
                        if (!this.grid[acR][acC]) {

                            /*
                             * if tile width and height is 2 tiles wide
                             */

                             //console.log( "WIDTH: ", this.tiles[tc].w, "HEIGHT: ", this.tiles[tc].h)


                            if (this.tiles[tc].w === 2 && this.tiles[tc].h === 2 && !this.tiles[tc].created) {

                                //console.log("2X2 - num", tc);


                                /*
                                 * if 
                                 * this.grid position (x + 1) and (y + 1) is false
                                 * &&
                                 * this.grid position x and (y + 1) is false
                                 * &&
                                 * this.grid position (x + 1) and y is false
                                 * &&
                                 * (acC + 1) less than this.cols
                                 */
                                if (!this.grid[acR + 1][acC + 1] && 
                                    !this.grid[acR][acC + 1] &&
                                    !this.grid[acR + 1][acC] &&
                                    (acC + 1) < this.cols) {


                                    /*
                                     * Update this.grid 2x2 tile
                                     */
                                    this.grid[acR+1][acC+1] = 1;
                                    this.grid[acR+1][acC] = 1;
                                    this.grid[acR][acC+1] = 1;
                                    this.grid[acR][acC] = 1;

                                } else {

                                    addTile = false;


                                    /**
                                     * find a tile to fit this.grid spaces
                                     *
                                     */

                                    /*
                                     * start loop from parent loop
                                     */ 
                                    var c = tc;

                                    for (c = c; c < this.tiles.length; c += 1) {


                                        /**
                                         * IF 
                                         * tile width is 1 tile wide 
                                         * &&
                                         * tile has not been created in html 
                                         */
                                        if (this.tiles[c].w === 1 && !this.tiles[c].created) {


                                            
                                            this.createTile(this.tiles[c].className, acC, acR, this.tiles[c], c, "2X2 FIND");
                                            this.tiles[c].created = true;
                                            this.grid[acR][acC] = 1;

                                            if (this.tiles[c].h === 2) {
                                                this.grid[acR + 1][acC] = 1;
                                            }

                                            console.log("FIND TILE TO FIT:", c, this.tiles[c])

                                            break;
                                        }
                                    }
                                }


                            /*
                             * if tile width is 2 this.tiles wide
                             */
                            } else if (this.tiles[tc].w === 2 && this.tiles[tc].h === 1 && !this.tiles[tc].created) {
                                //console.log("2X1 - num", tc, this.grid[0]);
                                console.log("2X1 - num", tc);

                                // if this.grid position is false and if current column position is less then max col width


                                /*
                                 * IF 
                                 * this.grid position x and (y + 1) is false
                                 * &&
                                 * (acC + 1) less than this.cols
                                 */
                                if (!this.grid[acR][acC+1] && (acC+1) < this.cols) {

                                    console.log("GRID HAS SPACE FOR 2 X 1", tc, this.grid[acR][acC+1], (acC+1), this.cols);

                                    /*
                                     * Update this.grid WIDTH X HEIGHT -  2 x 1 tile
                                     */
                                    this.grid[acR][acC] = 1;
                                    this.grid[acR][acC+1] = 1;
                                } else {

                                    // two tile wide cannot fit 
                                    addTile = false;
                                    this.grid[acR][acC] = 0;

                                    //console.log("TILE DOES NOT FIT -  WIDTH", tc, this.tiles[tc])


                                    // find a tile to fit
                                    var c = tc;
                                    for (c = c; c < this.tiles.length; c += 1) {

                                        console.log("FIND TILE TO FIT", c);

                                        //console.log("NEXT TILE +++++++++", c, this.tiles[c].w, this.tiles[tc].created)


                                        if (this.tiles[c].w === 1 && !this.tiles[c].created) {
                                            //console.log("NEXT TILE", c)


                                            this.createTile(this.tiles[c].className, acC, acR, this.tiles[c], c, "2X1 FIND");
                                            this.tiles[c].created = true;
                                            this.grid[acR][acC] = 1;

                                            if (this.tiles[c].h === 2) {
                                                this.grid[acR + 1][acC] = 1;
                                            }

                                            //console.log("CREATE TILE: +++++++ : " ,acC, acR, this.tiles[c].className)

                                            break;
                                        }
                                    }


                                }



                            } else if (this.tiles[tc].w === 1 && this.tiles[tc].h === 2 && !this.tiles[tc].created) {

                                //console.log("1X2 - num", tc);

                                //console.log("acr", acR)

                                if (!this.grid[acR+1][acC] && (acR+1) < this.rows) {

                                    this.grid[acR][acC] = 1;
                                    this.grid[acR+1][acC] = 1;

                                } else {

                                    addTile = false;
                                    //console.log("TILE DOES NOT FIT -  HEIGHT", tc, this.tiles[tc]);



                                    // find a tile to fit
                                    var c = tc;
                                    for (c = c; c < this.tiles.length; c += 1) {



                                        //console.log("NEXT TILE +++++++++", c, this.tiles[c].w, this.tiles[tc].created)


                                        if (this.tiles[c].w === 1 && !this.tiles[c].created) {
                                            //console.log("NEXT TILE", c)


                                            this.createTile(this.tiles[c].className, acC, acR, this.tiles[c], c, "1X2 FIND");
                                            this.tiles[c].created = true;
                                            this.grid[acR][acC] = 1;

                                            if (this.tiles[c].h === 2) {
                                                this.grid[acR + 1][acC] = 1;
                                            }
                                            //console.log("CREATE TILE: +++++++ : " ,acC, acR, this.tiles[c].className)

                                            break;
                                        }
                                    }


                                }

                            } else if (this.tiles[tc].w === 1 && this.tiles[tc].h === 1 && !this.tiles[tc].created) {

                                console.log("1X1: ", this.tiles[tc].w, this.tiles[tc].h, this.tiles[tc].created);

                                this.grid[acR][acC] = 1;

                                if (this.tiles[tc].created) {   
                                    addTile = false;
                                    tc += 1;

                                    // find a tile to fit
                                    var c = tc;
                                    for (c = c; c < this.tiles.length; c += 1) {

                                        console.log("FIND TILE TO FIT", c);

                                        //console.log("NEXT TILE +++++++++", c, this.tiles[c].w, this.tiles[tc].created)


                                        if (this.tiles[c].w === 1 && !this.tiles[c].created) {
                                            //console.log("NEXT TILE", c)


                                            this.createTile(this.tiles[c].className, acC, acR, this.tiles[c], c, "1X1 FIND");
                                            this.tiles[c].created = true;
                                            this.grid[acR][acC] = 1;

                                            if (this.tiles[c].h === 2) {
                                                this.grid[acR + 1][acC] = 1;
                                            }

                                            //console.log("CREATE TILE: +++++++ : " ,acC, acR, this.tiles[c].className)

                                            break;
                                        }
                                    }
                                }
                            }



                            if (addTile) {
                                if (this.tiles[tc].className) {
                                    this.createTile(this.tiles[tc].className, acC, acR, this.tiles[tc], tc, "FIT");
                                    this.tiles[tc].created = true;

                                    tc += 1;
                                }
                            }
                        }

                        /**
                         *
                         *
                         * 
                         */
                        if (acC < this.cols-1) {
                            acC += 1;

                        } else {
                            acC = 0;
                            acR += 1;
                        }

                       // console.log(tc, this.stopPoint)

                        if (!this.tiles[tc] || tc === this.stopPoint) {
                            console.log("COMPLETED")
                            break;
                        }
                    }
                },


                tileTemplate: function (w, h) {
                    return {
                        w: w,
                        h: h,
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


                createTile: function (cn, l, t, size, index, message) {
                    var c = document.querySelector(".container"),
                        e = document.createElement("div"),
                        i = document.createElement("img"),
                        ts = this.settings.tileWidth,
                        s = this.settings.spacing;

                    e.setAttribute("class", cn);
                    e.setAttribute("style", 
                        "top: " + (t * ts) + "px;" + 
                        "left: " + (l * ts) + "px;" +
                        "width: " + ((ts * size.w) - s) + "px;" +
                        "height: " + ((ts * size.h) - s) + "px;");

                    e.innerHTML = index + ": " + size.w +  " X " + size.h + " -----" + message;


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
                            that.solveJigsaw(e.data);
                            
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