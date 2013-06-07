var MYT = MYT || {}; // get namespace

MYT.plugins = MYT.plugins || {};

(function() {


        function clickIcon(e) {
        e = e || window.event; // IE doesn't pass in the event object

        var target = e.target || e.srcElement; // IE targeting

        switch( target.className ) {
          case 'icon-bold':
            console.log('bold');
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


    function init() {
        // set up event listeners
        var d = window.document;
        d.getElementById(MYT.attributes.editorId).addEventListener('click', clickIcon, false);
    }


    // api
    MYT.plugins.editor = {
      init: init
    }

    return MYT.plugins.editor;
})();
