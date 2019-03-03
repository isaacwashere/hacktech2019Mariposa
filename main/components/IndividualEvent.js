import React from 'react' 
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'


export default class IndividualEvent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let myProps = this.props

    return(
      <View>
        <Text>{ myProps.publicEProp.name }</Text>
        <Text>Organizer: { myProps.publicEProp.organizer }</Text>
        <Text>Going: { myProps.publicEProp.going.length }</Text>
        <Text>Status: { myProps.publicEProp.publicity }</Text>
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
