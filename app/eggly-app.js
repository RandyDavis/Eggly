angular.module('Eggly', [])
    .controller('MainCtrl', MainCtrl)

    function MainCtrl () {
    var vm = this;
    vm.currentCategory = null;

    // Define view model variables
    vm.cancelCreating = cancelCreating;
    vm.cancelEditing = cancelEditing;
    vm.createBookmark = createBookmark;
    vm.deleteBookmark = deleteBookmark;
    vm.isCurrentCategory = isCurrentCategory;
    vm.isSelectedBookmark = isSelectedBookmark;
    vm.resetCreateForm = resetCreateForm;
    vm.setCurrentCategory = setCurrentCategory;
    vm.setEditedBookmark = setEditedBookmark;
    vm.shouldShowCreating = shouldShowCreating;
    vm.shouldShowEditing = shouldShowEditing;
    vm.startCreating = startCreating;
    vm.startEditing = startEditing;
    vm.updateBookmark = updateBookmark;

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

    function setCurrentCategory (category) {
        vm.currentCategory = category;
        vm.cancelCreating();
        vm.cancelEditing();
    }

    function isCurrentCategory (category) {
        return vm.currentCategory !== null && category.name === vm.currentCategory.name;
    }

    //-------------------------------------------------------------------------------------------------
    // CREATING AND EDITING STATES
    //-------------------------------------------------------------------------------------------------
    vm.isCreating = false;
    vm.isEditing = false;

    function startCreating () {
        vm.isCreating = true;

        vm.isEditing = false;
        vm.resetCreateForm();

    }

    function cancelCreating () {
        vm.isCreating = false;
    }


    function startEditing () {
        vm.isCreating = false;
        vm.isEditing = true;
    }

    function cancelEditing () {
        vm.isEditing = false;
        vm.editedBookmark = null;
    }

    function shouldShowCreating () {
        return vm.currentCategory && !vm.isEditing;
    }

    function shouldShowEditing () {
        return vm.isEditing && !vm.isCreating;
    }

    //-------------------------------------------------------------------------------------------------
    // CRUD
    //-------------------------------------------------------------------------------------------------
    vm.editedBookmark = null;

    function resetCreateForm () {
        vm.newBookmark = {
            title: '',
            url: '',
            category: vm.currentCategory
        };
    }

    function createBookmark (bookmark) {
        bookmark.id = vm.bookmarks.length;
        bookmark.category = vm.currentCategory.name;
        vm.bookmarks.push(bookmark);

        vm.resetCreateForm();
    }

    function setEditedBookmark (bookmark) {
        vm.editedBookmark = angular.copy(bookmark);
    }

    function updateBookmark (bookmark) {
        var index = _.findIndex(vm.bookmarks, function(b) {
            return b.id == bookmark.id;
        });
        vm.bookmarks[index] = bookmark;
        vm.editedBookmark = null;
        vm.isEditing = false;
    }

    function isSelectedBookmark (bookmarkId) {
        return vm.editedBookmark !== null && vm.editedBookmark.id === bookmarkId;
    }

    function deleteBookmark (bookmark) {
        _.remove(vm.bookmarks, function(b) {
            return b.id == bookmark.id;
        });
    }


}
