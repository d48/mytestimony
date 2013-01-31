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
     * Triggers tag function based specific keys entered
     * 
     * @name tagKeyChecker
     * @param {Object} e - Event object
     * @returns void - Triggers create tags method
     * @method 
     * @author Ryan Regalado 
     */
    function tagKeyChecker(e) {
      var key = e.keyCode;
      // comma character or enter key
      if(key === 188 || key === 13) {
        e.preventDefault();
        console.log('fire func');
        MYT.plugins.tags.create(MYT.tagsBoxId);
      }
    }


    /**
     * Kick of the app's lifecycle
     * 
     * @name init
     * @returns void - Sets up event listeners
     * @method 
     * @author Ryan Regalado 
     */
    function init(options) {
      var d              = window.document
        , closeId        = options.closeId      || ''
        , openId         = options.openId       || ''
        , submitId       = options.submitId     || ''
        , viewTesClass   = options.viewTesClass || ''
        , viewTesButtons = d.getElementsByClassName(viewTesClass)
        , viewLen = viewTesButtons.length
        , i = 0
        ;


      this.tagsBoxId      = options.tagsBoxId    || '';

      // Set up click handlers
      for(i;i < viewLen; i++) {
        viewTesButtons[i].addEventListener('click', viewTestimony, false);    
      }
      d.getElementById(closeId).addEventListener('click', closeForm, false);
      d.getElementById(openId).addEventListener('click', showForm, false);
      d.getElementById(this.tagsBoxId).addEventListener('keydown', tagKeyChecker, false);
    }

    // API
    MYT = {
        init: init
    };

    return MYT;

}());
