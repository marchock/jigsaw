/*global Jigsaw */

function Jigsaw(options) {
    this.init(options);
}

Jigsaw.prototype.init = function (options) {
    'use strict';
    var settings = this.Extend(this.Settings(), options);
    settings.stopPoint = settings.loadNumOfTiles;
    settings.eof = settings.loadNumOfTiles;

    var utils = new this.Utils(settings),
        data = new this.DataController(),
        events = new this.EventsController(),
        request = new this.DataRequest(),
        animation = new this.AnimationController(settings, utils),
        elements = new this.ElementsController(settings, utils, events, animation),
        grid = new this.GridController(settings, utils, elements),
        tiles = new this.TileConstructor(settings, utils, grid, elements, request, data),
        breakPoints = new this.BreakPoints(settings, utils, tiles);

    events.getMethod(tiles, "addMore");
    events.getMethod(data, "json");
    data.init(settings, elements, tiles, breakPoints, request);
};