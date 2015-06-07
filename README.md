
#####Gulp - Installation Instructions
-----------
######To install Gulp globally: $ npm install gulp -g
To install dependencies:
- npm install


View html pages using gulp-webserver
- gulp webserver

------

jigsaw - responsive grid layout
=====
- three options to create grid elements
- define the number of grid elements to load at a time
- inherit a width from a containing element if specified
- hide and show outer guttering
- Can assign a class name, for each grid element dimensions
- Can set break points to resize grid elements according to your specification
- turn animations on and off
- options to load further grid elements by activating load more button
- can specify a class name referring to all grid elements


-------------------------


Three options to create grid elements:

```
var j = new Jigsaw(
    {
        select: {
            option: "html",
        }
    }
);

1. html
2. page
3. json

```


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
var j = new Jigsaw({

            select: {
                option: "html",
            },

            load: {
                btn: true,
                index: 20
            }
        });
```




#####2. page

Gets elements from HTML pages and loads them into the jigsaw element

```
<div class="jigsaw">
    page one elements
</div>

var j = new Jigsaw({

        select: {
            option: "page",
            url: "data/html/page-",
            pageIndex: 1,
            pageEnd: 4
        },

        load: {
            btn: true
        }
    });

```
html/page-2.html
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


var j = new Jigsaw({

        select: {
            option: "json",
            url: "data/tiles.json",
            filter: true
        },

        load: {
            btn: true,
            index: 20
        }
    });
```


<!-- JSON example
```
    {
        "id":"1",
        "html": "<p>html goes here</p>",
        "classname":"item",
        "tile": {
            "classname":"largeitem"
        }
    }
``` -->

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


###Breakpoints: array

```
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
    ]
```
