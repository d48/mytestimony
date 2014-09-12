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

    // api
    MYT.utils = {
          addClass: addClass
        , hasClass: hasClass 
        , removeClass: removeClass
    };

    return MYT.utils;

}());
