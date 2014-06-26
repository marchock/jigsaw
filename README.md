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
showGutter      |  boolean	| 
tile            |  array	|
resize          |  array	|
animate         |  object	|
scroll          |  boolean	|
loadMore        |  boolean	|


-------------------------

###getDataFrom: string
1. html-static
2. html-paging
3. json




#####1. html-static

grabs HTML elements that exist within the jigsaw element


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
$(".jigsaw").jigsaw({

    getDataFrom: "html-static",

    loadNumOfTiles: 5,
});
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
