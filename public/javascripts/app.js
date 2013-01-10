// @todo create listener for older browsers
document.addEventListener('DOMContentLoaded', domLoaded, false);

/**
 * Runs when dom content loaded event triggers on document
 * 
 * @name domLoaded
 * @returns void - app init
 * @method 
 * @author Ryan Regalado 
 */
function domLoaded() {
  // var setup
  var d              = window.document
      , closeId      = 'close'
      , openId       = 'start'
      , viewTesClass = 'view-testimony'
      , viewTesButtons = d.getElementsByClassName(viewTesClass)
      , viewLen = viewTesButtons.length
      , i = 0
      ;

  // Set up click handlers
  for(i;i < viewLen; i++) {
      viewTesButtons[i].addEventListener('click', MYT.btnViewTestimony, false);    
  }
  d.getElementById(closeId).addEventListener('click', MYT.btnCloseForm, false);
  d.getElementById(openId).addEventListener('click', MYT.btnShowForm, false);

};
