/*global  JGSW */
JGSW("GridController", function (s, u, e) {
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
});
