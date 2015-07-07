
**jigsaw - responsive grid layout**
=====

This JavaScript plugin with no dependencies enables the creation of fast loading responsive grid layouts.


**Features**

- Can create responsive grid layouts using HTML or JSON
- Show and hide gutter width
- Can specify the number of tiles to load at one time in the grid
- Filtering is available using an HTML form
- Can set breakpoints to determine tile height, width and padding
- Assign a class name for each tile size


**Three options to create a grid**
------------

```
var j = new Jigsaw({
    select: {
        option: "",
    }
});

1. html
2. page
3. json

```


#####**1. html**
HTML elements are created inside of the jigsaw container and every div element is assigned with a class name to identify the tile size. The example below displays two tile sizes "largeitem" and "smallitem"
```
index.html

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
                // then number of tiles to load at one time
                index: 20
            },
            
            tile: [
            {
                // this class name must match the html
                // this tile is 2 tiles wide and 2 tiles tall
                classname: "largeitem",
                w: 2,
                h: 2
            },
            {
                // this class name must match the html
                classname: "smallitem",
                
                // this tile is 1 unit length wide
                w: 1,
                
                //1 unit length tall
                h: 1
           }]
        });
```

The unit height and width of the grid can be specified by the user (e.g. width: 200px; height: 200px;). The height and width of the tile (elements) can be determined according to the specified unit lengths.



#####**2. page**
This is similar to the html option, but the differences is the tile elements are separated in html files and loaded in one by one 

```
index.html

<div class="jigsaw">
    <div class="item largeitem"></div>
    <div class="item smallitem"></div>
    <div class="item smallitem"></div>
    <div class="item smallitem"></div>
</div>
```

```
page-2.html

<div class="jigsaw">
    <div class="item largeitem"></div>
    <div class="item smallitem"></div>
    <div class="item smallitem"></div>
    <div class="item smallitem"></div>
</div>
```
```
page-3.html

<div class="jigsaw">
    <div class="item largeitem"></div>
    <div class="item smallitem"></div>
    <div class="item smallitem"></div>
    <div class="item smallitem"></div>
</div>
```

javascipt
```

var j = new Jigsaw({

        select: {
            option: "page",
            url: "data/html/page-",
            pageIndex: 1,
            pageEnd: 3
        },

        load: {
            btn: true
        }
    });

```




#####**3. json**

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


------------------------------


###tile: array

```
EXAMPLE:

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



###**Breakpoints**

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


#####**Gulp - Installation Instructions**
-----------

######**To install Gulp globally: $ npm install gulp -g**
To install dependencies:
- npm install


View html pages using gulp-webserver
- gulp webserver

------