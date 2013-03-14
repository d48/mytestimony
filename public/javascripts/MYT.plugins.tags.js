var MYT = MYT || {}; // get namespace

MYT.plugins = MYT.plugins || {};

(function() {

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

        // @todo prevent user from entering blank input
        tags = tags.filter(isEmpty);

        // update div below field, iterating through array to build output
        var templateId = 'tags-template'
            , tagTemplate = document.getElementById(templateId).innerHTML
            , template = doT.template(tagTemplate)
            , output = template({"tags": tags})
            ;

        // insert into DOM
        var tagsId = 'tagbox';
        document.getElementById(tagsId).innerHTML = output;
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


    // api
    MYT.plugins.tags = {
          create: create 
        , remove: remove    
    }

    return MYT.plugins.tags;
})();
