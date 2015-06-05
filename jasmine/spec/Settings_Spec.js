describe("JIGSAW SETTINGS", function() {
  
    var settings = new obj.Settings();

    it("Settings is an object", function() {
        expect(typeof(settings)).toEqual('object');
    });

    /**************************************************************************
     *
     * SETTINGS.SHOWGUTTER
     *
     **************************************************************************/
    describe("Settings.showGutter parameter", function() {

        it("is boolean", function() {
            expect(typeof(settings.showGutter)).toEqual('boolean');
        });

        it("Defualt value is false", function() {
            expect(settings.showGutter).toEqual(false);
        });
    });

    /**************************************************************************
     *
     * SETTINGS.CLASSNAME
     *
     **************************************************************************/
    describe("Settings.classnames parameter", function() {

        it("is object", function() {
            expect(typeof(settings.classnames)).toEqual('object');
        });

        describe("Settings.classnames.container parameter", function() {

            it("is string", function() {
                expect(typeof(settings.classnames.container)).toEqual('string');
            });

            it("Defualt value is '.container'", function() {
                expect(settings.classnames.container).toEqual('.container');
            });
        });

        describe("Settings.classnames.tiles parameter", function() {

            it("is string", function() {
                expect(typeof(settings.classnames.tiles)).toEqual('string');
            });

            it("Defualt value is 'item'", function() {
                expect(settings.classnames.tiles).toEqual('item');
            });
        });

        describe("Settings.classnames.formElement parameter", function() {

            it("is string", function() {
                expect(typeof(settings.classnames.formElement)).toEqual('string');
            });

            it("Defualt value is '.json-form'", function() {
                expect(settings.classnames.formElement).toEqual('.json-form');
            });
        });

        describe("Settings.classnames.btnLoadMore parameter", function() {

            it("is string", function() {
                expect(typeof(settings.classnames.btnLoadMore)).toEqual('string');
            });

            it("Defualt value is '.load-more'", function() {
                expect(settings.classnames.btnLoadMore).toEqual('.load-more');
            });
        });
    });


    /**************************************************************************
     *
     * SETTINGS.SELECT
     *
     **************************************************************************/
    describe("Settings.select parameter", function() {

        it("is object", function() {
            expect(typeof(settings.select)).toEqual('object');
        });

        describe("Settings.select.option parameter", function() {

            it("is string", function() {
                expect(typeof(settings.select.option)).toEqual('string');
            });

            it("Defualt value is 'HTML'", function() {
                expect(settings.select.option).toEqual('HTML');
            });
        });

        describe("Settings.select.url parameter", function() {

            it("is string", function() {
                expect(typeof(settings.select.url)).toEqual('string');
            });

            it("Defualt value is ''", function() {
                expect(settings.select.url).toEqual('');
            });
        });

        describe("Settings.select.filter parameter", function() {

            it("is boolean", function() {
                expect(typeof(settings.select.filter)).toEqual("boolean");
            });

            it("Defualt value is false", function() {
                expect(settings.select.filter).toEqual(false);
            });
        });

        describe("Settings.select.urlEndPoint parameter", function() {

            it("is boolean", function() {
                expect(typeof(settings.select.urlEndPoint)).toEqual("boolean");
            });

            it("Defualt value is false", function() {
                expect(settings.select.urlEndPoint).toEqual(false);
            });
        });

        describe("Settings.select.pageIndex parameter", function() {

            it("is number", function() {
                expect(typeof(settings.select.pageIndex)).toEqual('number');
            });

            it("Defualt value is 1", function() {
                expect(settings.select.pageIndex).toEqual(1);
            });
        });

        describe("Settings.select.pageEnd parameter", function() {

            it("is number", function() {
                expect(typeof(settings.select.pageEnd)).toEqual('number');
            });

            it("Defualt value is 2", function() {
                expect(settings.select.pageEnd).toEqual(2);
            });
        });
    });

    /**************************************************************************
     *
     * SETTINGS.LOAD
     *
     **************************************************************************/
    describe("Settings.load parameter", function() {

        it("is object", function() {
            expect(typeof(settings.load)).toEqual('object');
        });

        describe("Settings.load.btn parameter", function() {

            it("is boolean", function() {
                expect(typeof(settings.load.btn)).toEqual('boolean');
            });

            it("Defualt value is false", function() {
                expect(settings.load.btn).toEqual(false);
            });
        });

        describe("Settings.load.scroll parameter", function() {

            it("is boolean", function() {
                expect(typeof(settings.load.scroll)).toEqual("boolean");
            });

            it("Defualt value is false", function() {
                expect(settings.load.scroll).toEqual(false);
            });
        });

        describe("Settings.load.index parameter", function() {

            it("is object", function() {
                expect(typeof(settings.load.index)).toEqual("object");
            });

            it("Defualt value is null", function() {
                expect(settings.load.index).toEqual(null);
            });
        });

        describe("Settings.load.animate parameter", function() {

            it("is boolean", function() {
                expect(typeof(settings.load.animate)).toEqual("boolean");
            });

            it("Defualt value is false", function() {
                expect(settings.load.animate).toEqual(false);
            });
        });

        describe("Settings.load.framerate parameter", function() {

            it("is object", function() {
                expect(typeof(settings.load.framerate)).toEqual("object");
            });

            it("Defualt value is null", function() {
                expect(settings.load.framerate).toEqual(null);
            });
        });
    });


    /**************************************************************************
     *
     * SETTINGS.BREAKPOINTS
     *
     **************************************************************************/
    describe("Settings.breakpoints parameter", function() {

        it("is object", function() {
            expect(typeof(settings.breakpoints)).toEqual('object');
        });

        describe("settings.breakpoints[0] first value in array", function() {

            it("is object", function() {
                expect(typeof(settings.breakpoints[0])).toEqual('object');
            });

            describe("settings.breakpoints[0].position", function() {

                it("is number", function() {
                    expect(typeof(settings.breakpoints[0].position)).toEqual('number');
                });

                it("Defualt value is 320", function() {
                    expect(settings.breakpoints[0].position).toEqual(320);
                });
            });

            describe("settings.breakpoints[0].tile", function() {

                it("is object", function() {
                    expect(typeof(settings.breakpoints[0])).toEqual('object');
                });

                describe("settings.breakpoints[0].tile.width", function() {

                    it("is number", function() {
                        expect(typeof(settings.breakpoints[0].tile.width)).toEqual('number');
                    });

                    it("Defualt value is 120", function() {
                        expect(settings.breakpoints[0].tile.width).toEqual(120);
                    });
                });

                describe("settings.breakpoints[0].tile.height", function() {

                    it("is number", function() {
                        expect(typeof(settings.breakpoints[0].tile.height)).toEqual('number');
                    });

                    it("Defualt value is 120", function() {
                        expect(settings.breakpoints[0].tile.height).toEqual(120);
                    });
                });

                describe("settings.breakpoints[0].tile.padding", function() {

                    it("is number", function() {
                        expect(typeof(settings.breakpoints[0].tile.padding)).toEqual('number');
                    });

                    it("Defualt value is 8", function() {
                        expect(settings.breakpoints[0].tile.padding).toEqual(8);
                    });
                });
            });
        });
    });



    /**************************************************************************
     *
     * SETTINGS.TILE
     *
     **************************************************************************/
    describe("Settings.tile parameter", function() {

        it("is object", function() {
            expect(typeof(settings.tile)).toEqual('object');
        });

        /**************************************************************************
         * SETTINGS.TILE[0]
         **************************************************************************/
        describe("settings.tile[0] first value in array", function() {

            it("is object", function() {
                expect(typeof(settings.tile[0])).toEqual('object');
            });

            describe("settings.tile[0].classname", function() {

                it("is string", function() {
                    expect(typeof(settings.tile[0].classname)).toEqual('string');
                });

                it("Defualt value is smallitem", function() {
                    expect(settings.tile[0].classname).toEqual('smallitem');
                });
            });

            describe("settings.tile[0].w", function() {

                it("is number", function() {
                    expect(typeof(settings.tile[0].w)).toEqual('number');
                });

                it("Defualt value is 1", function() {
                    expect(settings.tile[0].w).toEqual(1);
                });
            });

            describe("settings.tile[0].h", function() {

                it("is number", function() {
                    expect(typeof(settings.tile[0].h)).toEqual('number');
                });

                it("Defualt value is 1", function() {
                    expect(settings.tile[0].h).toEqual(1);
                });
            });
        });
        /**************************************************************************
         * SETTINGS.TILE[1]
         **************************************************************************/
        describe("settings.tile[1] first value in array", function() {

            it("is object", function() {
                expect(typeof(settings.tile[1])).toEqual('object');
            });

            describe("settings.tile[1].classname", function() {

                it("is string", function() {
                    expect(typeof(settings.tile[1].classname)).toEqual('string');
                });

                it("Defualt value is smallitem", function() {
                    expect(settings.tile[1].classname).toEqual('largeitem');
                });
            });

            describe("settings.tile[1].w", function() {

                it("is number", function() {
                    expect(typeof(settings.tile[1].w)).toEqual('number');
                });

                it("Defualt value is 2", function() {
                    expect(settings.tile[1].w).toEqual(2);
                });
            });

            describe("settings.tile[1].h", function() {

                it("is number", function() {
                    expect(typeof(settings.tile[1].h)).toEqual('number');
                });

                it("Defualt value is 2", function() {
                    expect(settings.tile[1].h).toEqual(2);
                });
            });
        });
        /**************************************************************************
         * SETTINGS.TILE[2]
         **************************************************************************/
        describe("settings.tile[2] first value in array", function() {

            it("is object", function() {
                expect(typeof(settings.tile[2])).toEqual('object');
            });

            describe("settings.tile[2].classname", function() {

                it("is string", function() {
                    expect(typeof(settings.tile[2].classname)).toEqual('string');
                });

                it("Defualt value is smallitem", function() {
                    expect(settings.tile[2].classname).toEqual('longitem');
                });
            });

            describe("settings.tile[2].w", function() {

                it("is number", function() {
                    expect(typeof(settings.tile[2].w)).toEqual('number');
                });

                it("Defualt value is 2", function() {
                    expect(settings.tile[2].w).toEqual(2);
                });
            });

            describe("settings.tile[2].h", function() {

                it("is number", function() {
                    expect(typeof(settings.tile[2].h)).toEqual('number');
                });

                it("Defualt value is 1", function() {
                    expect(settings.tile[2].h).toEqual(1);
                });
            });
        });
        /**************************************************************************
         * SETTINGS.TILE[3]
         **************************************************************************/
        describe("settings.tile[3] first value in array", function() {

            it("is object", function() {
                expect(typeof(settings.tile[3])).toEqual('object');
            });

            describe("settings.tile[3].classname", function() {

                it("is string", function() {
                    expect(typeof(settings.tile[3].classname)).toEqual('string');
                });

                it("Defualt value is smallitem", function() {
                    expect(settings.tile[3].classname).toEqual('tallitem');
                });
            });

            describe("settings.tile[3].w", function() {

                it("is number", function() {
                    expect(typeof(settings.tile[3].w)).toEqual('number');
                });

                it("Defualt value is 1", function() {
                    expect(settings.tile[3].w).toEqual(1);
                });
            });

            describe("settings.tile[3].h", function() {

                it("is number", function() {
                    expect(typeof(settings.tile[3].h)).toEqual('number');
                });

                it("Defualt value is 2", function() {
                    expect(settings.tile[3].h).toEqual(2);
                });
            });
        });
    });

    /**************************************************************************
     *
     * SETTINGS.MODIFYTILEHEIGHT
     *
     **************************************************************************/
    describe("Settings.modifyTileHeight parameter", function() {

        it("is number", function() {
            expect(typeof(settings.modifyTileHeight)).toEqual('number');
        });

        it("Defualt value is 0", function() {
            expect(settings.modifyTileHeight).toEqual(0);
        });
    });

    /**************************************************************************
     *
     * SETTINGS.PADDING
     *
     **************************************************************************/
    describe("Settings.padding parameter", function() {

        it("is number", function() {
            expect(typeof(settings.padding)).toEqual('number');
        });

        it("Defualt value is 0", function() {
            expect(settings.padding).toEqual(0);
        });
    });

    /**************************************************************************
     *
     * SETTINGS.COLS
     *
     **************************************************************************/
    describe("Settings.cols parameter", function() {

        it("is number", function() {
            expect(typeof(settings.cols)).toEqual('number');
        });

        it("Defualt value is 0", function() {
            expect(settings.cols).toEqual(0);
        });
    });

    /**************************************************************************
     *
     * SETTINGS.ROWS
     *
     **************************************************************************/
    describe("Settings.rows parameter", function() {

        it("is number", function() {
            expect(typeof(settings.rows)).toEqual('number');
        });

        it("Defualt value is 0", function() {
            expect(settings.rows).toEqual(0);
        });
    });

    /**************************************************************************
     *
     * SETTINGS.NUMOFTILES
     *
     **************************************************************************/
    describe("Settings.numOfTiles parameter", function() {

        it("is number", function() {
            expect(typeof(settings.numOfTiles)).toEqual('number');
        });

        it("Defualt value is 0", function() {
            expect(settings.numOfTiles).toEqual(0);
        });
    });


    /**************************************************************************
     *
     * SETTINGS.STOPPOINT
     *
     **************************************************************************/
    describe("Settings.stopPoint parameter", function() {

        it("is number", function() {
            expect(typeof(settings.stopPoint)).toEqual('number');
        });

        it("Defualt value is 0", function() {
            expect(settings.stopPoint).toEqual(0);
        });
    });

    /**************************************************************************
     *
     * SETTINGS.EOF
     *
     **************************************************************************/
    describe("Settings.eof parameter", function() {

        it("is number", function() {
            expect(typeof(settings.eof)).toEqual('number');
        });

        it("Defualt value is 0", function() {
            expect(settings.eof).toEqual(0);
        });
    });


    /**************************************************************************
     *
     * SETTINGS.STARTLOOP
     *
     **************************************************************************/
    describe("Settings.startLoop parameter", function() {

        it("is number", function() {
            expect(typeof(settings.startLoop)).toEqual('number');
        });

        it("Defualt value is 0", function() {
            expect(settings.startLoop).toEqual(0);
        });
    });

});
