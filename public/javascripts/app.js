// @todo create listener for older browsers
(function(){
  var startApp = function() {
    var options = {
          closeId                : 'close'
          , formId               : 'form-testimony'
          , formContainerId      : 'testimony-form'
          , openId               : 'start'
          , submitId             : 'submit-button'
          , tagSingleContainerId : 'tag-single-container'
          , tagSingleId          : 'tag-single'
          , tagsInputId          : 'tags'
          , tagsBoxId            : 'tagbox'
          , tagsTemplate         : 'tags-template'
          , testimonyBoxId       : 'testimony-box'
          , viewTesClass         : 'view-testimony'
          , testimoniesId        : 'testimonies'
    }

    MYT.init(options);
  };

  document.addEventListener('DOMContentLoaded', startApp, false);
}());
