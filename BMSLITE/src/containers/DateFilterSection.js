import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import VxrDateRangePicker from '../components/VxrDateRangePicker';
import Dropdown from '../components/Dropdown';
import {getToday, nextDay} from '../actions/getDay';
import moment from 'moment';
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
    flex: 0.1
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
class DateFilterSection extends Component {
  constructor() {
    super();
    this.state = {
      CurrentDay: null,
    };
  }
  componentWillMount() {
    this.props.getToday();
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
        <VxrDateRangePicker />
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//       isDate: state.getDayReducers
//   }
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getToday: () => {
//           dispatch(getToday());
//       }
//   };
// }
export default DateFilterSection;
