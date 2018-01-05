import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import VxrDateRangePicker from '../components/VxrDateRangePicker';

class DateFilterSection extends Component {
  constructor() {
    super();
    this.state = {
      datePickerVisible: false,
    };
  }

  onDateSelected(date) {
    this.setState({ datePickerVisible: !this.state.datePickerVisible });
    console.log(date);
  }

  onSelectDate() {
    this.setState({ datePickerVisible: !this.state.datePickerVisible });
  }

  render() {
    const {
      containerStyle,
      blockStyle,
      iconStyle,
      dateGroupItemContainer,
      dateGroupItem,
    } = styles;

    return (
      <View style={containerStyle}>
        <TouchableOpacity
          onPress={() => this.onSelectDate()}
          style={[dateGroupItemContainer, blockStyle]}
        >
          <Icon name="md-calendar" style={[dateGroupItem, iconStyle]} />
          <Text style={dateGroupItem}>26-28/10/2017</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dateGroupItemContainer}>
          <Text style={dateGroupItem}>Hôm nay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dateGroupItemContainer}>
          <Text style={dateGroupItem}>Tiếp theo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dateGroupItemContainer}>
          <Text style={dateGroupItem}>Trước</Text>
        </TouchableOpacity>
        <VxrDateRangePicker
          visible={this.state.datePickerVisible}
          onDateSelected={() => this.onDateSelected()}
        />
      </View>
    );
  }
}
const styles = {
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
    paddingTop: 12,
    paddingBottom: 12,
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
    
  },
};

export default DateFilterSection;
