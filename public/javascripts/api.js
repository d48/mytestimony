// @todo: use require.js to pull in library and module dependencies
$(document).ready(function() {

  function btnViewTestimony(e) {
    e.preventDefault();

    var btnId  = e.currentTarget.getAttribute('id')
    , location = window.location
    , origin = location.origin
    ;
      
    // @todo: create namespace of utility/url helper
    window.location.href = origin + '/testimonies/' + btnId;
  }
  
  // click handler
  $('.view-testimony').on('click', btnViewTestimony);
});
