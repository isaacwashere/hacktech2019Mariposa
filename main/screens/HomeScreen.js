import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements'
import HomeEventList from '../components/HomeEventList'
const axios = require('axios');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      allFriendsEvents: []
    }
  }


  componentWillMount() {
    axios.post(`https://mariposa.jtinker.org/api/user/events/invited`, {username:'justin',password:'password'})
      .then(res => {
        const allFriendsEvents = res.data;
        this.setState({ allFriendsEvents });
        console.log(this.state.events);
      })

  }

  render() {
    return (
      <ScrollView style ={ styles.container }>
        <Header 
          centerComponent={{ text: 'Buddy Events', style: { color: '#0075FF' } }}
          rightComponent={{ icon: 'home', color: '#0075FF' }}
          containerStyle={{
            backgroundColor: '#FFFFFF',
            justifyContent: 'space-around',
          }}
        />
        <View style ={ styles.view } />
        <HomeEventList
          myFriendsEventsProp = { this.state.allFriendsEvents }
        />
      </ScrollView>
    );
  }

} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});



