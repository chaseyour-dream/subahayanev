(function($) {
    $(document).ready(function() {
        var categoryField = $('#id_category');
        var customCategoryField = $('#id_custom_category');
        var customCategoryRow = customCategoryField.closest('.form-row');
        
        function toggleCustomCategory() {
            if (categoryField.val() === 'other') {
                customCategoryRow.show();
                customCategoryField.prop('required', true);
            } else {
                customCategoryRow.hide();
                customCategoryField.prop('required', false);
                customCategoryField.val('');
            }
        }
        
        // Initial state
        toggleCustomCategory();
        
        // On change
        categoryField.change(toggleCustomCategory);
    });
})(django.jQuery);
