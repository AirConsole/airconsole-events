(function() {

  /**
   * AirConsole-Events extends the AirConsole object with on() off() and send-events
   * methods.
   * Internally it is a wrapper for the onMessage() function, which lets you
   * call multiple functions if an event triggers (like a .addEventListener).
   */

  if (!window['AirConsole']) {
    throw "AirConsole is not defined. Did you not include the API file?";
  }

  /**
   * @var {Object} events - Holds a map of events and its callbacks
   */
  AirConsole.prototype.events = {};

  /**
   * Binds event to a function. Returns id which can be used to unbind the function again.
   * @params {String} event_name - The name of the event
   * @params {Function} callback - A callback function to execute when the event triggers
   * @return {String}
   */
  AirConsole.prototype.on = function(event_name, callback) {
    if (!event_name) throw "Missing param event_name.";
    if (typeof callback !== 'function') throw "Event callback is not a function";

    var randomId = function(chars) {
      chars = chars || 15;
      return (Math.random() + 1).toString(36).substring(2, chars);
    };

    if(!this.events[event_name]) {
      this.events[event_name] = {};
    }
    var id = randomId();
    this.events[event_name][id] = callback;
    return id;
  };

  /**
   * Unbinds an event
   * @params {String} id - The id of the event (returned when binding with .on() method)
   */
  AirConsole.prototype.off = function(id) {
    if (!id) throw "Missing param id";
    var events = this.events;
    for (var evt_name in events) {
      for (var evt_id in events[evt_name]) {
        if (evt_id === id) {
          this.events[evt_name][evt_id] = null;
        }
      }
    }
  };

  /**
   * Use this to send an event to a device
   * @params {Number} to - The device id to send the event
   * @params {String} event_name - The name of the event
   * @params {mixed} params - (Optional) params to pass to the callback method
   */
  AirConsole.prototype.sendEvent = function(to, event_name, params) {
    this.message(to, {
      event_name: event_name,
      params: params
    });
  };

  /**
   * Use this to send an event to all devices
   * @params {Number} to - The device id to send the event
   * @params {String} event_name - The name of the event
   * @params {mixed} params - (Optional) params to pass to the callback method
   */
  AirConsole.prototype.broadcastEvent = function(event_name, params) {
    this.broadcast({
      event_name: event_name,
      params: params
    });
  };

  /**
   * Dispatches an event when an event is received. Call this in the onMessage function.
   * @params {Number} device - The device id which send the event
   * @params {mixed} message+d - (Optional) params to pass to the callback method
   */
  AirConsole.prototype.dispatchEvent = function(device_id, message_data) {
    var event_name = message_data.event_name;
    var params = message_data.params || null;
    if (event_name) {
      var evts = this.events[event_name];
      if (evts) {
        for (var id in evts) {
          var fn = evts[id];
          if (typeof fn === 'function') {
            fn(device_id, params);
          } else if (typeof fn === 'undefined') {
            throw "Failed to emit function for " + event_name;
          }
        }
      }
    }
  };

})();
