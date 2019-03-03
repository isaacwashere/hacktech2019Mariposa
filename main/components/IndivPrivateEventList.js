import React from 'react' 
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'


export default class IndivPrivateEventList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let myProps = this.props

    return(
      <View>
        <Text>{ myProps.privateEProp.name }</Text>
        <Text>Going: { myProps.privateEProp.going.length }</Text>
        <Text>Status: { myProps.privateEProp.publicity }</Text>
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


