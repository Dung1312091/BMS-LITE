import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text,Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class FooterTabsIconText extends Component {
  render() {
    return (
      <Footer>
      <FooterTab>
        <Button
          
          
          vertical
          onPress={() => Actions.replace('ticketSchedule')}
        >
          
          <Text >Lịch bán vé</Text>
        </Button>
        <Button
         
         
          vertical
          onPress={() => Actions.replace('ticketManagement')}
        >
          
          <Text >Quản lý vé</Text>
        </Button>
        <Button
          
          
          vertical
          onPress={() => Actions.replace('report')}
        >
         
          <Text>Thống kê</Text>
        </Button>
        <Button
         
         
          badge
          vertical
          onPress={() => Actions.replace('notification')}
        >
          <Badge><Text>1</Text></Badge>
          
          <Text >Thông báo</Text>
        </Button>
        <Button
          
         
          vertical
          onPress={() => Actions.replace('more')}
        >
          
          <Text >Thêm</Text>
        </Button>
      </FooterTab>
    </Footer>
    );
  }
}