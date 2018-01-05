import React, { Component } from 'react';
import FooterTabsIconText from '../components/FooterTabsIconText';
import ListTabar from '../constans/ListTabar';
import TabNavigatorComponent from '../components/TabNavigatorComponent';
class MainScene extends Component {
    render() {
        console.log('MainScene');
        return(
            <TabNavigatorComponent TabList={ListTabar} />
        );
    }
}
export default MainScene;