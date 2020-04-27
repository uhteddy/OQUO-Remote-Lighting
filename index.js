const { app, BrowserWindow } = require('electron');
const ejse = require('ejs-electron');
const path = require('path');
const client = require('discord-rich-presence')('703091162688389161');

app.on('ready', () => {
    // create main browser window
    mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: 800,
        height: 600,
        show: false, // don't show the main window
        frame: false,
        webPreferences: {
            nodeIntegration: true
        },
        minWidth: 440,
        minHeight: 260
    });
    // create a new `splash`-Window 
    splash = new BrowserWindow({width: 250, height: 325, frame: false, alwaysOnTop: true, icon: `file://${__dirname}/src/assets/logo.png`, resizable: false});
    splash.setIcon(path.join(__dirname, '/src/assets/logo.png'));
    splash.loadURL(`file://${__dirname}/src/splash.html`);


    mainWindow.loadURL(`file://${__dirname}/src/test.ejs`);

    mainWindow.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });
    mainWindow.removeMenu();
    mainWindow.setIcon(path.join(__dirname, '/src/assets/logo.png'));
    
    // if main window is ready to show, then destroy the splash window and show up the main window
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      splash.destroy();

      client.updatePresence({
        state: 'created by uhTeddy',
        details: 'Using the OQUO Remote Lighting system.',
        largeImageKey: `oquocon`,
        smallImageKey: `small_icon`,
        instance: true,
      });
    });
});

  