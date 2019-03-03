
import React from 'react' 
import { View, Text, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import IndividualEvent from '../components/IndividualEvent'

export default class NewEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName:"",
      date: Date.now()
    }
  }

componentDidMount() {
    axios.post(`https://mariposa.jtinker.org/api/event/create`, {username:'justin', password:'password', name: `${ this.state.eventName }`, date: Date.now()})
      .then(res => {
        const events = res.data;
        this.setState({ events });
      })

  }




  render() {
    return(
      <Card
        title="New Event"
      >
        <View>
          <Text>Event Name: 
            <TextInput
              placeholder="Go skiing with friends" 
              onChangeText={( eventName ) => this.setState({ eventName })}
            />
          </Text>
        </View>
      </Card>
    )
  }


}



