/*global  JGSW */
JGSW("ElementsController", function (s, u, e, a) {
    'use strict';

    var Settings = s,
        Utils = u,
        Events = e,
        Animation = a,
        cachedData,
        $parent = document.querySelector(".jigsaw"),
        $children = $parent.querySelectorAll("." + Settings.classnames.tiles),
        $btnLoadMore = document.querySelector(Settings.classnames.btnLoadMore),
        $form = document.querySelector(Settings.classnames.formElement);

    if (Settings.load.btn) {
        Events.loadMoreBtn($btnLoadMore, "click");
    }

    /*
     * Loop through form and find elements (radio and select) to attach events to
     */
    if (Settings.select.filter || Settings.select.urlEndPoint) {

        var ele = $form.elements,
            c = 0,
            eof = (ele.length - 1),
            createEvent = false;

        for (c = eof; c >= 0; c -= 1) {

            createEvent = false;

            if (ele[c].nodeName === "INPUT" &&
                    ele[c].type === "radio") {
                createEvent = true;

            } else if (ele[c].nodeName === "SELECT" &&
                    ele[c].type === "select-one") {
                createEvent = true;
            }

            if (createEvent) {
                Events.filterGrid(ele[c], "change", Settings.select.filter);
            }
        }
    }

    return {

        getChildren: function () {
            return $children;
        },

        updateChildren: function () {
            $children = $parent.querySelectorAll("." + Settings.classnames.tiles);
        },

        removeChildren: function () {
            $parent.innerHTML = "";
        },

        getFormData: function (string) {
            //serialize
            //formInputValues

            return Utils[string]($form);
        },

        getLength: function () {
            return $children.length;
        },

        getForm: function () {
            return $form;
        },

        updateTiles: function (tiles) {
            var i = 0,
                w = 0;

            for (i = Settings.startLoop; i < Settings.stopPoint; i += 1) {

                // if tile option is resize then width is calculated to fit...
                w = Utils.tileResize(tiles[i].cssWidth);

                $children[i].style.width = w + "px";
                $children[i].style.height = tiles[i].cssHeight + "px";
                $children[i].style.left = tiles[i].l + "px";
                $children[i].style.top = tiles[i].t + "px";
                $children[i].style.display = tiles[i].display;

                if (Settings.load.animate) {
                    Utils.addClass($children[i], "animate");
                }
            }

            if (Settings.load.animate) {
                Animation.start($children);
            }
        },

        appendData: function (data) {
            $parent.innerHTML += data;
            this.updateChildren();
        },

        updateWidth: function (w) {
            $parent.style.width = w + "px";
        },

        updateHeight: function (h) {
            $parent.style.height = h + "px";
        },

        createHTMLElements: function (data) {
            var i = 0;

            if (data) {
                cachedData = data;
                this.removeChildren();
            }

            for (i = Settings.startLoop; i < Settings.stopPoint; i += 1) {
                Settings.tileTemplate(cachedData[i], $parent);
            }
            this.updateChildren();
        },

        hide: function (string) {
            switch (string) {

            case "loadMore":
                if (Settings.load.btn) {
                    $btnLoadMore.style.display = "none";
                }
                break;
            }
        },

        show: function (string) {
            switch (string) {

            case "loadMore":
                if (Settings.load.btn) {
                    $btnLoadMore.style.display = "block";
                }
                break;
            }
        }
    };
});
