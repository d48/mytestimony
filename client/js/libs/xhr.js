(function(myt) {

    /**
     * Implements XHR library for XMLHTTPRequests
     * 
     * @request
     * @param   {object} options - object for configurations to pass to function
     * @param   {string} url - url for xhr to act on
     * @param   {string} options.type - xhr type, POST | GET | DELETE | PUT. Defaults to GET
     * @param   {function} options.success - callback function if xhr is success
     * @param   {function} options.error - callback function if xhr is error 
     * @returns {object} - xhr object to introspect  
     * @example 
     *      MYT.request({
     *          url: 'http://mytestimomy.com/api/v1/tags/God
     *          , type: 'GET'
     *          , success: function(data) {
     *              console.log(data);
     *          }
     *          , error: function(err) {
     *              console.log(err);
     *          }
     *      }); 
     * @method 
     * @memberof MYT
     * @author Ryan Regalado 
     * @todo reference xhr lib creation for api
     * http://toddmotto.com/writing-a-standalone-ajax-xhr-javascript-micro-library/
     */
    myt.request = function(options) {

    };

    return myt;
})(MYT);
