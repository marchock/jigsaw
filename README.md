jigsaw
======

is a responsive grid layout tool, solves how elements with specified widths and heights can be fitted within a specified width.


Plugin Options 
--------------

**getDataFrom: string**

Three predifined string options to choose where data can be collected.






####1 "html-static"

all HTML elements resides within the index.html

```
    $(".jigsaw").jigsaw({
        getDataFrom: "html-static"
    });
```

####2 "html-paging"

html elements reside outside of the index.html and pages are created. Example below displays where the pages can be found and how many pages exist.


```
    $(".jigsaw").jigsaw({

        getDataFrom: "html-paging",

        paging: {
            start: 1,
            end: 4,
            url: "html/page-"
        }
    });
```



####3 "json"

JSON file can be used to send data to jigsaw and it will create the elements

```
    $(".jigsaw").jigsaw({

        getDataFrom: "json",

        url: "data/tiles.json",
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
