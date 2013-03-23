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
     * Create tags from input field
     * 
     * @name create
     * @param {String} elementId - String for input element
     * @returns void - Creates tags
     * @method 
     * @author Ryan Regalado 
     */
    function create(elementId) {
        var el = document.getElementById(elementId)  // get element
            , val = el.value  // get element
            , pattern = /(\s+)*,(\s+)*/g  // strip white space around commas
            , tags = val.replace(pattern, ',')
            ;

        tags = tags.split(',');
        el.value = tags;
     }

    /**
     * Removes tag from output box by modifying input box
     * 
     * @param {String} inputId - tag input
     * @param {String} boxId - tag output box
     * @param {String} tag - actual tag to remove
     * @return void - updates both tag input and output box
     * @author Ryan Regalado 
     */
    function remove(inputId, boxId, tag) {
        var el = document.getElementById(inputId)  // get element
            , val = el.value
            , pattern = /(\s+)*,(\s+)*/g  // strip white space around commas
            , tags = val.replace(pattern, ',')
            , indexToRemove 
            ;

        tags = tags.split(',');
        tags = tags.filter(isEmpty); // remove empty slots

        indexToRemove = tags.indexOf(tag);
        tags.splice(indexToRemove, 1); // remove 1 item at position

        el.value = tags;
        this.create(inputId);
    }

    // adds tag to tagbox
    function add(kw) {
      console.log('adding ' + kw);

      // append to hidden input with appropriate commas
      var tags = document.getElementById(MYT.attributes.tagsInputId)
        , tagsVal = tags.value;

      tags.value = (tagsVal === '') ? kw : tagsVal + ',' + kw;

      // add to tagbox using tags.template
      // @todo create utility for getting DOM element via id/class selector
      var tag = MYT.plugins.tags.template({tags: [kw]})
          , tagBox = document.getElementById(MYT.attributes.tagsBoxId)
          , tagBoxUl = tagBox.firstElementChild
          , newLi = document.createElement('li')
          , tagSingle = document.getElementById(MYT.attributes.tagSingleId)
          ;

      newLi.innerHTML = tag;
      tagBoxUl.appendChild(newLi);
      tagSingle.value = ''; // clear out value for next 
    }

    // sets up tagbox and event listeners
    function init() {
        // set up event listeners
        var d = window.document;
        d.getElementById(MYT.attributes.tagSingleId).addEventListener('keydown', addHandler, false);
        d.getElementById(MYT.attributes.tagsBoxId).addEventListener('click', removeHandler, false);

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
