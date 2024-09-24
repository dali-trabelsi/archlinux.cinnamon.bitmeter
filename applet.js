const Applet = imports.ui.applet;
const Lang = imports.lang;
const Mainloop = imports.mainloop;
const GLib = imports.gi.GLib;

function MyApplet(orientation, panel_height, instance_id) {
  this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
  __proto__: Applet.TextApplet.prototype,

  _init: function (orientation, panel_height, instance_id) {
    Applet.TextApplet.prototype._init.call(
      this,
      orientation,
      panel_height,
      instance_id
    );

    this.set_applet_tooltip("Net Speed Applet");
    this.refreshInterval = 500; // Set refresh interval to 500ms

    this.interface = "wlan0"; // Replace with your network interface, use "ip link show" to find the correct one

    // Set a monospace font to avoid width flicker
    this.actor.style =
      "font-family: Monospace; min-width: 180px; max-width: 180px; width: 180px;";

    // Start updating the network speed
    this._update();
  },

  // Function to get the current upload and download speeds
  _get_net_speed: function () {
    try {
      // Read network data from /proc/net/dev (this file stores network interface data)
      let net_stats = GLib.file_get_contents("/proc/net/dev")[1].toString();
      let lines = net_stats.split("\n");

      // Extract the relevant line for the network interface
      for (let line of lines) {
        if (line.includes(this.interface)) {
          let data = line.trim().split(/\s+/); // Split by whitespace
          let rx_bytes = parseInt(data[1]); // Received bytes (position 1)
          let tx_bytes = parseInt(data[9]); // Transmitted bytes (position 9)
          return [rx_bytes, tx_bytes];
        }
      }
    } catch (e) {
      global.logError("NetSpeed Applet: Failed to get network data: " + e);
    }
    return [0, 0];
  },

  // Update the display in the panel
  _update: function () {
    let [prev_rx, prev_tx] = this._get_net_speed();

    // Wait for 500ms before fetching new data
    Mainloop.timeout_add(
      this.refreshInterval,
      Lang.bind(this, function () {
        let [current_rx, current_tx] = this._get_net_speed();
        let download_speed =
          (current_rx - prev_rx) / (this.refreshInterval / 1000); // Bytes per second
        let upload_speed =
          (current_tx - prev_tx) / (this.refreshInterval / 1000); // Bytes per second

        // Convert speeds to Kbps or Mbps
        let download_label = this._format_speed(download_speed);
        let upload_label = this._format_speed(upload_speed);

        // Update the text displayed in the panel
        this.set_applet_label(`↓ ${download_label} ↑ ${upload_label}`);

        // Recursively call _update to keep updating every 500ms
        this._update();
      })
    );
  },

  // Format speed values into Kbps or Mbps for display with fixed width
  _format_speed: function (speed) {
    let kbps = speed / 1024;
    let formattedSpeed;

    if (kbps >= 1024) {
      formattedSpeed = (kbps / 1024).toFixed(1).padStart(5, "‎ ") + " Mbps";
    } else {
      formattedSpeed = kbps.toFixed(1).padStart(5, "‎ ") + " Kbps";
    }

    // Add padding to ensure consistent width, using 8 characters for each field
    return formattedSpeed;
  },

  on_applet_removed_from_panel: function () {
    // Cleanup when the applet is removed
  },
};

function main(metadata, orientation, panel_height, instance_id) {
  return new MyApplet(orientation, panel_height, instance_id);
}
