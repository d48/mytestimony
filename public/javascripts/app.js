// @todo create listener for older browsers
(function(){
  var startApp = function() {
    var options = {};

    options.closeId      = 'close';
    options.openId       = 'start';
    options.submitId     = 'submit';
    options.tagsBoxId    = 'tags';
    options.viewTesClass = 'view-testimony';

    MYT.init(options);
  };

  document.addEventListener('DOMContentLoaded', startApp, false);
}());
