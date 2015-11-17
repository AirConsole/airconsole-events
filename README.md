### AirConsole-Events

Extends AirConsole with event methods like .on() .off() and .sendEvent().

## How to use

You can use it on both, the screen and the controller.html.

Include the AirConsole javascript API file and the airconsole-events.js file.

For example in controller.html:

### HTML:

```html
  <script type="text/javascript" src="http://www.airconsole.com/api/airconsole-latest.js"></script>
  <script type="text/javascript" src="airconsole-events.js"></script>
```

### Setup:

```javascript
  var air_console = new AirConsole();

  air_console.onMessage = function(device_id, data) {
    // Put this into your onMessage function to listen for events
    this.dispatchEvent(device_id, data);
  };
```

### Usage:

```javascript

  // --- Bind an event --- //
  // Event key is 'NEXT_ITEM'
  // Callback returns the sender device_id and optional the send params
  // on() returns a unique event id. Use it for off() unbinding events
  var event_id = air_console.on('NEXT_ITEM', function(device_id, params) {
    // do s.t. cool here ...
  });

  // --- Unbind an event --- //
  air_console.off(event_id);

  // --- Send an event to another device --- //
  // Send an event to device id 2, key is 'MOVE_DOWN' plus some custom params
  air_console.sendEvent(2, 'MOVE_DOWN', {
    distance: 20
  });

  // --- Send an event to all other devices --- //
  air_console.broadcastEvent('MOVE_DOWN', {
    distance: 10
  });

```
