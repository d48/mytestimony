// @todo: use require.js to pull in library and module dependencies
document.onready = function() {

  var MYT = {};

  (function(){

    function viewTestimony(e) {
      e.preventDefault();

      var btnId  = e.currentTarget.getAttribute('id')
      , location = window.location
      , origin = location.origin
      ;
        
      // @todo: create namespace of utility/url helper
      window.location.href = origin + '/testimonies/' + btnId;
    }

    function closeForm(e) {
      e.preventDefault();
      $('#testimony-form').addClass('close');
      $('#testimony-form').removeClass('open');
    }

    function showForm(e) {
      e.preventDefault();
      $('#testimony-form').removeClass('close');
      $('#testimony-form').addClass('open');
    }

    // api
    MYT = {
      btnViewTestimony: viewTestimony
      , btnCloseForm: closeForm
      , btnShowForm: showForm
    };

    
  }());

  // click handler
  // -----------------------------------------------
  $('.view-testimony').on('click', MYT.btnViewTestimony);
  $('#close').on('click', MYT.btnCloseForm);
  $('#start').on('click', MYT.btnShowForm);


};

