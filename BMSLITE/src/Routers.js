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
import { deleteToken } from './utils/AsyncStorage';
// import RunAppScene from './scenes/RunAppScene';
const ACCESS_TOKEN = 'access_token';
class RouterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      isLogin: false,
      isMain: false
    });
  }
  componentWillMount() {
    let date = this.props.isDate;
    this.props.Authentication(date);
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.responeLogin.isAuthentication) {
      Actions.replace('login');
    }
    else {
      Actions.replace('MainScene');
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar="true">
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
const mapStateToProps = (state) => {
  return {
    responeLogin: state.loginReducers,
    isDate: state.getDayReducers
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    Authentication: (date) => {
      dispatch(Authentication(date));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);
