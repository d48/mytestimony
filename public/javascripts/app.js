// @todo create listener for older browsers
(function(){
  var startApp = function() {
    var options = {
          closeId      : 'close'
        , formId       : 'testimony-form'
        , openId       : 'start'
        , submitId     : 'submit'
        , tagSingleId  : 'tag-single'
        , tagsInputId  : 'tags'
        , tagsBoxId    : 'tagbox'
        , tagsTemplate : 'tags-template'
        , viewTesClass : 'view-testimony'
    }

    MYT.init(options);
  };

  document.addEventListener('DOMContentLoaded', startApp, false);
}());
