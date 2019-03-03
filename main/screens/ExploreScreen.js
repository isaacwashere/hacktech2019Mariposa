import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements'
import AllEventList from '../components/AllEventList'
const axios = require('axios');

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      publicEvents: []
    }
  }

  componentWillMount() {
    axios.get(`https://mariposa.jtinker.org/api/public/view`)
      .then(res => {
        const publicEvents = res.data;
        this.setState({ publicEvents });
      })
  }

  render() {
    return (
      <ScrollView style ={ styles.container }>
        <Header 
          centerComponent={{ text: 'LOCAL EVENTS', style: { color: '#0075FF' } }}
          rightComponent={{ icon: 'home', color: '#0075FF' }}
          containerStyle={{
            backgroundColor: '#FFFFFF',
            justifyContent: 'space-around',
          }}
        />
        <View style ={ styles.view } />
        <AllEventList
          publicEventsProp = { this.state.publicEvents }
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
