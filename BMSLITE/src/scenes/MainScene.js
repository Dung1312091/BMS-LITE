import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import FooterTabsIconText from '../components/FooterTabsIconText';
import ListTabar from '../constans/ListTabar';
import TabNavigatorComponent from '../components/TabNavigatorComponent';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
class MainScene extends Component {
    render() {
        return(
            <TabNavigatorComponent TabList={ListTabar} selectedTab = 'ticketSchedule' />
        );
    }
}
export default MainScene;