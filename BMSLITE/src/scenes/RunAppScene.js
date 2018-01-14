import React from 'react';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { StyleSheet, Text, View } from 'react-native';
import { Spinner } from 'native-base';
import {Authentication} from '../actions/login';
import { deleteToken } from '../utils/AsyncStorage';
const ACCESS_TOKEN = 'access_token';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
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