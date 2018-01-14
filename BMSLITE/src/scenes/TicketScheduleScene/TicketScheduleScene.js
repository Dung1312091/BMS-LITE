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
import moment from 'moment';
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
    constructor(props) {
        super(props);
        this.state = ({
            ListViewArea: [],
            user: {},
            seatOverview: {},
            visible: false
        });
    }
    onCloseModal = (date) => {
        let dateFormat = moment(date).format('DD-MM-YYYY');
        console.warn('aasass', date)
        this.setState({
            visible: !this.state.visible
        });
         this.props.selectDay(dateFormat);
    }
    ShowModal = () => {
        this.setState({ visible: !this.state.visible });
    }
    // onDateSelect = (date) => {
    //     console.warn(date);
    // }
    componentWillMount() {
        console.log(this.props.responeLogin);
        console.log('ConfigurationOverview',this.props.ConfigurationOverview);
        let get_trip = this.props.responeLogin.trip._bodyInit;
        let user = this.props.responeLogin.user;
        let token = this.props.responeLogin.token;
        let trip = JSON.parse(get_trip);
        this.setState({
            ListViewArea: trip.data,
            user: user
        });
        let params = {
            access_token: token,
            company_id: user.data.CompId,
            route_id: trip.data[0][0],
            from_date: '2018-01-15',
            to_date: '2018-01-17',
            groups: 'selling_configs,fare_configs,statistic'
        }
        this.props.getConfigurationOverview(params);
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.data) {
    //         this.setState({
    //             seatOverview: nextProps.data.data
    //         });
    //     }
    // }
    converDate = (date, day) => {
        let Date = moment(date).utc();
        let tomorrow = Date.add(day, 'days');
        let tomorrowDate = moment(tomorrow).format("YYYY-MM-DD");
        return tomorrowDate;
      }
    cutDayOfDate = (date) => {
        return date.substring(date.length - 2);
    }
    render() {
        const {
            containerStyle,
            blockStyle,
            iconStyle,
            dateGroupItemContainer,
            dateGroupItem,
          } = styless;
        var dates = moment(this.props.responeGetDay, 'DD-MM-YYYY').format('YYYY-MM-DD');
        let tomorrowDate = this.converDate(dates, 2);
        let nextTomorrowDate = this.converDate(dates, 3);
        var textDate = this.cutDayOfDate(dates) + '-' + moment(nextTomorrowDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
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
                    <Col style={{ margin: '1%', flex: 1 }}><Dropdown data={this.state.ListViewArea} defaultIndex={0} defaultValue={this.state.ListViewArea[0]} user={this.state.user} /></Col>
                    <Col style={{ margin: '1%', flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => this.ShowModal() } 
                        style={[dateGroupItemContainer, blockStyle]}
                        >
                        <Icon name="md-calendar" style={[dateGroupItem, iconStyle]} />
                        <Text style={dateGroupItem}>{textDate}</Text>
                        </TouchableOpacity>
                        <VxrDateRangePicker visible = {this.state.visible}  onCloseModal={this.onCloseModal} 
                       />
                    </Col>
                </Grid>
                <SeatOverview seatOverview={this.props.ConfigurationOverview} />
            </Container>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        responeLogin: state.loginReducers,
        ConfigurationOverview: state.getConfigurationOverview,
        responeGetDay: state.getDayReducers
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getConfigurationOverview: (params) => {
            dispatch(getConfigurationOverview(params));
        },
        selectDay: (date) => {
            dispatch(selectDay(date));
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(TicketScheduleScene);