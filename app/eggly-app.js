angular.module('Eggly', [])
    .controller('MainCtrl', MainCtrl)

    function MainCtrl () {
        var vm = this;
        vm.currentCategory = null;

        //-------------------------------------------------------------------------------------------------
        // DATA
        //-------------------------------------------------------------------------------------------------
        vm.categories = [
            {"id": 0, "name": "Development"},
            {"id": 1, "name": "Design"},
            {"id": 2, "name": "Exercise"},
            {"id": 3, "name": "Humor"}
        ];

        vm.bookmarks = [
            {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
            {"id": 1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
            {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
            {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
            {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
            {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
            {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
            {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
            {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
        ];

        vm.setCurrentCategory = function (category) {
            vm.currentCategory = category;
            vm.cancelCreating();
            vm.cancelEditing();
        };
        vm.isCurrentCategory = function (category) {
            return vm.currentCategory !== null && category.name === vm.currentCategory.name;
        };

        //-------------------------------------------------------------------------------------------------
        // CREATING AND EDITING STATES
        //-------------------------------------------------------------------------------------------------
        vm.isCreating = false;
        vm.isEditing = false;

        vm.startCreating = function () {
            vm.isCreating = true;
            vm.isEditing = false;

            vm.resetCreateForm();
        };

        vm.cancelCreating = function () {
            vm.isCreating = false;
        };

        vm.startEditing = function () {
            vm.isCreating = false;
            vm.isEditing = true;
        };


        vm.cancelEditing = function () {
            vm.isEditing = false;
            vm.editedBookmark = null;
        };

        vm.shouldShowCreating = function () {
            return vm.currentCategory && !vm.isEditing;
        };

        vm.shouldShowEditing = function () {
            return vm.isEditing && !vm.isCreating;
        };

        //-------------------------------------------------------------------------------------------------
        // CRUD
        //-------------------------------------------------------------------------------------------------
        vm.editedBookmark = null;

        vm.resetCreateForm = function () {
            vm.newBookmark = {
                title: '',
                url: '',
                category: vm.currentCategory
            };
        };

        vm.createBookmark = function (bookmark) {
            bookmark.id = vm.bookmarks.length;
            bookmark.category = vm.currentCategory.name;
            vm.bookmarks.push(bookmark);

            vm.resetCreateForm();
        };

        vm.setEditedBookmark = function (bookmark) {
            vm.editedBookmark = angular.copy(bookmark);
        };

        vm.updateBookmark = function (bookmark) {
            var index = _.findIndex(vm.bookmarks, function(b) {
                return b.id == bookmark.id;
            });
            vm.bookmarks[index] = bookmark;
            vm.editedBookmark = null;
            vm.isEditing = false;
        };

        vm.isSelectedBookmark = function(bookmarkId) {
            return vm.editedBookmark !== null && vm.editedBookmark.id === bookmarkId;
        };

        vm.deleteBookmark = function (bookmark) {
            _.remove(vm.bookmarks, function(b) {
                return b.id == bookmark.id;
            })
        };
    };