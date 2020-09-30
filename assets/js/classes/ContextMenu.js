'use strict';
const { ipcRenderer, remote } = require('electron');
const { Menu, MenuItem } = remote;

export default class ContextMenu {

    constructor() {
        this.menu = new Menu();
    }

    initialize() {
        this.menu.append(
            new MenuItem({
                label: 'Settings',
                click() {
                    ipcRenderer.send('openSettings');
                }
            })
        );
        this.menu.append(new MenuItem({ type: 'separator' }));
        this.menu.append(
            new MenuItem({
                label: 'Exit',
                click() {
                    ipcRenderer.send('quitApplication');
                }
            })
        );

        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.menu.popup({ window: remote.getCurrentWindow() })
        }, false);
    }
}
