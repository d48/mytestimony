module.exports = {
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
}
