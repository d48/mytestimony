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
            // document.execCommand('bold', false, null); 
            cmd = 'bold';
            break;
          case 'icon-italic':
            cmd = 'italic';            
            break;
          case 'icon-underline':
            cmd = 'underline';            
            break;
          case 'icon-strikethrough':
            cmd = 'strikethrough';
            break;
          default:
            console.log('editor bar');
            break;
        } 

        document.execCommand(cmd, false, null); 

    }

    function initEditor() {
         editor = document.getElementById(MYT.attributes.editorBoxId);   
    }

    function init() {
        // set up event listeners
        var d = window.document;

        // set up editor
        initEditor();

        // listeners
        d.getElementById(MYT.attributes.editorBarId).addEventListener('mousedown', mouseDownIcon, false);
        d.getElementById(MYT.attributes.editorBarId).addEventListener('click', clickIcon, false);
    }


    // api
    MYT.plugins.editor = {
      init: init
    }

    return MYT.plugins.editor;
})();
