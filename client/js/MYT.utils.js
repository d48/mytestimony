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
     * @returns {string} result - sanitized HTML removing any extraneous tags
     * @example 
     * MYT.utils.sanitizeInput('<p><span style="font-size: 10px;">Boom</span></p>', ['span']);
     * // returns '<p>boom</p>'
     * @memberof MYT.utils
     * @method 
     * @author Ryan Regalado 
     */
    function sanitizeInput(text, aRemoveList) {
        var result;

        return result;
    }


    /**
     * Checks if object is defined
     * 
     * @name isDefined
     * @param {*} obj - any native type
     * @returns {boolean} - true|false 
     * @example 
     * isDefined('hello'); // returns true 
     * @method 
     * @memberof MYT.utils
     * @author Ryan Regalado 
     */
    function isDefined(obj) {
        return (typeof obj !== 'undefined') ? true : false;
    }

    /**
     * Prepends one DOM element before another
     * 
     * @name append
     * @param {object} el - DOM element
     * @param {object} elBefore - DOM element
     * @returns {void} - appends element to the DOM
     * @example 
     * MYT.utils(document.getElementById('someid'), document.getElementById('anotherid')); 
     * // appends 'someid' right before 'anotherid'
     * @method 
     * @memberof MYT.utils
     * @author Ryan Regalado 
     * @todo complete method with insert command
     */
    function append(el, elBefore) {
        if (!isDefined(el)) {
            return; 
        } else {
            if (!isDefined(elBefore)) {
                return;
            }
        }
        console.log('appending to the tree');
    }

    // api
    MYT.utils = {
          addClass: addClass
        , append: append
        , hasClass: hasClass 
        , isDefined: isDefined 
        , removeClass: removeClass
        , sanitizeInput: sanitizeInput
    };

    return MYT.utils;

}());
