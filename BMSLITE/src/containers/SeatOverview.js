import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Content, Text, Grid, Col, Button, CheckBox } from 'native-base';
import { connect } from 'react-redux';
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

  renderSeat(dates) {
    const { columnStyle, columnTextStyle, seatOccupancyStyle } = styles;

    return dates.map((trip, i) => {
      const id = i; // trip.id
      return (
        <Col key={id} style={columnStyle}>
          <View style={[seatOccupancyStyle, SeatOverview.calculateSeatStyle(trip)]} />
          <Text style={columnTextStyle}>{trip.bookedQty}/{trip.totalQty} chỗ</Text>
          <Text style={columnTextStyle}>200k/10%</Text>
        </Col>
      );
    });
  }
  onPress = (item) => {
    console.log(item);
    this.setState(previousState => {
      return {
        checked: !previousState.checked,
      };
    });
  }

  renderDataGrid() {
    const { columnStyle, columnTextStyle } = styles;

    return sampleTripData.map((item, index) => {

      return (
        <Grid key={item.tripTime}>
          <Col style={columnStyle}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={columnTextStyle}>{item.tripTime}</Text>
            </View>
          </Col>
          {this.renderSeat(item.tripDates)}
        </Grid>);
    });
  }
  render() {
    const {
      containerStyle,
      tableStyle,
      columnHeader,
      headerTextStyle,
    } = styles;

    return (
      <View style={containerStyle}>
        <Grid style={tableStyle}>
          <Col style={columnHeader}>
            <Text style={headerTextStyle}>CHUYẾN</Text>
          </Col>
          <Col style={columnHeader}>
            <Text style={headerTextStyle}>Thứ 5</Text>
            <Text style={headerTextStyle}>26/10</Text>
          </Col>
          <Col style={columnHeader}>
            <Text style={headerTextStyle}>Thứ 6</Text>
            <Text style={headerTextStyle}>27/10</Text>
          </Col>
          <Col style={columnHeader}>
            <Text style={headerTextStyle}>Thứ 7</Text>
            <Text style={headerTextStyle}>28/10</Text>
          </Col>
        </Grid>
        <Content>
          {this.renderDataGrid()}
        </Content>
        <View style={[styles.rowButtonStyle, { display: 'none' }]}>
          <Button style={styles.buttonStyle}>
            <Text>Thay đổi chuyến</Text>
          </Button>
          <Button>
            <Text>Hủy chuyến</Text>
          </Button>
        </View>
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
