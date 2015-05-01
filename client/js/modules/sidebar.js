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

    var d            = document
        , _utils     = MYT.utils
        , request    = MYT.request
        , reqBaseUrl = '/api/v1/'
        , tagCategoryId = '#tagSelector--tagCategory'
        ;

     /**
      * gets all testimonies via xhr call to api with tag set to value
      * 
      * @name _selectTag
      * @param {object} e - event object 
      * @returns {object} - JSON of testimonies with given tag
      * @property {string} tag - tag selected from drop down menu
      * @method 
      * @memberof MYT
      * @author Ryan Regalado 
      * @todo Update dom from selection
      */
     function _selectTag(e) {
         var event = e || window.event
             , tag = event.target.value
             , _isLatest = function() { return tag.toLowerCase()  === 'latest testimonies'; }
             , reqUrl = _isLatest() || tag === '' || typeof tag === 'undefined'
                ? reqUrl = reqBaseUrl + 'testimonies'
                : reqUrl = reqBaseUrl + 'tags/' + tag
         ;

         request.get(reqUrl)
             .success(function(data) {
                 document.querySelector(tagCategoryId).value = (tag === '') ? 'Latest Testimonies' : tag;
                 jade.render(document.querySelector('#main'), 'testimonies-block', {testimonies: data});
             });
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
        var el = d.getElementById('tagSelector--tagCategory');

        if (el) {
            el.addEventListener('change', _selectTag, false);
        }
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
    }


    return {
        init: init
    }

})();
