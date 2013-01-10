// @todo: separate client side architecture into core/hub/modules
var MYT = MYT || {};  // defines MYT namespace

(function(){
    var formId = 'testimony-form'; // set up locals

    /**
     * Click handler for viewing testimony page
     * 
     * @name viewTestimony
     * @param {Object} e - Event object 
     * @returns void - Call route
     * @method 
     * @author Ryan Regalado 
     */
    function viewTestimony(e) {
        e.preventDefault();

        var btnId  = e.currentTarget.getAttribute('id')
            , location = window.location
            , origin = location.origin
            ;

        window.location.href = origin + '/testimonies/' + btnId;
    }

    /**
     * Close testimony form that opens from 'Start' button
     * 
     * @name closeForm
     * @param {Object} e - Event object
     * @returns void - Hides the testimony form
     * @method 
     * @author Ryan Regalado 
     */
    function closeForm(e) {
        e.preventDefault();
        MYT.utils.addClass(document.getElementById(formId), 'close');
        MYT.utils.removeClass(document.getElementById(formId), 'open');
    }

    /**
     * Displays testimony form
     * 
     * @name showForm
     * @param {Object} e - Event object
     * @returns void - Shows form 
     * @method 
     * @author Ryan Regalado 
     */
    function showForm(e) {
        e.preventDefault();
        MYT.utils.addClass(document.getElementById(formId), 'open');
        MYT.utils.removeClass(document.getElementById(formId), 'close');
    }

    // API
    MYT = {
        btnViewTestimony: viewTestimony
        , btnCloseForm: closeForm
        , btnShowForm: showForm
    };

    return MYT;

}());
