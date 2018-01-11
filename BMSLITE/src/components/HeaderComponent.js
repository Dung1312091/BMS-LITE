import React, { Components } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Header, Left, Right, Button, Icon, Title, Body } from 'native-base';
class HeaderComponent extends React.Component {
    render() {
        return (
            <Header>
                <Left >
                    <Button transparent>
                        <Icon name="md-add" />
                    </Button>
                </Left>
                <Body >
                    <Title >Lịch bán vé</Title>
                </Body>
                <Right >
                    <Button transparent>
                        <Icon name="ios-more-outline" />
                    </Button>
                </Right>
            </Header>
        );

    }

}
export default HeaderComponent;