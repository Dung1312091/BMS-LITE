import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Content, Text, Grid, Col, Button, CheckBox } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import sampleTripData from '../utils/sample_trip.json';
import { getTrips } from '../actions/getTrips';
const ACCESS_TOKEN = 'access_token';
class SeatOverview extends Component {
  constructor(props) {
    super(props);
  }
  static calculateSeatStyle({ bookedQty, totalQty }) {
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
  onPress = (item) => {
    console.log(item);
    this.setState(previousState => {
      return {
        checked: !previousState.checked,
      };
    });
  }

  renderDataGrid = (dates) => {
    const { columnStyle, columnTextStyle } = styles;
    let times = dates[0].times;
    let result = null;
    result = times.map((item, index) => {
      return (
        <Grid key={index}>
          <Col style={columnStyle}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={columnTextStyle}>{item.time}</Text>
            </View>
          </Col>
          {this.renderSeat(dates)}
        </Grid>
      );
    });
    return result;
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
  render() {
    if (Object.keys(this.props.seatOverview).length > 0) {
      var trip_overview = this.props.seatOverview.data.trip_overview;
    }
    var dates = moment(this.props.responeGetDay, 'DD-MM-YYYY').format('YYYY-MM-DD');
    var times = dates.times;
    let tomorrowDate = this.converDate(dates, 2);
    let nextTomorrowDate = this.converDate(dates, 3);
    let ListDates = [dates, tomorrowDate, nextTomorrowDate];
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
          {/* {dates ? this.renderDataGrid(dates) : null} */}
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
    responeGetTrips: state.getTripReducers,
    responeGetDay: state.getDayReducers
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getTrips: (params) => {
//           dispatch(getTrips(params));
//       }
//   };
// }
export default connect(mapStateToProps, null)(SeatOverview);
