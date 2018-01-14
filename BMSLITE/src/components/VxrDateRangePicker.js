import React, { Component } from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'native-base';
import Calendar from 'react-native-calendar'
import moment from 'moment';
import { selectDay } from '../actions/getDay';
const styles = {
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
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
    console.warn('isdate', this.props.isDate);
    this.state = ({
      dateSelected: moment(this.props.isDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      isdate: day
    });
  }
  onCloseModal(date) {
    this.props.onCloseModal(date);
  }
  onDateSelect = (date) => {
    this.setState({
      dateSelected: date
    });
  }
  converDate = (date, day) => {
    let Date = moment(date).utc();
    let tomorrow = Date.add(day, 'days');
    let tomorrowDate = moment(tomorrow).format("YYYY-MM-DD");
    return tomorrowDate;
  }
  render() {
    let { dateSelected, isdate } = this.state;
    let tomorrowDate = this.converDate(dateSelected, 2);
    let nextTomorrowDate = this.converDate(dateSelected, 3);
    let startDay = moment().format("YYYY-MM-DD");
    eventDates = [dateSelected, tomorrowDate, nextTomorrowDate];
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.props.visible}
        onRequestClose={() => console.log('Modal has been closed.')}
      >
        <View style={styles.container}>
          <Calendar

            showEventIndicators
            eventDates={eventDates}
            nextButtonText={'Sau'}
            prevButtonText={'Trước'}
            titleFormat={'MMMM YYYY'}
            showControls
            onDateSelect={(date) => this.onDateSelect(date)}
            customStyle={customStyle}
          />
          <View style={styles.footer}>
            <Button block light onPress={() => this.onCloseModal(dateSelected)}>
              <Text>Đồng ý</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isDate: state.getDayReducers
  }
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectDay: (date) => {
//       dispatch(selectDay(date));
//     }
//   };
// }
export default connect(mapStateToProps, null)(VxrDateRangePicker);
