import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import FooterTabsIconText from '../components/FooterTabsIconText';
import ListTabar from '../constans/ListTabar';
import TabNavigatorComponent from '../components/TabNavigatorComponent';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
class MainScene extends Component {
    // componentDidMount = () => {
       
    // }
    render() {
        // console.log('MainScene',this.props.status);
        return(
            <TabNavigatorComponent TabList={ListTabar} selectedTab = 'ticketSchedule' />
        );
    }
}
const mapStateToProps = (state) => {        
    return {        
        // respone: state.loginReducers,
        // account: state.loginReducers,
        // isAuthentical:  state.loginReducers
        loginReducers: state.loginReducers
    }
};
export default connect(mapStateToProps,null)(MainScene);