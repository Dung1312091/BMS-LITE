import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Text, Grid, Col } from 'native-base';

import sampleTripData from '../utils/sample_trip.json';

class SeatOverview extends Component {
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
        </Col>
      );
    });
  }

  renderDataGrid() {
    const { columnStyle, columnTextStyle } = styles;

    return sampleTripData.map((item) => {
      return (
        <Grid key={item.tripTime}>
          <Col style={columnStyle}>
            <Text style={columnTextStyle}>{item.tripTime}</Text>
          </Col>
          {this.renderSeat(item.tripDates)}
        </Grid>);
    });
  }
  componentWillMount() {
    console.log('SeatOverview run==>');
}
  componentDidMount() {
    console.log('aaa');
  }
  render() {
      console.log('bat dau render');
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
};

export default SeatOverview;
