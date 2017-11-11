### AirConsole-Events

Extends AirConsole with an event based approach and methods like ``.on()`` ``.off()`` and ``.sendEvent()``.
Additionally you can observe custom-device-state properties with ``.observeCustomProperty()``

(NOT WORKING FOR AIRCONSOLE PLUGINS - like Unity or Construct2)

## But why?

Short: it makes your code cleaner.
Instead of processing all incoming messages in the .onMessage() method:

```javascript
  airconsole.onMessage = function(device_id, data) {
    if (data.action) {
      // ...
    if (data.show_view) {
      // ...
  };
```

You can listen for "message-events" and don't have to write all your
logic in the onMessage() method:

```javascript
  airconsole.on('SOME_ACTION', function(device_id, data) { // ...
  airconsole.on('SHOW_MAIN_VIEW', function(device_id, data) { // ...
```

## How to use

You can use it on both, the screen and the controller.html.

Include the AirConsole javascript API file and the ``airconsole-events.js`` file.

### HTML:

Include the AirConsole API and the airconsole-events.js file:

```html
  <script type="text/javascript" src="https://www.airconsole.com/api/airconsole-latest.js"></script>
  <script type="text/javascript" src="airconsole-events.js"></script>
```

### Setup:

```javascript
  var airconsole = new AirConsole();

  airconsole.onMessage = function(device_id, data) {
    // Put this into your onMessage function to listen for events
    this.dispatchEvent(device_id, data);
  };
```

### Usage:

```javascript
  // --- Bind an event --- //
  // The event key is 'MOVE_DOWN'
  // Callback returns the sender device_id and optional some params
  // .on() returns an unique event id. Use it with .off() to unbind events
  var event_id = airconsole.on('MOVE_DOWN', function(device_id, params) {
    // do s.t. cool here ...
  });

  // --- Unbind an event --- //
  airconsole.off(event_id);

  // --- Send an event to another device --- //
  // Send an event to device id 2, key is 'MOVE_DOWN' plus some custom params
  airconsole.sendEvent(2, 'MOVE_DOWN', {
    distance: 20
  });

  // --- Send an event to all other devices --- //
  airconsole.broadcastEvent('MOVE_DOWN', {
    distance: 10
  });
```

## Observing custom device state properties

Additionally you can observe properties of the custom device data and call a function if
the value has changed.

### Usage:

For example the controller wants to observe a "position" property of the screen.

```javascript
  // --- On the Screen --- //
  // We set a custom property 'position' with an initial value:
  airconsole.setCustomDeviceStateProperty("position", { x: 10, y: 20} });

  // --- On the Controller --- //
  // In the onDeviceStateChange method we call the new method 'evaluateCustomData', which
  // will get triggered everytime a device changes it's custom data
  airconsole.onDeviceStateChange = function(device_id, data) {
    this.evaluateCustomData(device_id, data);
  };

  // Now we add an observer: We want to observe the screen's position property.
  // Everytime it changes, the callback function will get triggered
  // Params: (device_id, property, callback-function)
  airconsole.observeCustomProperty(AirConsole.SCREEN, "position", function(new_value, old_value) {
    console.log("Screen has changed it's position value to:", new_value, old_value);
  });
```

Make sure observing and setting the custom data happens after ``onReady`` has been called!
