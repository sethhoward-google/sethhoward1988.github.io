

var Poll = (function () {
    
    var instance;

    function init() {

        var mapCallbacks = function (data) {
            var success = data.success;
            _.each(success, function (success) {
                callbacks[success.source](success.success);
            });
        }

        var jsonapi = new JSONAPI({
            host:'67.222.234.99',
            port:'20059',
            username:'alecgorge',
            password:'MySecret',
            salt:'pepper123'
        });

        var subscriptions = {}
        var callbacks = {};
        var subscriptions = [];
        var argumentsArray = [];
        var run = false;
        var interval = 5000;
        var that = this;

        var publicMethods = {

            jsonapi: jsonapi, 

            subscribe: function (method, args, callback) {
                subscriptions.push(method);
                argumentsArray.push(args);
                callbacks[method] = callback;
            },

            start: function () {
                if(run){
                    return;
                }
                run = true;
                this.poll();
            },

            stop: function () {
                run = false;
            },

            poll: function () {
                var that = this;
                if(!run){
                    return;
                }

                if(!subscriptions.length){
                    setTimeout(that.poll, interval);
                }

                jsonapi.callMultiple(subscriptions, argumentsArray, function (data) {
                    mapCallbacks(data);
                    setTimeout(that.poll, interval);
                });
            }
        }

        publicMethods.poll = _.bind(publicMethods.poll, publicMethods);

        return publicMethods;
    }

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {
     
          if ( !instance ) {
            instance = init();
          }
     
          return instance;
        }
     
      };

})();

