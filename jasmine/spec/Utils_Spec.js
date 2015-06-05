describe("JIGSAW UTILS", function() {

    var Settings = new obj.Settings(),
        Utils = new obj.Utils(Settings);


    it("is object", function() {
        expect(typeof(Utils)).toEqual('object');
    });


    console.log(Utils)


    describe("Utils.getWidth", function() {

        Settings.classnames.container = "";

        it("is a function", function() {
            expect(typeof(Utils["getWidth"])).toEqual('function');
        });

        it("return value is number", function() {
            expect(typeof(Utils["getWidth"]())).toEqual('number');
        });
    });


    describe("Utils.getComputedStyle", function() {

        it("is a function", function() {
            expect(typeof(Utils["getComputedStyle"])).toEqual('function');
        });
    });

    describe("Utils.getNumberOfTiles", function() {

        it("is a function", function() {
            expect(typeof(Utils["getNumberOfTiles"])).toEqual('function');
        });
    });

    describe("Utils.setArrayLength", function() {

        it("is a function", function() {
            expect(typeof(Utils["setArrayLength"])).toEqual('function');
        });
    });

    describe("Utils.tileResize", function() {

        it("is a function", function() {
            expect(typeof(Utils["tileResize"])).toEqual('function');
        });
    });

    describe("Utils.serialize", function() {

        it("is a function", function() {
            expect(typeof(Utils["serialize"])).toEqual('function');
        });
    });

    describe("Utils.formInputValues", function() {

        it("is a function", function() {
            expect(typeof(Utils["formInputValues"])).toEqual('function');
        });
    });

    describe("Utils.getFormData", function() {

        it("is a function", function() {
            expect(typeof(Utils["getFormData"])).toEqual('function');
        });
    });

    describe("Utils.hasClass", function() {

        it("is a function", function() {
            expect(typeof(Utils["hasClass"])).toEqual('function');
        });
    });

    describe("Utils.addClass", function() {

        it("is a function", function() {
            expect(typeof(Utils["addClass"])).toEqual('function');
        });
    });

    describe("Utils.removeClass", function() {

        it("is a function", function() {
            expect(typeof(Utils["removeClass"])).toEqual('function');
        });
    });
});
