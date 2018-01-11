import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Spinner } from 'native-base';
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

class RunAppScene extends React.Component {
    componentWillMount(){
    
  }
    render() {
        return (
            <View style={styles.container}>
                    <Spinner color='red' />
            </View>
        );
    }
}

export default RunAppScene;