var MYT = MYT || {};
MYT.modules = MYT.modules || {};

/**
 * Sidebar module and methods
 * 
 * @name MYT.modules.sidebar
 * @returns {object} Sidebar - MYT.modules.sidebar module
 * @method 
 * @memberof MYT.modules.sidebar
 * @author Ryan Regalado 
 */
MYT.modules.sidebar = MYT.modules.sidebar || (function() {

    var elTagsDropDown
        , d = document
        ;


     function _selectTag(e) {
          console.log('selection has been made', e.target.value);
     }

    /**
     * Creates DOM listeners for: 
     *    keyup event in closing form
     * 
     * @name _createFormListeners
     * @returns void -  sets up DOM listeners
     * @method 
     * @memberof MYT.modules.sidebar
     * @author Ryan Regalado 
     */
    function _createFormListeners() {
        d.body.addEventListener('keyup', _keyListener, false);
    }


     /**
     * Removes DOM listeners for: 
     *    keyup event in closing form
     * 
     * @name _removeFormListeners
     * @returns void -  removes up DOM listeners
     * @method 
     * @memberof MYT.modules.sidebar
     * @author Ryan Regalado 
     */
     function _removeFormListeners() {
        d.body.removeEventListener('keyup', _keyListener, false);
     }
     
     /**
     * key checking: 
     *    closes form
     * 
     * @name _keyListener
     * @param {object} e - Window event object
     * @returns void - checks for escape: keyCode = 27
     * @method 
     * @memberof MYT.modules.sidebar
     * @author Ryan Regalado 
     */
     function _keyListener(e) {
         var e = e || window.event
             , keyCode = e.keyCode
             ;

         switch(keyCode) {
             case 27:
                 closeForm();
                 break;
             default: 
                 break;
         }
     }


     /**
     * Close testimony form that opens from 'Start' button
     * 
     * @name closeForm
     * @param {Object} e - Event object
     * @returns void - Hides the testimony form
     * @method 
     * @memberof MYT.modules.sidebar
     * @author Ryan Regalado 
     */
     function closeForm(e) {
         e = e || window.event; // IE doesn't pass in the event object
         e.preventDefault();
         MYT.utils.addClass(d.getElementById(MYT.attributes.formContainerId), 'close');
         MYT.utils.removeClass(d.getElementById(MYT.attributes.formContainerId), 'open');
         _removeFormListeners();
     }

     /**
     * Checks form for validation and submits if valid
     * 
     * @name submitTestimony
     * @param {Object} e - Event object
     * @returns {void} - Submits form to API
     * @method 
     * @memberof MYT.modules.sidebar
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
                 , el = d.getElementById(field)
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
             var elEditor = d.getElementById(MYT.attributes.testimonyBoxId)
                 , elHiddenEditor = d.getElementById(MYT.attributes.hiddenTestimonyBoxId)
                 ;

             elHiddenEditor.value = elEditor.innerHTML;

             d.forms[MYT.attributes.formId].submit();
         }

     }
     
     
     
     
     /**
     * Displays testimony form
     * 
     * @name showForm
     * @param {Object} e - Event object
     * @returns void - Shows form 
     * @method 
     * @memberof MYT.modules.sidebar
     * @author Ryan Regalado 
     */
     function showForm(e) {
         var e = e || window.event // IE doesn't pass in the event object
             , formContainer = d.getElementById(MYT.attributes.formContainerId) 
             ;

         e.preventDefault();
         MYT.utils.addClass( formContainer, 'open' );
         MYT.utils.removeClass( formContainer, 'close' );
         formContainer.style.height = d.body.scrollHeight + 'px'; // set height
         _createFormListeners();
     }
     



    /**
     * Creates events listeners for elements
     * 
     * @name _createListeners
     * @param {object} el - DOM elements to create listeners for
     * @returns {void} - creates event listeners
     * @property {type} varName - description
     * @method 
     * @memberof MYT.modules.sidebar
     * @author Ryan Regalado 
     */
    function _createListeners() {
        d.getElementById('tagSelector--tagCategory').addEventListener('change', _selectTag, false);
        d.getElementById('close').addEventListener('click', closeForm, false);
        d.getElementById('start').addEventListener('click', showForm, false);
        d.getElementById('submit-button').addEventListener('click', submitTestimony, false);
    }


    /**
     * kickoff module lifecycle
     * 
     * @name init
     * @returns {void} - creates listeners
     * @method 
     * @memberof MYT.modules.sidebar
     * @author Ryan Regalado 
     */
    function init() {
        _createListeners(); 

        // kick off editor and tag box
        MYT.plugins.editor.init();
        MYT.plugins.tags.init();
    }


    return {
        init: init
    }

})();
