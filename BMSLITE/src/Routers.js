import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';

import MainScene from './scenes/MainScene';
import LoginScene from './scenes/LoginScene/LoginScene';
import TicketScheduleScene from './scenes/TicketScheduleScene/TicketScheduleScene';
import TicketManagementScene from './scenes/TicketManagementScene/TicketManagementScene';
import ReportScene from './scenes/ReportScene/ReportScene';
import NotificationScene from './scenes/NotificationScene/NotificationScene';
import MoreScene from './scenes/MoreScene/MoreScene';

class RouterComponent extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = ({
  //     isLogin: false
  //   });
  // }
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar="true">
          <Scene key="auth" hideNavBar="true" initial  >
            <Scene
              key="login"
              component={LoginScene}
            />
          </Scene>
          <Scene key="main" hideNavBar="true" >
          <Scene
              key="MainScene"
              component={MainScene}
            />
            <Scene
              key="ticketSchedule"
              component={TicketScheduleScene}
            />
            <Scene
              key="ticketManagement"
              component={TicketManagementScene}
            />
            <Scene
              key="report"
              component={ReportScene}
            />
            <Scene
              key="notification"
              component={NotificationScene}
            />
            <Scene
              key="more"
              component={MoreScene}
            />
          </Scene>
        </Stack>
      </Router>
    );
  }  
};

export default RouterComponent;
