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
   * @todo Don't allow user to enter multiple commas. Think of how to just check
   *       for last entered value and if , or '' then don't do anything
   */
  function create(elementId) {
    var el = document.getElementById(elementId)  // get element
      , val = el.value  // get element
      , pattern = /(\s+)*,(\s+)*/g  // strip white space around commas
      , tags = val.replace(pattern, ',')
      , tags = tags.split(',')
      ;

    el.value = val + ',';

    function isEmpty(el, index, array) {
      return (el !== '');
    }

    tags = tags.filter(isEmpty);

    console.log('creating tags', tags);

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

  // api
  MYT.plugins.tags = {
    create: create 
  }

  return MYT.plugins.tags;
})();
