import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import {Spinner } from 'native-base';
import { LoginAction } from '../../actions/index';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0B65B0',
        flex: 1,
    },
    logoCompany: {
        flex: 0.5,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginErr: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BAD2E8',
        height: 46,
        marginBottom: 27
    },
    inputSearch: {
        height: 46,
        width: 281
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    inputLogin: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 3,
        width: 296,
        height: 46
    },
    ImageStyle: {
        padding: 10,
        margin: 16,
        marginLeft: 36,
        height: 15,
        width: 11,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    Login: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#F8BB10',
        borderRadius: 5,
        width: 296,
        height: 46
    }
});
class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            animate: false,
            username: '',
            password: ''
        });
    }
    Login = () => {
        var {username, password} = this.state;
        this.props.onLogin({
            username,
            password
        })

    }
    componentDidUpdate() {
        if(this.props.responeLogin === 'ok') {
            Actions.replace('MainScene');
        }
    }
    render() {
        // const { navigation } = this.props;
        console.log('props LoginCom====>', this.props);
        var {username, password, animate} = this.state;
        var loading = this.state.animate ? <Spinner color='blue' /> : null;
        return (
            <View style={styles.container}>
                <View style={styles.logoCompany}>
                    <Image
                        style={{ width: 263, height: 59 }}
                        source={require('../../images/logo.png')}
                    />
                </View>
                <View style={styles.loginErr}>
                    <Text style={{ color: 'red' }} >Tài khoản chỉ gồm các ký tự 0-9, aA-zZ</Text>
                </View>

                <View style={styles.SectionStyle}>
                    <View style={styles.inputLogin}>
                        <Image source={require('../../images/user.png')} style={styles.ImageStyle} />
                        <TextInput
                            style={styles.inputSearch}
                            placeholder="Tài khoản"
                            underlineColorAndroid="transparent"
                            keyboardType='email-address'
                            name="username"
                            value={username}
                            onChangeText={(text) => this.setState({username: text})}
                        />
                    </View>
                </View>
                <View style={styles.SectionStyle}>
                    <View style={styles.inputLogin}>
                        <Image source={require('../../images/pass.png')} style={styles.ImageStyle} />
                        <TextInput
                            style={styles.inputSearch}
                            placeholder="Mật khẩu"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            name="password"
                            value={password}
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </View>
                </View>
               {loading}
                <View style={styles.SectionStyle}>
                    <View style={styles.Login}>
                        <TouchableOpacity onPress={this.Login}>
                            <Text>Đăng nhập</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {        
    return {        
        responeLogin: state.loginReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        onLogin: (account) => {                        
            dispatch(LoginAction(account));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);


