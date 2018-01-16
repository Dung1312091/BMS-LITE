import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Spinner } from 'native-base';
import { Authentication } from '../actions/login';
import { deleteToken } from '../utils/AsyncStorage';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B65B0',
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logoCompany: {
    flex: 0.5,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

class RunAppScene extends React.Component {
  componentWillMount() {
    let date = this.props.isDate;
    this.props.Authentication(date);
    // deleteToken(ACCESS_TOKEN);
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.responeLogin.isAuthentication) {
      Actions.replace('login');
    }
    else {
      Actions.replace('MainScene');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoCompany}>
          <Image
            style={{ width: 263, height: 59 }}
            source={require('../images/logo.png')}
          />
        </View>
        <Spinner color='red' />
      </View>
    );
  }
}
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

export default connect(mapStateToProps, mapDispatchToProps)(RunAppScene);