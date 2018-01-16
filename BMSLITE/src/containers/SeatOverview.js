import React, { Component } from 'react';
import { View, AsyncStorage, TouchableOpacity } from 'react-native';
import { Content, Text, Grid, Col, Button, CheckBox } from 'native-base';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux';
import moment from 'moment';
import { getConfigurationOverview } from '../actions/ConfigurationOverview';
const ACCESS_TOKEN = 'access_token';
class SeatOverview extends Component {
  constructor(props) {
    super(props);
  }
  static calculateSeatStyle(bookedQty, totalQty ) {
    const style = {
      backgroundColor: 'red',
      width: '50%',
    };
    const w = totalQty > 0
      ? Math.round((bookedQty / totalQty) * 100)
      : 0;

    if (w >= 80) {
      style.backgroundColor = '#b6ffea'; // xanh
    } else if (w >= 50) {
      style.backgroundColor = '#ffeb96'; // vàng
    } else {
      style.backgroundColor = '#ffc2c2'; // đỏ
    }

    style.width = `${w.toString()}%`;

    // console.log(style);
    return style;
  }
  componentWillMount() {
    let fromDate = moment(this.props.responeGetDay, 'DD-MM-YYYY').format('YYYY-MM-DD');
    let toDate = this.converDate(fromDate, 3);
    let get_trip = this.props.responeLogin.trip._bodyInit;
    let user = this.props.responeLogin.user;
    let token = this.props.responeLogin.token;
    let trip = JSON.parse(get_trip);
    let params = {
      access_token: token,
      company_id: user.data.CompId,
      route_id: trip.data[0][0],
      from_date: fromDate,
      to_date: toDate,
      groups: 'selling_configs,fare_configs,statistic'
    }
    this.props.getConfigurationOverview(params);
  }
  onPress = (item) => {
    console.log(item);
    this.setState(previousState => {
      return {
        checked: !previousState.checked,
      };
    });
  }
  converDate = (date, day) => {
    let Date = moment(date).utc();
    let tomorrow = Date.add(day, 'days');
    let tomorrowDate = moment(tomorrow).format("YYYY-MM-DD");
    return tomorrowDate;
  }
  dayOfWeek = (date) => {
    var date = moment(date);
    var dow = date.day();
    switch (dow) {
      case 0:
        return 'Chủ nhật';
        break;
      case 1:
        return 'Thứ 2';
        break;
      case 2:
        return 'Thứ 3';
        break;
      case 3:
        return 'Thứ 4';
        break;
      case 4:
        return 'Thứ 5';
        break;
      case 5:
        return 'Thứ 6';
        break;
      case 6:
        return 'Thứ 7';
        break;
      default:
        break;
    }
  }
  renderHeadTable = (dates) => {
    const { columnHeader, headerTextStyle } = styles;
    let result = null;
    if (dates) {
      result = dates.map((item, index) => {
        let date = moment(item, 'YYYY-MM-DD').format('DD/MM');
        return (
          <Col style={columnHeader} key={index}>
            <Text style={headerTextStyle}>{this.dayOfWeek(item)}</Text>
            <Text style={headerTextStyle}>{date}</Text>
          </Col>
        );
      });
    }
    return result;
  }
  show =() => {
    console.warn('ahihi');
  }
  renderSeat(data) {
    const { columnStyle, columnTextStyle, seatOccupancyStyle } = styles;
    let total = null;
    let booking = null;
    return data.map((trip, i) => {
     if (trip && trip.configCustom) {
      total =  trip.configCustom.selling_configs.selling_configs[2].total;
      booking = trip.configCustom.statistic ? trip.configCustom.statistic : 0;
     }
      const id = i; // trip.id
      if (trip.isShow) {
        return (
          <Col key={id}   >
            <View style={[seatOccupancyStyle, SeatOverview.calculateSeatStyle(6,total)]} />
            <Text style={columnTextStyle}>{booking}/{total} chỗ</Text>
          </Col>
        );
      }
      else {
        return (
          <Col key={id} style={columnStyle}>
            {/* <View style={[seatOccupancyStyle, SeatOverview.calculateSeatStyle(trip)]} />
            <Text style={columnTextStyle}>{trip.bookedQty}/{trip.totalQty} chỗ</Text> */}
            <Text>AAAA</Text>
          </Col>
        );
      }
    });
  }
  renderDataGrid(data) {
    const { columnStyle, columnTextStyle } = styles;

    return data.map((item, index) => {
      return (
        <Grid key={index}>
          <Col style={columnStyle}>
            <Text style={columnTextStyle}>{item.time}</Text>
          </Col>
          {this.renderSeat(item.data)}
        </Grid>);
    });
  }
  converDate (date, day) {
    let Date = moment(date).utc();
    let tomorrow = Date.add(day, 'days');
    let tomorrowDate = moment(tomorrow).format("YYYY-MM-DD");
    return tomorrowDate;
  }
  setUpTime =(data) => {
    let arr = [];
    let result = [];
    data.forEach((date, index) => {
      date.times.forEach((time) => {
        arr.push(time.time);
      });
    });
    result = arr.filter(function(item, pos) {
      return arr.indexOf(item) == pos;
    })
    return result.sort();
  }
  setUpAllDataToRender = (times, dates) => {  
    let result = [];
    times.forEach((time) => {
      let data = [];
      dates.forEach((date) => {
        let type = {};
        date.times.forEach((item) => {
          if(item.time === time) {
            type.isShow = true;
            type.configCustom = item.configs;
          }
        });
        data.push(type);
      });
      result.push({
        time: time,
        data: data
      });
    });
    return result;
  }
  showActionSheet = () => {
    console.warn('ahihi');
    this.ActionSheet.show()
  }
  render() {
    let response = this.props.responeGetConfigurationOverview;
    var dates = moment(this.props.responeGetDay, 'DD-MM-YYYY').format('YYYY-MM-DD');
    var times = dates.times;
    let tomorrowDate = this.converDate(dates, 2);
    let nextTomorrowDate = this.converDate(dates, 3);
    let ListDates = [dates, tomorrowDate, nextTomorrowDate];
    if (Object.keys(response).length > 0) {
      var trip_overview = response.data.trip_overview.dates;
      if (trip_overview.length < 3 && trip_overview.length > 0) {
        for (let i = 0; i < ListDates.length; i ++ ) {
          var count = 0;
          for (let j = 0; j < trip_overview.length; j++) {
            if (trip_overview[j].date !== ListDates[i]) {
              count ++;
            }
          }
          if (count === trip_overview.length) {
            trip_overview.push({
              date: ListDates[i],
              times: []
            });
          }
        }
      }
      trip_overview.sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);} ); 
      var result = this.setUpTime(trip_overview);
      var data = this.setUpAllDataToRender(result,trip_overview);
    }
    const options = [ 'Cancel', 'Apple', 'Banana', 'Watermelon', 'Durian' ];
    const CANCEL_INDEX = 0
    const {
      containerStyle,
      tableStyle,
      columnHeader,
      headerTextStyle,
    } = styles;
    return (
      <View style={containerStyle}>
        <Grid style={tableStyle}>
          {dates ? <Col style={columnHeader}>
            <Text style={headerTextStyle}>CHUYẾN</Text>
          </Col> : null}
          {ListDates ? this.renderHeadTable(ListDates) : null}
        </Grid>
        <Content>
          {data ? this.renderDataGrid(data) : null}
          <ActionSheet
           options={options}
           cancelButtonIndex={CANCEL_INDEX}
          ref={o => this.ActionSheet = o}
        />
        </Content>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
  tableStyle: {
    flex: 0,
  },
  columnHeader: {
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d9d8dc',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7E7E7E'
  },
  columnStyle: {
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d9d8dc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnTextStyle: {
    fontSize: 12,
    fontWeight: '400',
  },
  seatOccupancyStyle: {
    position: 'absolute',
    alignSelf: 'stretch',
    top: 0,
    left: 0,
    bottom: 0,
  },
  rowButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    marginRight: 20
  }
};
const mapStateToProps = (state) => {
  return {
    responeLogin: state.loginReducers,
    responeGetDay: state.getDayReducers,
    responeGetConfigurationOverview: state.getConfigurationOverview
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    getConfigurationOverview: (params) => {
      dispatch(getConfigurationOverview(params));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SeatOverview);
