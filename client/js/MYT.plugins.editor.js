var MYT = MYT || {}; // get namespace

MYT.plugins = MYT.plugins || {};

(function() {

    var editor;

    /**
     * disable mousedown on icon click
     * @param  {object} e window event object
     * @return {void}   disables default event on mousedown
     */
    function mouseDownIcon(e) {
        e = e || window.event;
        e.preventDefault();

    }

    /**
     * sets editor formatting  
     * @param  {object} e window event object
     * @return {void}   formats selected text in editor window
     */
    function clickIcon(e) {
        e = e || window.event; // IE doesn't pass in the event object

        var target = e.target || e.srcElement // IE targeting
            , cmd = ''
            ;

        switch( target.className ) {
          case 'icon-bold':
            cmd = 'bold';
            break;
          case 'icon-italic':
            cmd = 'italic';            
            break;
          case 'icon-underline':
            cmd = 'underline';            
            break;
          case 'icon-list':
            cmd = 'insertUnorderedList';
            break;
          case 'icon-numbered-list':
            cmd = 'insertOrderedList';
            break;


          default:
            break;
        } 

        document.execCommand(cmd, false, null); 

    }

    /**
     * Updates word count on object. 
     * 
     * @name wordCount
     * @param {Object} el - DOM element, a textarea field
     * @param {Object} targ - DOM element to update count figure
     * @returns {void} - Updates targ with count
     * @example 
     *    wordCount( window.event, document.getElementById('textFieldId') ); 
     * @method 
     * @author Ryan Regalado 
     */
    function wordCount(e, targ) {
      var count = 0
        , e = e || window.event
        , val = e.target.innerText
        , targ = targ || {} 
        ;

      count = val.match(/\S+/g).length;
      targ.innerHTML = count;
    }


    /**
     * initialize editor
     * 
     * @name initEditor
     * @returns void - Sets editor object
     * @method 
     * @author Ryan Regalado 
     */
    function initEditor() {
         editor = document.getElementById(MYT.attributes.editorBoxId);   
    }


    /**
     * setup event listeners
     * 
     * @name setupListeners
     * @returns void 
     * @method 
     * @author Ryan Regalado 
     */
    function setupListeners() {
        var d = window.document;

        d.getElementById(MYT.attributes.editorBarId).addEventListener('mousedown', mouseDownIcon, false);
        d.getElementById(MYT.attributes.editorBarId).addEventListener('click', clickIcon, false);

        d.getElementById(MYT.attributes.testimonyBoxId).addEventListener('keyup', function() {
          wordCount( window.event, document.getElementById('word-count') );
        }, false);
    }

    /**
     * Initiliaze plugin for editor
     * 
     * @name init
     * @returns void - sets up listeners
     * @example 
     * 
     * @method 
     * @author Ryan Regalado 
     */
    function init() {
        initEditor();
        setupListeners();
    }


    // api
    MYT.plugins.editor = {
      init: init
    }

    return MYT.plugins.editor;
})();
