import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import ProfileMain from '../components/ProfileMain'
import { Header, Card } from 'react-native-elements'
import { ScrollView } from 'react-native'
import NewEvent from '../components/NewEvent'
const axios = require('axios');

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      privateUsrEvents: [],
      hostingEvents: []
    }
  }


  //for viewing all private events being hosted by the user
  componentWillMount() {
    axios.post(`https://mariposa.jtinker.org/api/user/events/hosting`, {username:'justin', password:'password'})
      .then(res => {
        const hostingEvents = res.data;
        this.setState({ hostingEvents });
      })
      axios.post(`https://mariposa.jtinker.org/api/user/events/invited`, {username:'justin',password:'password'})
        .then(res => {
          const privateUsrEvents = res.data;
          this.setState({ privateUsrEvents });
        })
  }

  render() {
    return(
      <ScrollView>
        <Header 
          centerComponent={{ text: "PROFILE", style: { color: '#0075FF' } }}
          rightComponent={{ icon: 'home', color: '#0075FF' }}
          containerStyle={{
            backgroundColor: '#FFFFFF',
            justifyContent: 'space-around',
          }}
        />
        <ProfileMain
          myHostingEvents = { this.state.hostingEvents } 
          myEvents = { this.state.privateUsrEvents }
        />
 
      </ScrollView>
    )
      
      
  }
}
