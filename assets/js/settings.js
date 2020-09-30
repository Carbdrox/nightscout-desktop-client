'use strict';

import ContextMenu from "./classes/ContextMenu.js";
import dataStore from '../../store/DataStore.js'

const { ipcRenderer } = require('electron');
const contextMenu = new ContextMenu();

contextMenu.initialize();

document.addEventListener('DOMContentLoaded', () => {
    initialize();
}, false);

function initialize () {
    document.getElementById('url').value = dataStore.getSetting('url');
    document.getElementById('token').value = dataStore.getSetting('token');
    document.getElementById('interval').value = dataStore.getSetting('interval');

    document.getElementById('save').addEventListener('click', () => {
          saveSettings();
    });
}

function saveSettings() {
    dataStore.setSetting('url', document.getElementById('url').value);
    dataStore.setSetting('token', document.getElementById('token').value);
    dataStore.setSetting('interval', document.getElementById('interval').value);

    ipcRenderer.send('closeSettings');
}