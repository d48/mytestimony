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

    // api
    MYT.utils = {
          addClass: addClass
        , removeClass: removeClass
    };

    return MYT.utils;

}());
