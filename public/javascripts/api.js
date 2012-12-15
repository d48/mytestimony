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

  function btnCloseForm(e) {
    e.preventDefault();
    
    $('#testimony-form').addClass('close');
    $('#testimony-form').removeClass('open');
  }

  function btnShowForm(e) {
    e.preventDefault();
    
    $('#testimony-form').removeClass('close');
    $('#testimony-form').addClass('open');
  }
  
  // click handler
  $('.view-testimony').on('click', btnViewTestimony);
  $('#close').on('click', btnCloseForm);
  $('#start').on('click', btnShowForm);
});
