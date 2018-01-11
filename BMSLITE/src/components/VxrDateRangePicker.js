import React, { Component } from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {selectDay} from '../actions/getDay';
const styles =  StyleSheet.create ({
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
    borderColor: '#d9d8dc',
    borderWidth: 1,
    borderRightWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateGroupItem: {
    marginRight: 5,
    color: '#1365af',
    fontSize: 13,
    
  },
});
class VxrDateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      date: '',
      isDateTimePickerVisible: false,
    });
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    var dateObj = moment(date, 'DD/MM/YYYY');
    var dateFormat = dateObj.format('DD/MM/YYYY');
    this.props.selectDay(dateFormat);
    this._hideDateTimePicker();
  };
  componentWillMount() {
    this.setState({
      date: this.props.isDate
    });
  }
  componentDidMount() {

  }
  comp
  componentWillReceiveProps(nextProps) {
    this.setState({
      date: nextProps.isDate
    });
  }
  render () {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker} style={[styles.dateGroupItemContainer, styles.blockStyle]}>
          <Icon name="md-calendar" style={[styles.dateGroupItem, styles.iconStyle]} />
          {/* <Text style={styles.dateGroupItem}>26-28/10/2017</Text> */}
          <Text style={styles.dateGroupItem}>{this.state.date}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  } 
}
const mapStateToProps = (state) => {
  return {
      isDate: state.getDayReducers
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
      selectDay: (date) => {
          dispatch(selectDay(date));
      }
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(VxrDateRangePicker);
