'use strict';

import Nightscout from "./Nightscout.js";

export default class MainView {

    constructor() {
        this.nightscout = new Nightscout();
    }

    loop() {
        this.updateView({
            'currentSugar': this.nightscout.getCurrentBloodSugar(),
            'sugarDifference': this.nightscout.getDelta(),
            'directionIndicator': this.getDirectionIndicator(),
        });

        setTimeout( () => {
            this.loop();
        }, 1000);
    }

    getDirectionIndicator() {
        let indicator = 'arrow-right';
        switch(this.nightscout.getDirection()) {
            case 'Flat':
                indicator = 'arrow-right';
                break;
            case 'FortyFiveUp':
                indicator = 'arrow-right-up';
                break;
            case 'SingleUp':
                indicator = 'arrow-up';
                break;
            case 'FortyFiveDown':
                indicator = 'arrow-right-down';
                break;
            case 'SingleDown':
                indicator = 'arrow-down';
                break;
        }
        return '<i class="' + indicator + '" />'
    }

    updateView(elements) {
        Object.keys(elements).forEach(function(key) {
            document.getElementById(key).innerHTML = elements[key];
        });
    }
}
