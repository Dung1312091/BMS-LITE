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

class TicketScheduleScene extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            ListViewArea: []
        });
    }
    componentWillMount() {
        let get_trip = this.props.responeLogin.trip._bodyInit;
        let trip = JSON.parse(get_trip);
        this.setState({
            ListViewArea: trip.data
        });
    }
    render() {
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
                    <Col style={{ margin: '1%', flex: 1 }}><Dropdown data={this.state.ListViewArea} defaultIndex={0} defaultValue={this.state.ListViewArea[0]} /></Col>
                    <Col style={{ margin: '1%', flex: 1 }}><VxrDateRangePicker /></Col>
                </Grid>

                <SeatOverview />
            </Container>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        responeLogin: state.loginReducers
    }
};

export default connect(mapStateToProps, null)(TicketScheduleScene);