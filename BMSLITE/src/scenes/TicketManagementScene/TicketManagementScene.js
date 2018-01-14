import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class TicketManagementScene extends React.Component {
    componentWillMount() {
        
    }
    render () {
      console.log('TicketManagementScene');
        return (
            <View style={styles.container}>
              <Text style={styles.welcome}>
              TicketManagementScene
              </Text>
              <ModalDropdown options = {['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1']}>

              </ModalDropdown>
           </View>
);
}
}

export default TicketManagementScene;