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
      , tags = tags.split(',')
      ;

    console.log('creating tags', tags);

    // update div below field, iterating through array to build output
    var templateId = 'tags-template'
      , tagTemplate = document.getElementById(templateId).innerHTML
      , template = doT.template(tagTemplate)
      , output = template({"tags": tags})
      ;

    console.log('tags created', output);

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
