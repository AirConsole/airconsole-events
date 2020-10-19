export class AirConsoleEvents {
  /**
  * Returns eventId for .off
  */
  on: <T>(eventName: string, cb: (device_id: number, data: T) => void, context?: any) => number;

  /**
  * eventId from .on
  */
  off: (eventId: number) => void;

  /**
   * Sends event to a device, if device_id is undefined sends to all OTHER devices
   */
  sendEvent: <T>(device_id: number | undefined, eventName: string, data: T) => void;

  /**
   * Broadcasts to all other devices
   */
  broadcastEvent: <T>(eventName: string, data: T) => void;

  setCustomDeviceStateProperty: <T>(property: string, data: T) => void;

  /**
   * Call this inside your airconsole.onMessage();
   */
  dispatchEvent: <T>(device_id: number, data: T) => void;

  /**
   * Call this inside airconsole.onDeviceStateChange();
   */
  evaluateCustomData: <T>(device_id: number, data: T) => void;

  /**
   * Gets triggered every time the property changes
   */
  observeCustomProperty: <T>(device_id: number, property: string, callback: (new_value: T, old_value: T) => void) => void;
}