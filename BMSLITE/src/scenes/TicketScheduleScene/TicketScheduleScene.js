import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import {
    Container, Body, Title, Left, Right, Button, Icon, Tabs, Tab, Header,
} from 'native-base';
import DateFilterSection from '../../containers/DateFilterSection';
import SeatOverview from '../../containers/SeatOverview';
import PriceConfigOverview from '../../containers/PriceConfigOverview';
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
    headerLeft: {
        flex: 1
    },
    headerBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerRight: {
        flex: 1
    }
});

class TicketScheduleScene extends React.Component {
    componentWillMount() {

    }
    render() {
        console.log('TicketScheduleScene');
        return (
            <Container>
                <Header>
                    <Left style={styles.headerLeft} >
                        <Button transparent>
                            <Icon name="md-add" />
                        </Button>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title >Lịch bán vé</Title>
                    </Body>
                    <Right style={styles.headerRight}>
                        <Button transparent>
                            <Icon name="ios-more-outline" />
                        </Button>
                    </Right>
                </Header>
                <DateFilterSection />
                <Tabs initialPage={0}>
                    <Tab heading="Chỗ mở bán" style={styles.tabHeader}>
                        {/* <SeatOverview /> */}
                        
                    </Tab>
                    <Tab heading="Giá vé">
                        <PriceConfigOverview />
                    </Tab>
                </Tabs>
            </Container>

        );
    }
}

export default TicketScheduleScene;