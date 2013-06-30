var MYT = MYT || {}; // get namespace

MYT.plugins = MYT.plugins || {};

(function() {


        function clickIcon(e) {
        e = e || window.event; // IE doesn't pass in the event object

        var target = e.target || e.srcElement; // IE targeting

        // @todo clicking on icon taking focus away on highlighted textbox
        // look into cancelling off-focus or check if button click keeps focus on div textarea
        switch( target.className ) {
          case 'icon-bold':
            document.execCommand ('bold', false, null);
            break;
          case 'icon-italic':
            console.log('italic');
            break;
          case 'icon-underline':
            console.log('underline');
            break;
          case 'icon-strikethrough':
            console.log('strikethrough');
            break;
          default:
            console.log('editor bar');
            break;
        } 
    }

    function initEditor() {
        var editor = document.getElementById(MYT.attributes.editorBoxId);     
    }

    function init() {
        // set up event listeners
        var d = window.document;

        // set up editor
        initEditor();

        // listeners
        d.getElementById(MYT.attributes.editorBarId).addEventListener('click', clickIcon, false);
    }


    // api
    MYT.plugins.editor = {
      init: init
    }

    return MYT.plugins.editor;
})();
