define(['services/logger'], function (logger) {
    var title = 'Category';
    ko.observable.fn.store = function() {
        var self = this;
        var oldValue = self();

        var observable = ko.computed({
            read: function() {
                return self();
            },
            write: function(value) {
                oldValue = self();
                self(value);
            }
        });

        this.revert = function() {
            self(oldValue);
        };
        this.commit = function() {
            oldValue = self();
        };
        return this;
    };

    function movie(data) {
        var self = this;
        data = data || {};

        // Data from model
        //self.ID = data.ID;
        self.Id = ko.observable(data.Id).store();
        self.Name = ko.observable(data.Name).store();
        self.Description = ko.observable(data.Description).store();
        

        // Local (client) data
        self.editing = ko.observable(false);
    };

    var ViewModel = function () {
        var self = this;
        self.activate = activate;
        self.title= title,
        self.shouldShow = false,
        // View-model observables
        self.movies = ko.observableArray();
        

        // Adds a JSON array of movies to the view model.
        function addMovies(data) {
            var mapped = ko.utils.arrayMap(data, function (item) {
                return new movie(item);
            });
            self.movies(mapped);
        }

        // Callback for error responses from the server.
        function onError(error) {
            self.error('Error: ' + error.status + ' ' + error.statusText);
        }

        // Fetches a list of movies by genre and updates the view model.
        self.getByGenre = function () {
            //self.error(''); // Clear the error
            
            $.ajax({
                type: "GET",
                url: '/Category/GetCategories',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                },
                error: function (err) {
                    alert(err.status + " : " + err.statusText);
                }
            }).then(addMovies, onError);
            //app.service.byGenre(genre).then(addMovies, onError);
        };

        self.edit = function (item) {
            item.editing(true);
        };

        self.cancel = function (item) {
            revertChanges(item);
            item.editing(false);
        };

        self.save = function (item) {
            //app.service.update(item).then(
            //    function () {
            //        commitChanges(item);
            //    },
            //    function (error) {
            //        onError(error);
            //        revertChanges(item);
            //    }).always(function () {
            //        item.editing(false);
            //    });
        }

        function applyFn(item, fn) {
            for (var prop in item) {
                if (item.hasOwnProperty(prop) && item[prop][fn]) {
                    item[prop][fn].apply();
                }
            }
        }

        function commitChanges(item) { applyFn(item, 'commit'); }
        function revertChanges(item) { applyFn(item, 'revert'); }

        // Initialize the app by getting the first genre.
        self.getByGenre();
    }

    // Create the view model and tell Knockout to apply the data-bindings.
    ko.applyBindings(new ViewModel());










    ////var categorys =ko.observableArray([]);
    //var vm = {
    //    Name: ko.observable(),
    //    categorys: ko.observableArray([]),
    //    Description: ko.observable(),
    //    activate: activate,
    //    title: title,
    //    shouldShow: false,
    //    editing : ko.observable(false),
    //    save: function () {
            

    //        $.ajax({
    //            url: '/Category/Save',
    //            type: 'post',
    //            dataType: 'json',
    //            data: ko.toJSON(this),
    //            contentType: 'application/json',
    //            success: function (result) {
    //            },
    //            error: function (err) {
    //                alert("Status:" + err.responseText);
    //                //if (err.responseText == "Creation Failed")
    //                //{ window.location.href = '/Student/Index/'; }
    //                //else {
    //                //    alert("Status:" + err.responseText);
    //                //    window.location.href = '/Student/Index/';;
    //                //}
    //            },
    //            complete: function () {
    //                alert("Status: success.");
    //                vm.AllCategory();
    //                //window.location.href = '/Student/Index/';
    //            }
    //        });
    //    },
    //    AllCategory: function () {
    //        var self = this;
    //        editing: ko.observable(false);
    //        $.ajax({
    //            type: "GET",
    //            url: '/Category/GetCategories',
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (data) {
    //                self.categorys(data); //Put the response in ObservableArray
    //                self.editing(false);
    //            },
    //            error: function (err) {
    //                alert(err.status + " : " + err.statusText);
    //            }
    //        });
    //    }
        
    //};

    //return vm;

    //#region Internal Methods
    function activate() {
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }
    //#endregion
});




























































//define(['services/logger'], function (logger) {
//    var title = 'Category';
//    //var categorys =ko.observableArray([]);
//    var vm = {
//        Name: ko.observable(),
//        categorys: ko.observableArray([]),
//        Description: ko.observable(),
//        activate: activate,
//        title: title,
//        shouldShow: false,
//        editing: ko.observable(false),
//        save: function () {


//            $.ajax({
//                url: '/Category/Save',
//                type: 'post',
//                dataType: 'json',
//                data: ko.toJSON(this),
//                contentType: 'application/json',
//                success: function (result) {
//                },
//                error: function (err) {
//                    alert("Status:" + err.responseText);
//                    //if (err.responseText == "Creation Failed")
//                    //{ window.location.href = '/Student/Index/'; }
//                    //else {
//                    //    alert("Status:" + err.responseText);
//                    //    window.location.href = '/Student/Index/';;
//                    //}
//                },
//                complete: function () {
//                    alert("Status: success.");
//                    vm.AllCategory();
//                    //window.location.href = '/Student/Index/';
//                }
//            });
//        },
//        AllCategory: function () {
//            var self = this;
//            editing: ko.observable(false);
//            $.ajax({
//                type: "GET",
//                url: '/Category/GetCategories',
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                success: function (data) {
//                    self.categorys(data); //Put the response in ObservableArray
//                    self.editing(false);
//                },
//                error: function (err) {
//                    alert(err.status + " : " + err.statusText);
//                }
//            });
//        }

//    };

//    return vm;

//    //#region Internal Methods
//    function activate() {
//        logger.log(title + ' View Activated', null, title, true);
//        return true;
//    }
//    //#endregion
//});