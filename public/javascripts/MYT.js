// @todo separate client side architecture into core/hub/modules
var MYT = MYT || {};  // defines MYT namespace

(function(){

  /**
   * Checks form for validation and submits if valid
   * 
   * @name submitTestimony
   * @param {Object} e - Event object
   * @returns {type} MYT - 
   * @method 
   * @author Ryan Regalado 
   */
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

      // @todo specify field validation type
      // example: notEmpty, noSpecialChars, onlyDigits, onlyLetters
      if(el.value === '') {
        // record which fields have errors and display to user
        utils.addClass(el.parentElement, 'error'); 
        errors.push(field);
      } else {
        utils.removeClass(el.parentElement, 'error'); 
        // remove field from error object
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
   * @todo move all tag related items to plugin
   */
  function tagKeyChecker(e) {
    e = e || window.event; // IE doesn't pass in the event object
    var key = e.keyCode;

    switch(key) {
      case 13: // enter key
        e.preventDefault();
        e.target.value += ','; // adds comma if press enter
      case 188: // comma
        MYT.plugins.tags.create(MYT.attributes.tagsInputId);
      default:
        break;
    }
  }


  /**
   * event handler for removing tag from tag box
   * 
   * @param {Object} e - event object
   * @returns void - removes element from tags box
   * @author Ryan Regalado 
   * @todo move all tag related items to plugin
   */
  function tagRemover(e) {
      e = e || window.event; // IE doesn't pass in the event object

      var target = e.target || e.srcElement // IE targeting
          , tag
          ; 

      switch(target.className) {
          case 'x':
              tag = target.parentNode.children[1].innerHTML; 
              MYT.plugins.tags.remove(MYT.attributes.tagsInputId, MYT.attributes.tagsBoxId, tag);
              break;
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
    // @todo figure out why I set up an attributes object
    this.attributes = {};
    this.attributes.formId    = options.formId    || '';
    this.attributes.tagsInputId = options.tagsInputId || '';
    this.attributes.tagsBoxId = options.tagsBoxId || '';

    // Set up click handlers
    for(i;i < viewLen; i++) {
      viewTesButtons[i].addEventListener('click', viewTestimony, false);    
    }
    d.getElementById(closeId).addEventListener('click', closeForm, false);
    d.getElementById(openId).addEventListener('click', showForm, false);
    d.getElementById(submitId).addEventListener('click', submitTestimony, false);
    d.getElementById(this.attributes.tagsInputId).addEventListener('keydown', tagKeyChecker, false);
    d.getElementById(this.attributes.tagsBoxId).addEventListener('click', tagRemover, false);
  }

  // API
  MYT = {
    init: init
  };

  return MYT;

}());
