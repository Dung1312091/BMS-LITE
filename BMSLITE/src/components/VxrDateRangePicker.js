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
  onCloseModal(date) {
    this.setState({
      visible: false,
      fromDate: moment(date).format('YYYY-MM-DD'),
    });
   this.props.selectDay(date);
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
  cutDayOfDate = (date) => {
    return date.substring(date.length - 2);
  }
  render() {
    let { dateSelected, isdate,fromDate } = this.state;
    let tomorrowDate = this.converDate(dateSelected, 2);
    let nextTomorrowDate = this.converDate(dateSelected, 3);
    let startDay = moment().format("YYYY-MM-DD");
    let textDate = this.cutDayOfDate(fromDate) + '-' + moment(nextTomorrowDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
    let eventDates = [fromDate, tomorrowDate, nextTomorrowDate];
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
export default connect(mapStateToProps, mapDispatchToProps)(VxrDateRangePicker);
