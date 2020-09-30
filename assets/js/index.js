'use strict';

import ContextMenu from "./classes/ContextMenu.js";
import MainView from "./classes/MainView.js";

const contextMenu = new ContextMenu();
const mainView = new MainView();

contextMenu.initialize();
mainView.loop();
