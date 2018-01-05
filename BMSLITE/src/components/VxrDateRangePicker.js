import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from 'native-base';
import Dates from 'react-native-dates';
import moment from 'moment';

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

class VxrDateRangePicker extends Component {
  constructor() {
    super();

    this.state = {
      date: null,
      focus: 'startDate',
      startDate: null,
      endDate: null,
    };
  }

  onCloseModal() {
    const { onDateSelected } = this.props;

    if (onDateSelected) { onDateSelected(this.state); }
  }

  render() {
    const isDateBlocked = date =>
      date.isBefore(moment(), 'day');

    const onDatesChange = ({ startDate, endDate, focusedInput }) => {
      console.log('onDatesChange');
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate }));
    };

    const onDateChange = ({ date }) => {
      console.log('onDate Change');
      this.setState({ ...this.state, date });
    }
      

    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.props.visible}
        onRequestClose={() => console.log('Modal has been closed.')}
      >

        <View style={styles.container}>
          {/* <Dates
            onDateChange={onDateChange}
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusedInput={this.state.focus}
            range
          /> */}
          <Dates
            date={this.state.date}
            onDatesChange={onDateChange}
            isDateBlocked={isDateBlocked}
          />
          {this.state.date && <Text style={styles.date}>{this.state.date && this.state.date.format('LL')}</Text>}
          <Text style={[styles.date, this.state.focus === 'startDate' && styles.focused]}>{this.state.startDate && this.state.startDate.format('LL')}</Text>
          <Text style={[styles.date, this.state.focus === 'endDate' && styles.focused]}>{this.state.endDate && this.state.endDate.format('LL')}</Text>
          <View style={styles.footer}>
            <Button block light onPress={() => this.onCloseModal()}>
              <Text>Đồng ý</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}
export default VxrDateRangePicker;
