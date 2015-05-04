var Helpers = {
  /**
   * compare function for sort. Ignores string casing
   * 
   * @param a $a 
   * @param b $b 
   * @return {int}  number to determine placing of each key in the array 
   */
  compare: function(a, b) {
    if(a.toLowerCase() < b.toLowerCase())
      return -1
    if(a.toLowerCase() > b.toLowerCase())
      return 1
    return 0;
  }

    /**
     * Strips html tags and leaves text
     * @name replaceTags
     * @param {string} xStr - string to transform
     * @returns {string} xStr - modified string
     * @method 
     * @author Ryan Regalado 
     */
    , replaceTags: function(xStr){
        var regExp = /<\/?[^>]+>/gi;
        return xStr.replace(regExp,"");
    }

    /**
     * Truncates number of words for html/text passed in
     * @name truncateWords
     * @param {string} html - string of HTML text
     * @param {number} numWords - number of words to truncate by
     * @returns {string} htmlStripped - modified html text truncated with ellipses 
     * @example 
     * 
     * @method 
     * @author Ryan Regalado 
     */
    , truncateWords: function(html, numWords) {
        var htmlStripped = Helpers.replaceTags(html);
        return htmlStripped.split(/\s/).slice(0, numWords).join(" ") + "...";
    }
};

 module.exports = Helpers;
