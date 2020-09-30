'use strict';

import MainView from "./classes/MainView.js";

const { ipcRenderer, remote } = require('electron');
const { Menu, MenuItem } = remote;
const mainView = new MainView();
const menu = new Menu()

menu.append(
    new MenuItem({
        label: 'Einstellungen',
        click() {
            ipcRenderer.send('openSettings');
        }
    })
)
menu.append(new MenuItem({ type: 'separator' }))
menu.append(
    new MenuItem({
        label: 'Schließen',
        click() {
            ipcRenderer.send('quitApplication');
        }
    })
)

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup({ window: remote.getCurrentWindow() })
}, false)

mainView.loop();
