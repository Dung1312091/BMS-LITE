import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Text, Grid, Col } from 'native-base';

import sampleTripData from '../utils/sample_trip';

class TicketOverview extends Component {
  renderDataGrid() {
    const { columnStyle, columnTextStyle } = styles;

    return sampleTripData.map((item) => {
      const id = [...Array(10)].map(() => Math.random().toString(36)[3]).join('');
      return (
        <Grid key={id}>
          <Col style={columnStyle}>
            <Text style={columnTextStyle}>{item.tripName}</Text>
            <Text style={columnTextStyle}>{item.tripTime}</Text>
            <Text style={columnTextStyle}>{item.tripDate}</Text>
          </Col>
          <Col style={columnStyle}>
            <Text style={columnTextStyle}>{item.ticketCode}</Text>
            <Text style={columnTextStyle}>{item.seatList}</Text>
          </Col>
          <Col style={columnStyle}>
            <Text style={columnTextStyle}>{item.fare}</Text>
          </Col>
          <Col style={columnStyle}>
            <Text style={columnTextStyle}>{item.status}</Text>
          </Col>
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
            <Text style={headerTextStyle}>Mã vé</Text>
          </Col>
          <Col style={columnHeader}>
            <Text style={headerTextStyle}>Tiền vé</Text>
          </Col>
          <Col style={columnHeader}>
            <Text style={headerTextStyle}>Trạng thái</Text>
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

export default TicketOverview;
