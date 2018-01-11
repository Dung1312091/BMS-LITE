import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ListView } from 'react-native';
import { Icon } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';
class Dropdown extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedItem: {}
    };
  }
  onDropdownSelect(index, value) {
    console.log('value==>', value);
    this.setState({
      selectedItem: { id: index, value: value }
    });
  }


  renderRow(rowData, highlighted) {
    // const evenRow = rowID % 2;
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
    const { defaultIndex, defaultValue } = this.props;
    if (defaultValue) {
      this.setState({
        selectedItem: { id: defaultIndex, value: defaultValue },
      });
    } else {
      this.setState({
        selectedItem: { id: -1, value: 'Tùy chọn...' },
      });

    }
  }
  render() {
    const { data } = this.props;
    return (
      <ModalDropdown
        style={styles.containerStyle}
        dropdownStyle={styles.dropdownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
        options={data}
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
    height: 'auto',
    marginTop: 10,
  },
  dropdownRowStyle: {
    padding: 10,
  },
  dropdownTextStyle: {
    fontSize: 14,
  },
  highlightItemStyle: {
    // backgroundColor: '#ccc',
  },
};

export default Dropdown;
