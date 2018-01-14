import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, AsyncStorage } from 'react-native';
import {
    Container, Body, Title, Left, Right, Button, Icon, Tabs, Tab, Header, Grid, Col,
} from 'native-base';
import DateFilterSection from '../../containers/DateFilterSection';
import VxrDateRangePicker from '../../components/VxrDateRangePicker';
import SeatOverview from '../../containers/SeatOverview';
import PriceConfigOverview from '../../containers/PriceConfigOverview';
import { getTrips } from '../../actions/getTrips';
import Dropdown from '../../components/Dropdown';
import { connect } from 'react-redux';
import {getConfigurationOverview} from '../../actions/ConfigurationOverview';
import {selectDay} from '../../actions/getDay';
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
const styless = {
    iconStyle: {
      fontSize: 22,
    },
    blockStyle: {
      flex: 1,
    },
    containerStyle: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      backgroundColor: '#fff',
    },
    dateGroupItemContainer: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      borderColor: '#d9d8dc',
      borderWidth: 1,
      borderRightWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateGroupItem: {
      marginLeft: 5,
      marginRight: 5,
      color: '#1365af',
      fontSize: 13,
      fontWeight: '500',
    },
  };

class TicketScheduleScene extends React.Component {
    render() {
        const {
            containerStyle,
            blockStyle,
            iconStyle,
            dateGroupItemContainer,
            dateGroupItem,
          } = styless;
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
                <Grid style={{ padding: '1%', flex: 0 }}>
                    <Col style={{ margin: '1%', flex: 1 }}><Dropdown /></Col>
                    <Col style={{ margin: '1%', flex: 1 }}>
                        <VxrDateRangePicker />
                    </Col>
                </Grid>
                <SeatOverview />
            </Container>
        );
    }
}

export default TicketScheduleScene;