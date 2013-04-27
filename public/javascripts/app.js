// @todo create listener for older browsers
(function(){
  var startApp = function() {
    var options = {
          closeId                : 'close'
          , formId               : 'testimony-form'
          , openId               : 'start'
          , submitId             : 'submit'
          , tagSingleContainerId : 'tag-single-container'
          , tagSingleId          : 'tag-single'
          , tagsInputId          : 'tags'
          , tagsBoxId            : 'tagbox'
          , tagsTemplate         : 'tags-template'
          , viewTesClass         : 'view-testimony'
          , testimoniesId        : 'testimonies'
    }

    MYT.init(options);
  };

  document.addEventListener('DOMContentLoaded', startApp, false);
}());
