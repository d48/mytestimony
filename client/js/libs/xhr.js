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
 *      MYT.request.get('/api/v1/tags/church')
 *          .success(function(data) {
 *              // do something with the data
 *          })
 *          .error(function(data) {
 *              // do something with the data
 *          });
 * @method 
 * @memberof MYT
 * @author Ryan Regalado 
 * @todo reference xhr lib creation for api
 * http://toddmotto.com/writing-a-standalone-ajax-xhr-javascript-micro-library/
 */
(function(myt) {
    var myt = myt || {}
        // object to expose to namespace
        , exports = {

        } 
        // parse result
        , parse = function (req) {
            var result = req.responseText;
            try {
                result = JSON.parse(result);
            } catch (e) {
                console.error('Issue with parsing result', result);
            }
            return [result, req];
        }
        // setup xhr object
        , xhr = function (method, url, data) {
            // default xhr callbacks
            var cbDefault = function(data) { console.log(data); }
                , callbacks = {
                    success: cbDefault
                    , error: cbDefault
                }
                , XHR = window.XMLHttpRequest || ActiveXObject
                , request = new XHR('MSXML2.XMLTTP.3.0');
            ; // end xhr var

            request.open(method, url, true); // true = async
            request.setRequestHeader('Content-type', 'applicaiton/x-www-form-urlencoded');
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        callbacks.success.apply(callbacks, parse(request));
                    } else {
                        callbacks.error.apply(callbacks, parse(request));
                    }
                }
            }; // end onreadystatechange

            request.send(data);

            return {
                success: function (cb) {
                    if (typeof cb === 'function') {
                        callbacks.success = cb;
                    }
                    return callbacks;
                }
                 , error: function (cb) {
                    if (typeof cb === 'function') {
                        callbacks.error = cb;
                    }
                    return callbacks;
                 }
            }; // end return
        } // end xhr fn

    ; // end top var for request lib

    // methods to expose
    exports['get'] = function (opts) {
        return xhr('GET', opts);
    };

    exports['put'] = function (url, data) {
        return xhr('PUT', url, data);
    };

    exports['post'] = function (url, data) {
        return xhr('POST', url, data);
    };


    exports['delete'] = function (url) {
        return xhr('DELETE', url);
    };

    myt.request = exports;

    return myt;
})(MYT);
