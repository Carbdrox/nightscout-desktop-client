'use strict';

import dataStore from '../../../store/DataStore.js'

export default class Nightscout {

    constructor() {
        this.data = [];
        this.lastUpdate = null

        this.renewData();
    }

    renewData() {
        fetch(dataStore.getSetting('url') + '/api/v1/entries?count=1&token=' + dataStore.getSetting('token'), {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                this.data = data[0];
            }
        });

        setTimeout( () => {
            this.renewData();
        }, dataStore.getSetting('interval'));
    }

    getCurrentBloodSugar() {
        return this.data.sgv ? this.data.sgv : '---';
    }

    getDelta() {
        let delta = '-'
        if (this.data.delta) {
            delta = Math.round(this.data.delta);
            if (delta > 0) {
                delta = '+' + delta;
            }
        }
        return delta;
    }

    getDirection() {
        return this.data.direction > 0 ? this.data.direction : 'Flat';
    }
}
