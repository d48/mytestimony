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

    /**
     * Kick of the app's lifecycle
     * 
     * @name init
     * @returns void - Sets up event listeners
     * @method 
     * @author Ryan Regalado 
     */
    function init() {
      // var setup
      var d              = window.document
        , closeId      = 'close'
        , openId       = 'start'
        , viewTesClass = 'view-testimony'
        , viewTesButtons = d.getElementsByClassName(viewTesClass)
        , viewLen = viewTesButtons.length
        , i = 0
        ;

      // Set up click handlers
      for(i;i < viewLen; i++) {
        viewTesButtons[i].addEventListener('click', viewTestimony, false);    
      }
      d.getElementById(closeId).addEventListener('click', closeForm, false);
      d.getElementById(openId).addEventListener('click', showForm, false);
    }

    // API
    MYT = {
        init: init
    };

    return MYT;

}());
