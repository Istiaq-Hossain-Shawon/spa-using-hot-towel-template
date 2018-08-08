define(['services/logger'], function (logger) {
    var title = 'CategoryVm';
    //var ListViewModel = {
    //    activate: activate,
    //    title: title,
    //    shouldShow: false
    //};
    function Data() {
        var initialData = [];
        $.ajax({
            type: 'GET',
            url: '/Category/GetCategories',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    console.log("ID:" + item.Id + " Name:" + item.Name + " Description:" + item.Description);
                    initialData.push(new State(item.Id, item.Name, item.Description));
                }
            },
            async:false,
        });
        return initialData;
    }

    
    var ListViewModel = function (initialData) {


        var self = this;
        this.name = ko.observable();
        this.Description = ko.observable();
        window.viewModel = self;
        self.activate = activate;;
        self.title = title;
        self.shouldShow = ko.observableArray(false);
        self.list = ko.observableArray(initialData);
        
        console.log("sdfsdfffffffffffffa" + self.list());
        self.pageSize = ko.observable(4);
        self.pageIndex = ko.observable(0);
        self.selectedItem = ko.observable();
        self.saveUrl = '/Category/Edit';
        self.deleteUrl = '/api/state/delete';

        //self.check= function() {
        //    self.name = ko.observable("");
        //    self.Description = ko.observable("");
        //}

        self.edit = function (item) {
            self.selectedItem(item);
        };

        self.cancel = function () {
            self.selectedItem(null);
        };

        self.add = function () {
            var newItem = new State();
            self.list.push(newItem);
            self.selectedItem(newItem);
            self.moveToPage(self.maxPageIndex());
        };
        self.remove = function (item) {
            if (item.id()) {
                if (confirm('Are you sure you wish to delete this item?')) {
                    $.post(self.deleteUrl, item).complete(function (result) {
                        self.list.remove(item);
                        if (self.pageIndex() > self.maxPageIndex()) {
                            self.moveToPage(self.maxPageIndex());
                        }
                    });
                }
            }
            else {
                self.list.remove(item);
                if (self.pageIndex() > self.maxPageIndex()) {
                    self.moveToPage(self.maxPageIndex());
                }
            }
        };

        self.SaveCategory = function() {
            $.ajax({
                url: '/Category/Save',
                type: 'post',
                dataType: 'json',
                data: ko.toJSON(this),
                contentType: 'application/json',
                success: function (result) {
                   
                },
                error: function(err) {
                    alert("Status:" + err.responseText);

                },
                complete: function() {
                    logger.log('Category Added', null, title, true);
                }
            });
        };


        self.save = function () {
            var item = self.selectedItem();
            $.post(self.saveUrl, item, function (result) {
                self.selectedItem().id(result);
                self.selectedItem(null);
                logger.log(' Category updated', null, title, true);
            });

        };
        //self.Load = ko.observableArray();


        self.templateToUse = function (item) {
            return self.selectedItem() === item ? 'editTmpl' : 'itemsTmpl';
        };

        self.pagedList = ko.dependentObservable(function () {
            var size = self.pageSize();
            var start = self.pageIndex() * size;
            return self.list.slice(start, start + size);
        });
        self.maxPageIndex = ko.dependentObservable(function () {
            return Math.ceil(self.list().length / self.pageSize()) - 1;
        });
        self.previousPage = function () {
            if (self.pageIndex() > 0) {
                self.pageIndex(self.pageIndex() - 1);
            }
        };
        self.nextPage = function () {
            if (self.pageIndex() < self.maxPageIndex()) {
                self.pageIndex(self.pageIndex() + 1);
            }
        };
        self.allPages = ko.dependentObservable(function () {
            var pages = [];
            for (i = 0; i <= self.maxPageIndex() ; i++) {
                pages.push({ pageNumber: (i + 1) });
            }
            return pages;
        });
        self.moveToPage = function (index) {
            self.pageIndex(index);
        };
    };
    
    function State(id, name, Description) {
        this.id = ko.observable(id);
        this.name = ko.observable(name);
        this.Description = ko.observable(Description);
    }
    var initialData1 = Data();
    return new ListViewModel(initialData1);

    //#region Internal Methods
    function activate() {
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }

    //#endregion
    
});


//$(function () {
//    var horizontal = ko.observable();
//    var vertical = ko.observable();
//    var Name = ko.observable();
//    var viewModel = {
//        positionConfig: {
//            template: 'test-template',
//            data: {
//                Name: Name
//            }
//        }
//    };
//    ko.applyBindings(viewModel);
//});























































//define(['services/logger'], function (logger) {
//    var title = 'CategoryVm';
//    //var ListViewModel = {
//    //    activate: activate,
//    //    title: title,
//    //    shouldShow: false
//    //};


//    var data = function () {


//    };
//    var ListViewModel = function (initialData) {
//        var self = this;
//        window.viewModel = self;
//        self.activate = activate;;
//        self.title = title;
//        self.shouldShow = ko.observableArray(false);




//        //var initialData = [];
//        //var onSuccess = function (data) {
//        //    //data will be your s object, in JSON format

//        //    //initialData = JSON.stringify(data);

//        //    for (var i = 0; i < data.length - 1; i++) {
//        //        var item = data[i];
//        //        console.log("ID:"+item.Id + "Name:"+item.Name +"Description:"+ item.Description);
//        //        initialData.push(State(item.Id, item.Name, item.Description));
//        //    }


//        //};
//        //$.ajax({
//        //    type: 'GET',
//        //    url: '/Category/GetCategories',
//        //    success: function (data) { onSuccess(data); }
//        //});


//        self.list = ko.observableArray(initialData);
//        console.log("sdfsdfffffffffffffa" + self.list());
//        self.pageSize = ko.observable(3);
//        self.pageIndex = ko.observable(0);
//        self.selectedItem = ko.observable();
//        self.saveUrl = '/Category/Save';
//        self.deleteUrl = '/api/state/delete';

//        self.edit = function (item) {
//            self.selectedItem(item);
//        };

//        self.cancel = function () {
//            self.selectedItem(null);
//        };

//        self.add = function () {
//            var newItem = new State();
//            self.list.push(newItem);
//            self.selectedItem(newItem);
//            self.moveToPage(self.maxPageIndex());
//        };
//        self.remove = function (item) {
//            if (item.id()) {
//                if (confirm('Are you sure you wish to delete this item?')) {
//                    $.post(self.deleteUrl, item).complete(function (result) {
//                        self.list.remove(item);
//                        if (self.pageIndex() > self.maxPageIndex()) {
//                            self.moveToPage(self.maxPageIndex());
//                        }
//                    });
//                }
//            }
//            else {
//                self.list.remove(item);
//                if (self.pageIndex() > self.maxPageIndex()) {
//                    self.moveToPage(self.maxPageIndex());
//                }
//            }
//        };
//        self.save = function () {
//            var item = self.selectedItem();
//            $.post(self.saveUrl, item, function (result) {
//                self.selectedItem().id(result);
//                self.selectedItem(null);
//            });

//        };
//        //self.Load = ko.observableArray();


//        self.templateToUse = function (item) {
//            return self.selectedItem() === item ? 'editTmpl' : 'itemsTmpl';
//        };

//        self.pagedList = ko.dependentObservable(function () {
//            var size = self.pageSize();
//            var start = self.pageIndex() * size;
//            return self.list.slice(start, start + size);
//        });
//        self.maxPageIndex = ko.dependentObservable(function () {
//            return Math.ceil(self.list().length / self.pageSize()) - 1;
//        });
//        self.previousPage = function () {
//            if (self.pageIndex() > 0) {
//                self.pageIndex(self.pageIndex() - 1);
//            }
//        };
//        self.nextPage = function () {
//            if (self.pageIndex() < self.maxPageIndex()) {
//                self.pageIndex(self.pageIndex() + 1);
//            }
//        };
//        self.allPages = ko.dependentObservable(function () {
//            var pages = [];
//            for (i = 0; i <= self.maxPageIndex() ; i++) {
//                pages.push({ pageNumber: (i + 1) });
//            }
//            return pages;
//        });
//        self.moveToPage = function (index) {
//            self.pageIndex(index);
//        };
//    };
//    function State2(id, name, Description) {
//        this.id = id;
//        this.name = name;
//        this.Description = Description;
//    }
//    function State(id, name, Description) {
//        this.id = ko.observable(id);
//        this.name = ko.observable(name);
//        this.Description = ko.observable(Description);
//    }

//    var initialData = [new State('WA', 'Washington', 'WA'), new State('AK', 'Alaska', 'AK')];
//    //ko.applyBindings();
//    //console.log(initialData);
//    return new ListViewModel(initialData);
//    //return  ListViewModel(initialData);




//    //#region Internal Methods
//    function activate() {
//        logger.log(title + ' View Activated', null, title, true);
//        return true;
//    }
//    //#endregion
//});
















































































//define(['services/logger'], function (logger) {
//    var title = 'CategoryVm';
//    //var ListViewModel = {
//    //    activate: activate,
//    //    title: title,
//    //    shouldShow: false
//    //};

   
//    var data = function () {
        

//    };
//    var ListViewModel = function () {
//        var self = this;
//        window.viewModel = self;
//        self.activate = activate;;
//        self.title = title;
//        self.shouldShow = ko.observableArray(false);
//        self.list = ko.observableArray();
//        var initialData = [];
//        var onSuccess = function (data) {
//            //data will be your s object, in JSON format

//            //initialData = JSON.stringify(data);

//            for (var i = 0; i < data.length - 1; i++) {
//                var item = data[i];
//                console.log("ID:" + item.Id + "Name:" + item.Name + "Description:" + item.Description);
//                self.list.push(State2(item.Id, item.Name, item.Description));
//            }
//        };
//        $.ajax({
//            type: 'GET',
//            url: '/Category/GetCategories',
//            success: function (data) { onSuccess(data); }
//        });
//        console.log("sdfsdfffffffffffffa"+self.list());
//        self.pageSize = ko.observable(3);
//        self.pageIndex = ko.observable(0);
//        self.selectedItem = ko.observable();
//        self.saveUrl = '/Category/Save';
//        self.deleteUrl = '/api/state/delete';

//        self.edit = function (item) {
//            self.selectedItem(item);
//        };

//        self.cancel = function () {
//            self.selectedItem(null);
//        };

//        self.add = function () {
//            var newItem = new State();
//            self.list.push(newItem);
//            self.selectedItem(newItem);
//            self.moveToPage(self.maxPageIndex());
//        };
//        self.remove = function (item) {
//            if (item.id()) {
//                if (confirm('Are you sure you wish to delete this item?')) {
//                    $.post(self.deleteUrl, item).complete(function (result) {
//                        self.list.remove(item);
//                        if (self.pageIndex() > self.maxPageIndex()) {
//                            self.moveToPage(self.maxPageIndex());
//                        }
//                    });
//                }
//            }
//            else {
//                self.list.remove(item);
//                if (self.pageIndex() > self.maxPageIndex()) {
//                    self.moveToPage(self.maxPageIndex());
//                }
//            }
//        };
//        self.save = function () {
//            var item = self.selectedItem();
//            $.post(self.saveUrl, item, function (result) {
//                self.selectedItem().id(result);
//                self.selectedItem(null);
//            });

//        };
//        //self.Load = ko.observableArray();
       

//        self.templateToUse = function (item) {
//            return self.selectedItem() === item ? 'editTmpl' : 'itemsTmpl';
//        };

//        self.pagedList = ko.dependentObservable(function () {
//            var size = self.pageSize();
//            var start = self.pageIndex() * size;
//            return self.list.slice(start, start + size);
//        });
//        self.maxPageIndex = ko.dependentObservable(function () {
//            return Math.ceil(self.list().length / self.pageSize()) - 1;
//        });
//        self.previousPage = function () {
//            if (self.pageIndex() > 0) {
//                self.pageIndex(self.pageIndex() - 1);
//            }
//        };
//        self.nextPage = function () {
//            if (self.pageIndex() < self.maxPageIndex()) {
//                self.pageIndex(self.pageIndex() + 1);
//            }
//        };
//        self.allPages = ko.dependentObservable(function () {
//            var pages = [];
//            for (i = 0; i <= self.maxPageIndex() ; i++) {
//                pages.push({ pageNumber: (i + 1) });
//            }
//            return pages;
//        });
//        self.moveToPage = function (index) {
//            self.pageIndex(index);
//        };
//    };
//    function State2(id, name, Description) {
//        this.id = id;
//        this.name = name;
//        this.Description = Description;
//    }
//    function State(id, name, Description) {
//        this.id = ko.observable(id);
//        this.name = ko.observable(name);
//        this.Description = ko.observable(Description);
//    }
    
//    var initialData = [new State('WA', 'Washington', 'WA'), new State('AK', 'Alaska', 'AK')];
//    //ko.applyBindings();
//    //console.log(initialData);
//    return new ListViewModel();
//    //return  ListViewModel(initialData);


    

//    //#region Internal Methods
//    function activate() {
//        logger.log(title + ' View Activated', null, title, true);
//        return true;
//    }
//    //#endregion
//});























































////define(['services/logger'], function (logger) {
////    var title = 'CategoryVm';
////    //var ListViewModel = {
////    //    activate: activate,
////    //    title: title,
////    //    shouldShow: false
////    //};


////    var data = function () {


////    };
////    var ListViewModel = function (initialData) {
////        var self = this;
////        window.viewModel = self;
////        self.activate = activate;;
////        self.title = title;
////        self.shouldShow = ko.observableArray(false);




////        //var initialData = [];
////        //var onSuccess = function (data) {
////        //    //data will be your s object, in JSON format

////        //    //initialData = JSON.stringify(data);

////        //    for (var i = 0; i < data.length - 1; i++) {
////        //        var item = data[i];
////        //        console.log("ID:"+item.Id + "Name:"+item.Name +"Description:"+ item.Description);
////        //        initialData.push(State(item.Id, item.Name, item.Description));
////        //    }


////        //};
////        //$.ajax({
////        //    type: 'GET',
////        //    url: '/Category/GetCategories',
////        //    success: function (data) { onSuccess(data); }
////        //});


////        self.list = ko.observableArray(initialData);
////        console.log("sdfsdfffffffffffffa" + self.list());
////        self.pageSize = ko.observable(3);
////        self.pageIndex = ko.observable(0);
////        self.selectedItem = ko.observable();
////        self.saveUrl = '/Category/Save';
////        self.deleteUrl = '/api/state/delete';

////        self.edit = function (item) {
////            self.selectedItem(item);
////        };

////        self.cancel = function () {
////            self.selectedItem(null);
////        };

////        self.add = function () {
////            var newItem = new State();
////            self.list.push(newItem);
////            self.selectedItem(newItem);
////            self.moveToPage(self.maxPageIndex());
////        };
////        self.remove = function (item) {
////            if (item.id()) {
////                if (confirm('Are you sure you wish to delete this item?')) {
////                    $.post(self.deleteUrl, item).complete(function (result) {
////                        self.list.remove(item);
////                        if (self.pageIndex() > self.maxPageIndex()) {
////                            self.moveToPage(self.maxPageIndex());
////                        }
////                    });
////                }
////            }
////            else {
////                self.list.remove(item);
////                if (self.pageIndex() > self.maxPageIndex()) {
////                    self.moveToPage(self.maxPageIndex());
////                }
////            }
////        };
////        self.save = function () {
////            var item = self.selectedItem();
////            $.post(self.saveUrl, item, function (result) {
////                self.selectedItem().id(result);
////                self.selectedItem(null);
////            });

////        };
////        //self.Load = ko.observableArray();


////        self.templateToUse = function (item) {
////            return self.selectedItem() === item ? 'editTmpl' : 'itemsTmpl';
////        };

////        self.pagedList = ko.dependentObservable(function () {
////            var size = self.pageSize();
////            var start = self.pageIndex() * size;
////            return self.list.slice(start, start + size);
////        });
////        self.maxPageIndex = ko.dependentObservable(function () {
////            return Math.ceil(self.list().length / self.pageSize()) - 1;
////        });
////        self.previousPage = function () {
////            if (self.pageIndex() > 0) {
////                self.pageIndex(self.pageIndex() - 1);
////            }
////        };
////        self.nextPage = function () {
////            if (self.pageIndex() < self.maxPageIndex()) {
////                self.pageIndex(self.pageIndex() + 1);
////            }
////        };
////        self.allPages = ko.dependentObservable(function () {
////            var pages = [];
////            for (i = 0; i <= self.maxPageIndex() ; i++) {
////                pages.push({ pageNumber: (i + 1) });
////            }
////            return pages;
////        });
////        self.moveToPage = function (index) {
////            self.pageIndex(index);
////        };
////    };
////    function State2(id, name, Description) {
////        this.id = id;
////        this.name = name;
////        this.Description = Description;
////    }
////    function State(id, name, Description) {
////        this.id = ko.observable(id);
////        this.name = ko.observable(name);
////        this.Description = ko.observable(Description);
////    }

////    var initialData = [new State('WA', 'Washington', 'WA'), new State('AK', 'Alaska', 'AK')];
////    //ko.applyBindings();
////    //console.log(initialData);
////    return new ListViewModel(initialData);
////    //return  ListViewModel(initialData);




////    //#region Internal Methods
////    function activate() {
////        logger.log(title + ' View Activated', null, title, true);
////        return true;
////    }
////    //#endregion
////});