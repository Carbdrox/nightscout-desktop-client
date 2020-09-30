const Store = require('electron-store');

class DataStore extends Store {

    constructor(settings) {
        super(settings);
        this.data = this.get('settings') || {};
    }

    saveSettings () {
        this.set('settings', this.data);
        return this;
    }

    getSettings() {
        this.data = this.get('settings') || {};
        return this;
    }

    getSetting(name) {
        return this.data[name] || null;
    }

    setSetting (name, setting) {
        this.data[name] = setting;
        return this.saveSettings();
    }

    deleteSetting (name) {
        if (this.data.hasOwnProperty(name)) {
            delete this.data[name];
        }
        return this.saveSettings();
    }
}

const dataStore = new DataStore({ name: 'Settings' });
Object.freeze(dataStore);

export default dataStore;
