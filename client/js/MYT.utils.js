var MYT = MYT || {};

(function(){

    // Helpers
    // -----------------------------------------------------

    /**
     * Add class to element
     * 
     * @name addClass
     * @param {Node} elem - DOM element 
     * @param {String} name - Name of class 
     * @returns void - 
     * @method 
     * @author Ryan Regalado 
     */
    function addClass(elem, name) {
      var cName = elem.className + ' ' + name;
      elem.className = cName.trim(); // remove whitespace
    }

    /**
     * Remove class from element
     * 
     * @name removeClass
     * @param {Node} elem - DOM element 
     * @param {String} name - Name of class 
     * @returns void - Updates class name on element
     * @method 
     * @author Ryan Regalado 
     */
    function removeClass(elem, name) {
        var className = elem.className;
        var reg = new RegExp(name, 'g');
        className = className.replace(reg, '');
        elem.className = className.trim(); // remove whitespace
    }

    /**
     * Determines if elment has class
     * 
     * @name hasClass
     * @param {object} elem - DOM element
     * @param {string} name - name of class to check for
     * @returns {boolean} true|false if element has class name
     * @example 
     * MYT.utils.hasClass(document.querySelector('#btn'), 'btn-default'); // returns true
     * @method 
     * @memberof MYT.utils
     * @author Ryan Regalado 
     */
    function hasClass(elem, name) {
        var className = elem.className
            , reg = new RegExp(name, 'g')
        ;
        return className.match(reg) ? true : false;
    }

    /**
     * Sanitizes input by taking in options object of what is acceptable. Will
     * remove any HTML tags found in options list
     * 
     * @name sanitizeInput
     * @param {string} text - Sample HTML text to sanitize
     * @param {array} aRemoveList - list of html tags to strip. 
     *                          Default is: ['a','bold','li','p','span','ul']
     * @returns {type} result - 
     * @example 
     * MYT.utils.sanitizeInput('<p><span style="font-size: 10px;">Boom</span></p>', ['span']);
     * // returns '<p>boom</p>'
     * @method 
     * @author Ryan Regalado 
     */
    function sanitizeInput(text, aRemoveList) {
        var result;

        return result;
    }

    // api
    MYT.utils = {
          addClass: addClass
        , hasClass: hasClass 
        , removeClass: removeClass
        , sanitizeInput: sanitizeInput
    };

    return MYT.utils;

}());
