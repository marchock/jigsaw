/*global Jigsaw */

function Jigsaw(options) {
    this.init(options);
}

Jigsaw.prototype.init = function (options) {
    'use strict';
    var settings = this.Extend(this.Settings(), options);
    settings.stopPoint = settings.load.index;
    settings.eof = settings.load.index;

    var utils = new this.Utils(settings),
        option = new this.OptionController(),
        events = new this.EventsController(),
        request = new this.DataRequest(),
        animation = new this.AnimationController(settings, utils),
        elements = new this.ElementsController(settings, utils, events, animation),
        grid = new this.GridController(settings, utils, elements),
        tiles = new this.TileConstructor(settings, utils, grid, elements, request, option),
        breakPoints = new this.BreakPoints(settings, utils, tiles);

    events.getMethod(tiles, "addMore");
    events.getMethod(option, "json");
    option.init(settings, elements, tiles, breakPoints, request);
};
