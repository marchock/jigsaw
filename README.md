jigsaw (jQuery Plugin)
=====

is a responsive grid layout tool, solves how elements with specified widths and heights can be fitted within a specified width.


###Plugin Parameters 

Parameters      | Type		| Notes
--------------- | ------------- | -------------
getDataFrom     |  string	| 3 options
url             |  string	| only used when getting a json file 
paging          |  objec	| paging is only used when "html-paging" is selected 
loadNumOfTiles  |  number	| if a number is not specified it will load all elements
getWidthFrom    |  string	| if not specified it will retreive the window width
tileOption      |  string	| 3 options
showGutter      |  boolean	| show spacing on the left and right side 
tile            |  array	|
resize          |  array	|
animate         |  object	| animate elements onLoad
scroll          |  boolean	| loads more elements when scrolled to the end of the page
loadMore        |  boolean	| loads more elements when tapping on a button


-------------------------

###getDataFrom: string
1. html-static
2. html-paging
3. json




#####1. html-static

grabs HTML elements that exist within the jigsaw element

*javascript*
```
$(".jigsaw").jigsaw({

    getDataFrom: "html-static",

    loadNumOfTiles: 5,
});
```

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


#####2. html-paging

Gets elements from HTML pages and loads them into the jigsaw element

```
<div class="jigsaw">
	page one elements
</div>

    $(".jigsaw").jigsaw({

        getDataFrom: "html-paging",

        paging: {
            start: 1,
            end: 4,
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


    $(".jigsaw").jigsaw({

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


###tileOption: string
1. resize
2. remove
3. grid



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
