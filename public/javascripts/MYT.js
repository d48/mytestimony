// @todo separate client side architecture into core/hub/modules
var MYT = MYT || {};  // defines MYT namespace

(function(){

  function submitTestimony(e) {
    e = e || window.event; // IE doesn't pass in the event object
    e.preventDefault();

    // validate form
    var checkFields = {}
      , errors = []
      , fields = ['testimony', 'title']
      , i = 0
      , utils = MYT.utils
      ;

    var fieldsLen = fields.length;
    for(i; i < fieldsLen; i++) {
      var field = fields[i]
        , el = document.getElementById(field)
        ;

      if(el.value === '') {
        utils.addClass(el, 'error'); 
        errors.push(field);
      } else {
        utils.removeClass(el, 'error'); 
        if(errors.indexOf(field) !== -1){
          errors.splice(errors.indexOf(field),1);
        }
      }
    }

    // submit form if no errors
    if(!errors.length) {
      console.log('submitted');
    }
    
  }

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
    e = e || window.event; // IE doesn't pass in the event object
    e.preventDefault();

    var btnId    = e.currentTarget.getAttribute('id')
      , location = window.location
      , origin   = location.origin
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
    e = e || window.event; // IE doesn't pass in the event object
    e.preventDefault();
    MYT.utils.addClass(document.getElementById(MYT.attributes.formId), 'close');
    MYT.utils.removeClass(document.getElementById(MYT.attributes.formId), 'open');
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
    e = e || window.event; // IE doesn't pass in the event object
    e.preventDefault();
    MYT.utils.addClass(document.getElementById(MYT.attributes.formId), 'open');
    MYT.utils.removeClass(document.getElementById(MYT.attributes.formId), 'close');
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
    e = e || window.event; // IE doesn't pass in the event object
    var key = e.keyCode;

    switch(key) {
      case 13: // enter key
        e.preventDefault();
      case 188: // comma
        MYT.plugins.tags.create(MYT.attributes.tagsBoxId);
      default:
        break;
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
      , viewLen        = viewTesButtons.length
      , i              = 0
      ;

    // set up obj attributes
    this.attributes = {};
    this.attributes.formId    = options.formId    || '';
    this.attributes.tagsBoxId = options.tagsBoxId || '';

    // Set up click handlers
    for(i;i < viewLen; i++) {
      viewTesButtons[i].addEventListener('click', viewTestimony, false);    
    }
    d.getElementById(closeId).addEventListener('click', closeForm, false);
    d.getElementById(openId).addEventListener('click', showForm, false);
    d.getElementById(submitId).addEventListener('click', submitTestimony, false);
    d.getElementById(this.attributes.tagsBoxId).addEventListener('keydown', tagKeyChecker, false);
  }

  // API
  MYT = {
    init: init
  };

  return MYT;

}());
