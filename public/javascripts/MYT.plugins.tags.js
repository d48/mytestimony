var MYT = MYT || {}; // get namespace

MYT.plugins = MYT.plugins || {};

(function() {


    /**
     * Triggers tag function based specific keys entered
     * 
     * @name tagKeyChecker
     * @param {Object} e - Event object
     * @returns void - Triggers create tags method
     * @method 
     * @author Ryan Regalado 
     */
    function addHandler(e) {
        e = e || window.event; // IE doesn't pass in the event object

        var val = e.target.value
            , key = e.keyCode
            ;

        switch(key) {
            case 13: // enter key
                e.preventDefault();
            case 188: // comma
                e.preventDefault();
                MYT.plugins.tags.add(val);
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
     */
    function removeHandler(e) {
        e = e || window.event; // IE doesn't pass in the event object

        var target = e.target || e.srcElement // IE targeting
            , attribs = MYT.attributes
            , tag
            , node
            ; 

        document.getElementById('tag-single').focus();

        switch(target.className) {
            case 'x':
                // @todo create DOM traversal lib
                node = target.parentNode
                tag = node.children[1].innerHTML; 
                MYT.plugins.tags.remove( attribs.tagsInputId, node, tag );
                break;
            default:
                break;
        }

    }

    /**
     * Removes tag from output box and hidden field
     * 
     * @param {String} inputId - tag input
     * @param {String} node - element to remove from DOM
     * @param {String} tag - actual tag to remove
     * @return void - updates both tag input and output box
     * @author Ryan Regalado 
     */
    function remove(inputId, node, tag) {
        var hiddenTags = document.getElementById(inputId)  // get element
            , val = hiddenTags.value
            , indexToRemove 
            , tags
            ;

        tags = val.split(','); // split into array
        indexToRemove = tags.indexOf(tag); // search for index of tag to remove if exists

        // remove if found
        if(indexToRemove > -1) {
          var el = tags.splice(indexToRemove, 1);
          hiddenTags.value = tags.length !== 0 ? tags : ''; // removes from hidden input
          if ( el ) node.remove(); // remove from output box
        }
    }



    /**
     * Used for array filtering. Provides condition statment to check against
     * 
     * @param el 
     * @param index 
     * @param array 
     * @access public
     * @returns {Boolean} true|false - condition for filter to check against
     */
    function isEmpty(el, index, array) {
        return (el !== '');
    }


    /**
     * adds tag to tagbox styled with x for close. 
     * Also adds to hidden input field that will be passed to server
     * 
     * @name add
     * @param {String} kw - keyword from input field
     * @returns void - adds tag to bog styled with x button. 
     * @author Ryan Regalado 
     * @todo check for only alpha characters
     */
    function add(kw) {
      if (kw.trim() === '') {
        return;
      }
      
      // check for valid input, alphanumeric with spaces only
      // @todo uni tests needed to thoroughly check throught this
      var valid = /^[a-zA-Z0-9\s]+$/;

      // @todo throw red error and/or show hint that invalid and can not add
      // @todo setup plugin architecture to pull in from 3rd party lib
      //    https://github.com/chinchang/hint.css
      if(!valid.test(kw)) {
        return false;
      }

      // append to hidden input with appropriate commas
      var tags = document.getElementById(MYT.attributes.tagsInputId)
        , tagsVal = tags.value;

      tags.value = (tagsVal === '') ? kw : tagsVal + ',' + kw;

      // add to tagbox using tags.template
      // @todo create utility for getting DOM element via id/class selector
      var tag         = MYT.plugins.tags.template({tags: [kw]})
          , tagBox    = document.getElementById(MYT.attributes.tagsBoxId)
          , tagBoxUl  = tagBox.firstElementChild
          , newLi     = document.createElement('li')
          , tagSingle = document.getElementById(MYT.attributes.tagSingleContainerId)
          ;

      newLi.innerHTML = tag;
      tagBoxUl.insertBefore(newLi,tagSingle);
      tagSingle.firstElementChild.value = ''; // clear out value for next 
    }

    // sets up tagbox and event listeners
    function init() {
        // set up event listeners
        var d = window.document;
        d.getElementById(MYT.attributes.tagSingleId).addEventListener('keydown', addHandler, false);
        d.getElementById(MYT.attributes.tagsBoxId).addEventListener('click', removeHandler, false);
        // debug. remove default until ready to work on
        d.getElementById('preview').onclick = function() {return false;};

        // cache tagbox template
        var templateId = MYT.attributes.tagsTemplate
            , tagTemplate = document.getElementById(templateId).innerHTML
            , template = doT.template(tagTemplate)
            ;

        MYT.plugins.tags.template = template;
    }


    // api
    MYT.plugins.tags = {
          add: add
        , init: init
        , remove: remove    
    }

    return MYT.plugins.tags;
})();
