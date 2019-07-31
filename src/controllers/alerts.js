/**
 * Show alerts for events
 *
 * @param {this} self
 */
export default function show_alert(self) {
  return function show_alert(con) {
    self.dismissCountdown = this.dismissSeconds;
    self.alert_message = "A new connection was made! " + con._id;
  };
}
