const { app, BrowserWindow, ipcMain } = require('electron');

app.commandLine.appendSwitch('enable-transparent-visuals');
app.commandLine.appendSwitch('disable-gpu')

let settingsWindow = null;

function createWindow () {

    const win = new BrowserWindow({
        width: 120,
        height: 60,
        transparent: true,
        frame: false,
        resizable: false,
        minimizable: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    win.loadFile('views/index.html');
    //win.webContents.openDevTools();

    ipcMain.on('openSettings', (event) => {
        if (!settingsWindow) {
            createSettingsWindow();
        }
    });

    ipcMain.on('quitApplication', (event) => {
        app.quit()
    });
}

function createSettingsWindow () {
    settingsWindow = new BrowserWindow({
        width: 400,
        height: 400,
        transparent: false,
        frame: true,
        resizable: false,
        minimizable: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });
    settingsWindow.setMenu(null);
    settingsWindow.loadFile('views/settings.html');
    //settingsWindow.webContents.openDevTools();

    settingsWindow.on('closed', () => {
        settingsWindow = null;
    });

    ipcMain.on('closeSettings', (event) => {
        settingsWindow.close();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});
