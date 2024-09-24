# 📊 BitMeter - Network Speed Monitor Applet for Cinnamon

BitMeter is a simple network speed monitor applet for the Cinnamon desktop. It displays both download and upload speeds in the panel, refreshing every 500 milliseconds. Customize it to fit your network interface and monitor real-time network activity with ease!

## 🎨 Features

- ⬇️ **Download and Upload Speed Monitoring:** Real-time network activity displayed in the Cinnamon panel.
- ⏱️ **Fast Refresh Interval:** Updates every 500ms to provide near-instantaneous feedback.
- 🖥️ **Customizable Interface:** Set your network interface and enjoy a clean, monospace display.
- 💻 **Lightweight:** Efficient, with minimal impact on system resources.

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/dali-trabelsi/archlinux.cinnamon.bitmeter.git
```

### 2. Move to Cinnamon Applet Directory

```bash
mkdir -p ~/.local/share/cinnamon/applets
mv archlinux.cinnamon.bitmeter/bitmeter@dali ~/.local/share/cinnamon/applets/
```

### 3. Enable the Applet

- Open System Settings.
- Navigate to Applets.
- Find BitMeter in the list of available applets and click Add to Panel.

## 🛠️ Configuration

### 1. Change Network Interface

By default, BitMeter monitors the wlan0 interface. If you use a different network interface (e.g., eth0), you can update it:

1. Open the applet.js file located at:

```bash
~/.local/share/cinnamon/applets/bitmeter@dali/applet.js
```

2. Find the line:

```js
this.interface = "wlan0";
```

3. Replace "wlan0" with your network interface. To find your interface, use:

```bash
ip link show
```

### 2. Customize Refresh Interval

The refresh interval is set to 500 milliseconds by default. You can change it to any interval you prefer:

1. In the same applet.js file, find:

```js
this.refreshInterval = 500;
```

2. Change 500 to your desired interval (in milliseconds).

### 3. Style Customization

You can further customize the applet's appearance by editing the stylesheet.css file:

```css
#applet-box {
  min-width: 150px;
  max-width: 150px;
  font-family: Monospace;
  text-align: center;
}
```

## 🔧 Troubleshooting

### Applet Not Showing Correct Data?

- Ensure you’ve set the correct network interface in <code>applet.js </code>.
- Use <code>journalctl /usr/bin/cinnamon </code> to check for errors related to Cinnamon or the applet.

### Applet Crashing or Freezing?

- Try reducing the refresh interval if your system is under high load.
- Check the logs using <code>cinnamon --replace</code> to see if there are any specific issues.

## 🌟 Contributing

Contributions, bug reports, and feature requests are welcome! Simply fork the repository, make your changes, and submit a pull request. Please ensure your code follows a similar style to keep everything consistent.

## ⚖️ License

This project is licensed under the GNU General Public License v3.0. See the LICENSE file for more details.

<strong>BitMeter</strong> is a project by Dali Trabelsi, aimed at bringing a simple yet efficient network monitor to the Cinnamon desktop. 🌐💻
