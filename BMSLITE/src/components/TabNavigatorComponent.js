import React, { Components } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
class TabNavigatorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            selectedTab: this.props.selectedTab
        });
    }
    render() {
        // console.log('TabNavigatorComponent');
        const { TabList } = this.props;
        const getComp = (component, props) => {
            const Comp = component;
            return <Comp {...props} />;
        }
        return (
            <TabNavigator>
                {
                    TabList.map((item, index) => {
                        return (<TabNavigator.Item
                            title={item.title}
                            renderIcon={() => <Image source={item.img} />}
                            badgeText = {item.badgeText ?  item.badgeText : ''}
                            onPress={() => this.setState({ selectedTab: item.tabName })}
                            selected={this.state.selectedTab === item.tabName}
                            key={index}
                        >
                            {getComp(item.component)}
                        </TabNavigator.Item>
                        );
                    })
                }
            </TabNavigator>
        );
    }
}
export default TabNavigatorComponent;
