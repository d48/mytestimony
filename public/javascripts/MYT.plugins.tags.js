var MYT = MYT || {}; // get namespace

MYT.plugins = MYT.plugins || {};

(function() {

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
    var val = document.getElementById(elementId).value  // get element
      , pattern = /(\s+)*,(\s+)*/g  // strip white space around commas
      , tags = val.replace(pattern, ',')
      ;

    // update div below field, iterating through array and displaying

    console.log('creating tags', tags);
  }

  // api
  MYT.plugins.tags = {
    create: create 
  }

  return MYT.plugins.tags;
})();
