// @todo separate client side architecture into core/hub/modules
var MYT = MYT || {};  // defines MYT namespace

(function(){

    var Form = {
        init: function() {
            console.log('initing');
        }
    };

  /**
   * Checks form for validation and submits if valid
   * 
   * @name submitTestimony
   * @param {Object} e - Event object
   * @returns {void} - Submits form to API
   * @method 
   * @author Ryan Regalado 
   */
  function submitTestimony(e) {
    e = e || window.event; // IE doesn't pass in the event object
    e.preventDefault();

    // validate form
    var checkFields = {} 
      , errors = []
      , fields = [
          MYT.attributes.testimonyBoxId
        , MYT.attributes.titleId
        ]
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
      if((el.nodeName === 'INPUT' && el.value === '')
         || (el.nodeName === 'DIV' && 
            (el.innerHTML === '' || el.innerHTML === '<br>'))) {
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
      // @todo submit to api via ajax. only close window if no errors
      // special field for testimony editor
      var elEditor = document.getElementById(MYT.attributes.testimonyBoxId)
          , elHiddenEditor = document.getElementById(MYT.attributes.hiddenTestimonyBoxId)
          ;
      
      elHiddenEditor.value = elEditor.innerHTML;

      document.forms[MYT.attributes.formId].submit();
    }
    
  }


  /**
   * Delegate event handler to process button clicks
   * 
   * @name testimoniesClick
   * @param {Object} e - event object
   * @returns void - opens testimony detail page
   * @method 
   * @author Ryan Regalado 
   */
  function testimoniesClick(e) {
    e = e || window.event; // IE doesn't pass in the event object
    e.preventDefault();

    if (e.target.nodeName !== "BUTTON") {
      return false;
    }

    var btnId    = e.target.getAttribute('id')
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
    MYT.utils.addClass(document.getElementById(MYT.attributes.formContainerId), 'close');
    MYT.utils.removeClass(document.getElementById(MYT.attributes.formContainerId), 'open');
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
    var e = e || window.event // IE doesn't pass in the event object
      , formContainer = document.getElementById(MYT.attributes.formContainerId) 
      ;
    e.preventDefault();
    MYT.utils.addClass( formContainer, 'open' );
    MYT.utils.removeClass( formContainer, 'close' );
    formContainer.style.height = document.body.scrollHeight + 'px'; // set height
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
    var options = options || {};
    
    var d              = window.document
      , closeId        = options.closeId       || ''
      , openId         = options.openId        || ''
      , submitId       = options.submitId      || ''
      , tagsTemplate   = options.tagsTemplate  || ''
      , viewTesClass   = options.viewTesClass  || ''
      , testimoniesId  = options.testimoniesId || ''
      , testimonies    = d.getElementById(testimoniesId)
      , viewTesButtons = d.getElementsByClassName(viewTesClass)
      , viewLen        = viewTesButtons.length
      , i              = 0
      ;

    // set up obj attributes to call from functions within the application
    this.attributes = {};
    this.attributes.editorBarId          = options.editorBarId          || '';
    this.attributes.editorBoxId          = options.editorBoxId          || '';
    this.attributes.formId               = options.formId               || '';
    this.attributes.formContainerId      = options.formContainerId      || '';
    this.attributes.hiddenTestimonyBoxId = options.hiddenTestimonyBoxId || '';
    this.attributes.submitId             = options.formContainerId      || '';
    this.attributes.tagSingleContainerId = options.tagSingleContainerId || '';
    this.attributes.tagSingleId          = options.tagSingleId          || '';
    this.attributes.tagsInputId          = options.tagsInputId          || '';
    this.attributes.tagsBoxId            = options.tagsBoxId            || '';
    this.attributes.tagsTemplate         = options.tagsTemplate         || '';
    this.attributes.testimonyBoxId       = options.testimonyBoxId       || '';
    this.attributes.titleId              = options.titleId              || '';

    // Set up click handlers
    if (testimonies) {
      testimonies.addEventListener('click', testimoniesClick, false);
    }

    // @todo separate into its own module
    d.getElementById(closeId).addEventListener('click', closeForm, false);
    d.getElementById(openId).addEventListener('click', showForm, false);
    d.getElementById(submitId).addEventListener('click', submitTestimony, false);

    MYT.plugins.editor.init();
    MYT.plugins.tags.init();
  }

  // API
  MYT = {
    init: init,
    Form: Form
  };

  return MYT;

}());

// for node require and testing
var module = module || {};
module.exports = MYT;
