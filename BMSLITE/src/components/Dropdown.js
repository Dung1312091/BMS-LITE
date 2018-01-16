import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ListView, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { getConfigurationOverview } from '../actions/ConfigurationOverview';
import { changeRouteId } from '../actions/changeRouteId';
import ModalDropdown from 'react-native-modal-dropdown';
class Dropdown extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedItem: {},
      data: {}
    };
  }
  converDate = (date, day) => {
    let Date = moment(date).utc();
    let tomorrow = Date.add(day, 'days');
    let tomorrowDate = moment(tomorrow).format("YYYY-MM-DD");
    return tomorrowDate;
  }
  onDropdownSelect(index, value) {
    this.setState({
      selectedItem: { id: index, value: value }
    });
    let user = this.props.responeLogin.user;
    let token = this.props.responeLogin.token;
    let fromDate = moment(this.props.responeGetDay, 'DD-MM-YYYY').format('YYYY-MM-DD');
    let toDate = this.converDate(fromDate, 3);
    let params = {
      access_token: token,
      company_id: user.data.CompId,
      route_id: value[0],
      from_date: fromDate,
      to_date: toDate,
      groups: 'selling_configs,fare_configs,statistic'
    }
    this.props.changeRouteId(value[0]);
    console.log('onDropdownSelect params===>',params);
   this.props.getConfigurationOverview(params);
  }

  renderRow(rowData,rowID, highlighted) {
    return (
      <TouchableHighlight>
        <View style={[styles.dropdownRowStyle, highlighted ? styles.highlightItemStyle : {}]}>
          <Text style={styles.textStyle}>
            {rowData[2]}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  componentWillMount() {
      let get_trip = this.props.responeLogin.trip._bodyInit;
      let trip = JSON.parse(get_trip);
      console.log(trip);
      this.setState({
        selectedItem: { id: 1, value: trip.data[0] },
        data: trip.data
      });
  }
  render() {
    return (
      <ModalDropdown
        style={styles.containerStyle}
        dropdownStyle={styles.dropdownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
        options = {this.state.data}
        animated={false}
        renderRow={(rowData, rowID, highlighted) => this.renderRow(rowData, rowID, highlighted)}
        onSelect={(idx, value) => this.onDropdownSelect(idx, value)}
      >
        <Text style={styles.textStyle}>{this.state.selectedItem.value[2]}</Text>
        <Icon name="md-arrow-dropdown" style={styles.iconStyle} />
      </ModalDropdown>
    );
  }
}

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#cfced2',
    padding: 10,
    backgroundColor: '#fff',
  },
  blockStyle: {
    flex: 1,
  },
  iconStyle: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: '#666',
    fontSize: 22,
  },
  textStyle: {
    marginRight: 20,
  },
  dropdownStyle: {
    height: 250,
    marginTop: 10,
  },
  dropdownRowStyle: {
    padding: 10,
  },
  dropdownTextStyle: {
    fontSize: 14,
  },
  highlightItemStyle: {
    backgroundColor: '#ccc',
  },
};
const mapStateToProps = (state) => {
  return {
    responeLogin: state.loginReducers,
    responeGetDay: state.getDayReducers
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    getConfigurationOverview: (params) => {
      dispatch(getConfigurationOverview(params));
    },
    changeRouteId: (route_id) => {
      dispatch(changeRouteId(route_id));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
