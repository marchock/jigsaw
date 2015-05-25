jigsaw - responsive grid layout
=====

- three options to create grid elements
- define the number of grid elements to load at a time
- inherit a width from a containing element if specified
- hide and show outer guttering
- Can assign a class name, for each grid element dimensions
- Can set break points to resize grid elements according to your specification
- turn animations on and off
- turn scroll on or off to trigger load more tiles at the end of page
- option to load further grid elements by activating scrolling
- options to load further grid elements by activating load more button
- can specify a class name referring to all grid elements


-------------------------


Three options to create grid elements:

1. html
2. page
3. json




#####1. html


Grid elements are created inside the jigsaw element, you must define a class name for every different size

*HTML*
```
<div class="jigsaw">
    <div class="item largeitem"></div>
    <div class="item smallitem"></div>
    <div class="item smallitem"></div>
    <div class="item smallitem"></div>
    <div class="item smallitem"></div>
    <div class="item largeitem"></div>
    <div class="item smallitem"></div>
</div>
```


*javascript*
```
var j = Jigsaw({

    getDataFrom: "html",

    loadNumOfTiles: 10,
});
```




#####2. page

Gets elements from HTML pages and loads them into the jigsaw element

```
<div class="jigsaw">
    page one elements
</div>

var j = Jigsaw({

        getDataFrom: "page",

        page: {
            start: 1,
            num: 4,
            url: "html/page-"
        }
    });

```
html/page-1.html
```
<div class="item largeitem"></div>
<div class="item smallitem"></div>
<div class="item smallitem"></div>
<div class="item smallitem"></div>
<div class="item smallitem"></div>
<div class="item largeitem"></div>
<div class="item smallitem"></div>
```



#####3. json

gets JSON file and jigsaw creates HTML elemnts

```
<div class="jigsaw">
    html created here
</div>


var j = Jigsaw({

        getDataFrom: "json",

        url: "data/tiles.json",

        loadNumOfTiles: 20,
    });
```


JSON example
```
    {
        "id":"1",
        "html": "<p>html goes here</p>",
        "classname":"item",
        "tile": {
            "classname":"largeitem"
        }
    }
```

------------------------------


###tile: array

specifies class names, element width and height

```
    tile: [
        {
            classname: "smallitem",
            w: 1,
            h: 1
        },
        {
            classname: "largeitem",
            w: 2,
            h: 2
        },
        {
            classname: "longitem",
            w: 2,
            h: 1
        },
        {
            classname: "tallitem",
            w: 1,
            h: 2
        }
    ]
```


------------------------------


###resize: array

break points

```
    resize: [
        {
            breakpoint: 320,
            tileWidth: 160,
            tileSpace: 8
        },
        {
            breakpoint: 480,
            tileWidth: 200,
            tileSpace: 10
        },

        {
            breakpoint: 1200,
            tileWidth: 250,
            tileSpace: 18
        }
    ]
```

###Plugin Parameters

Parameters      | Type      | Notes
--------------- | ------------- | -------------
getDataFrom     |  string   | three options to choose how to receive element data
url             |  string   | used when getting data from a json file
paging          |  objec    | paging is used when getting data from "html-paging"
loadNumOfTiles  |  number   | if a number is not specified it will load all elements and should not be used with "html-paging"
getWidthFrom    |  string   | if not specified it will retrieve the window width
showGutter      |  boolean  | show spacing on the left and right side
tile            |  array    |
resize          |  array    |
animate         |  object   | animate elements onLoad
scroll          |  boolean  | loads more elements when scrolled to the end of the page
loadMore        |  boolean  | loads more elements when tapping on a button
