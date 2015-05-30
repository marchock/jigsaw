/*global  JGSW */
JGSW("Extend", function (defaultSettings, options) {
    'use strict';
    var settings = defaultSettings;
    Object.keys(options).forEach(function (key) {
        settings[key] = options[key];
    });
    return settings;
});