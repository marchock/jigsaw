
var options = {

    select: {
        option: "html",
    },

    load: {
        btn: true,
        index: 20,
        animate: true,
        framerate: 16
    },

    breakpoints: [
        {
            position: 320,
            tile: {
                width: 120,
                height: 120,
                padding: 8
            }
        },
        {
            position: 480,
            tile: {
                width: 160,
                height: 130,
                padding: 10
            }
        },
        {
            position: 1200,
            tile: {
                width: 200,
                height: 180,
                padding: 18
            }
        }
    ],

    tile: [
        {
            classname: "largeitem",
            w: 2,
            h: 2
        },
        {
            classname: "smallitem",
            w: 1,
            h: 1
        }
    ]
};
    var AnimationController = require('./jigsaw/AnimationController');
    var BreakPoints = require('./jigsaw/BreakPoints');
    var ElementsController = require('./jigsaw/ElementsController');
    var EventsController = require('./jigsaw/EventsController');
    var Extend = require('./jigsaw/Extend');
    var GridController = require('./jigsaw/Grid');
    var OptionController = require('./jigsaw/OptionController');
    var Request = require('./jigsaw/Request');
    var Settings = require('./jigsaw/Settings');
    var TileConstructor = require('./jigsaw/TileConstructor');
    var Utils = require('./jigsaw/Utils');


    var settings = Extend(Settings(), options);
    settings.stopPoint = settings.load.index;
    settings.eof = settings.load.index;

    var utils = new Utils(settings),
        option = new OptionController(),
        events = new EventsController(),
        optController = new OptionController(),
        animation = new AnimationController(settings, utils),
        elements = new ElementsController(settings, utils, events, animation),
        grid = new GridController(settings, utils, elements),
        tiles = new TileConstructor(settings, utils, grid, elements, optController, option),
        breakPoints = new BreakPoints(settings, utils, tiles);

    events.getMethod(tiles, "addMore");
    events.getMethod(option, "json");
    option.init(settings, elements, tiles, breakPoints, optController);
