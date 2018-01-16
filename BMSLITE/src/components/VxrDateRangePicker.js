import React, { Component } from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'native-base';
import {Calendar} from 'react-native-calendars'
import moment from 'moment';
import { selectDay } from '../actions/getDay';
import { getConfigurationOverview } from '../actions/ConfigurationOverview';
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  date: {
    marginTop: 10,
  },
  focused: {
    color: 'blue',
  },
  footer: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    padding: 20,
  },
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
    paddingTop:10,
    paddingBottom:10
  },
};
const customStyle = {
  hasEventCircle: {
    backgroundColor: 'blue',
  },
  day: { fontSize: 15, textAlign: 'center', color: 'black' },
  dayHeading: {
    color: 'black',
  },
  hasEventDaySelectedCircle: {
    backgroundColor: 'red',
  },
}
class VxrDateRangePicker extends Component {
  constructor(props) {
    super(props);
    let day = moment().format('YYYY-MM-DD');
    this.state = ({
      dateSelected: moment(this.props.isDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      isdate: day,
      visible: false,
      fromDate:  moment(this.props.isDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
    });
  }
  
  ShowModal() {
    this.setState({
      visible: true
    });
  }
  converDate = (date, day) => {
    let Date = moment(date).utc();
    let tomorrow = Date.add(day, 'days');
    let tomorrowDate = moment(tomorrow).format("YYYY-MM-DD");
    return tomorrowDate;
  }
  onDateSelect = (date) => {
    this.setState({
      dateSelected: date.dateString,
      fromDate: date.dateString
    });
  }
  toDay = () => {
    let day = moment();
    let date = moment(day).format("YYYY-MM-DD");
    this.setState({
      dateSelected: date,
      fromDate: date
    });
  }
  onCloseModal(date) {
    this.setState({
      visible: false
    });
    let get_trip = this.props.responeLogin.trip._bodyInit;
    let user = this.props.responeLogin.user;
    let token = this.props.responeLogin.token;
    let trip = JSON.parse(get_trip);
    let fromDate = moment(date).format('YYYY-MM-DD');
    let toDate = this.converDate(fromDate, 3);
    let routeId = this.props.routeId;
    let params = {
      access_token: token,
      company_id: user.data.CompId,
      route_id:  !isNaN(routeId) ? routeId : trip.data[0][0],
      from_date: fromDate,
      to_date: toDate,
      groups: 'selling_configs,fare_configs,statistic'
    }
    this.props.selectDay(date);
    this.props.getConfigurationOverview(params);
  }
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
    const vacation = {key:'vacation', color: 'red', selectedColor: 'blue'};
    const massage = {key:'massage', color: 'blue', selectedColor: 'blue',  };
    const workout = {key:'workout', color: 'green'};
    let { dateSelected, isdate,fromDate } = this.state;
    let tomorrowDate = this.converDate(dateSelected, 2);
    let nextTomorrowDate = this.converDate(dateSelected, 3);
    let textDate = this.cutDayOfDate(fromDate) + '-' + moment(nextTomorrowDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
    let eventDates = [fromDate, tomorrowDate, nextTomorrowDate];
    var obj = {};
    var a = [fromDate,tomorrowDate,nextTomorrowDate];
    a.map((item, index) => {
      if (index === 0) {
        obj[item] = {
          dots: [vacation],
          selected: true
        }
      } else {
        obj[item] = {
          dots: [workout],
          selected: true
        }
      }
    });
    return (
      <View style={{flex:1}}>
      <TouchableOpacity
        onPress={() => this.ShowModal() } 
        style={[styles.dateGroupItemContainer, styles.blockStyle]}
        >
        <Icon name="md-calendar" style={[styles.dateGroupItem, styles.iconStyle]} />
        <Text style={styles.dateGroupItem}>{textDate}</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent
        visible={this.state.visible}
        onRequestClose={() => console.log('Modal has been closed.')}
      >
        <View style={styles.container}>
          <Calendar
           onDayPress={(day) =>this.onDateSelect(day)}
           markedDates={obj}
           markingType={'multi-dot'}
            theme={{
          selectedDayBackgroundColor: 'blue'
            }}
          />
          <View style={[styles.footer, {
            flexDirection: 'row'
          }]}>
          <Button block light onPress={() => this.toDay()} style={{flex: 1, marginRight:10}}>
              <Text>Hôm nay</Text>
            </Button>
            <Button block light onPress={() => this.onCloseModal(dateSelected)} style={{flex: 1}}>
              <Text>Đồng ý</Text>
            </Button>
          </View>
        </View>
      </Modal>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isDate: state.getDayReducers,
    responeLogin: state.loginReducers,
    routeId: state.changeRouteReducer
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectDay: (date) => {
      dispatch(selectDay(date));
    },
    getConfigurationOverview: (params) => {
      dispatch(getConfigurationOverview(params));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(VxrDateRangePicker);
