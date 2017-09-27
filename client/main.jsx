'use strict';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App.jsx';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin(); //Workaround for Meterial-UI with React verion under 1.0

Meteor.startup(() => {
  render(
    <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
      <App />
    </MuiThemeProvider>, 
    document.getElementById('app-body'));
});
