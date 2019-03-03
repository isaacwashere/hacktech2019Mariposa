
import React from 'react' 
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'


export default class IndivHomeEvent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let myProps = this.props

    return(
      <View>
        <Text>{ myProps.friendsEProp.name }</Text>
        <Text>Organizer: { myProps.friendsEProp.organizer }</Text>
        <Text>Going: { myProps.friendsEProp.going.length }</Text>
        <Text>Status: { myProps.friendsEProp.publicity }</Text>
        <Button                      
          title = "Interested"
          type  = "outline"
          raised= { true }
        />
        <Button
          title = "Attend"
          type  = "outline"
          raised= { true }
        />
      </View>
    )
  }
}


