// @todo create listener for older browsers
(function(){
  var startApp = function() {
    var options = {
          closeId      : 'close'
        , formId       : 'testimony-form'
        , openId       : 'start'
        , submitId     : 'submit'
        , tagsInputId  : 'tags'
        , tagsBoxId    : 'tagbox'
        , viewTesClass : 'view-testimony'
    }

    MYT.init(options);
  };

  document.addEventListener('DOMContentLoaded', startApp, false);
}());
