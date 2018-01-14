import React from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import MainScene from './scenes/MainScene';
import LoginScene from './scenes/LoginScene/LoginScene';
import TicketScheduleScene from './scenes/TicketScheduleScene/TicketScheduleScene';
import TicketManagementScene from './scenes/TicketManagementScene/TicketManagementScene';
import ReportScene from './scenes/ReportScene/ReportScene';
import NotificationScene from './scenes/NotificationScene/NotificationScene';
import MoreScene from './scenes/MoreScene/MoreScene';
import RunAppScene from './scenes/RunAppScene';
import { Authentication } from './actions/login';
const ACCESS_TOKEN = 'access_token';
class RouterComponent extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar="true">
        <Scene key="start" hideNavBar="true"  >

            <Scene
              key="runapp"
              component={RunAppScene}
            />
          </Scene>
          <Scene key="auth" hideNavBar="true"  >

            <Scene
              key="login"
              component={LoginScene}
            />
          </Scene>
          <Scene key="main" hideNavBar="true"  >
            <Scene
              key="MainScene"
              component={MainScene}
            />
          </Scene>
        </Stack>
      </Router>
    );
  }
};
export default RouterComponent;
