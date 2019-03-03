import React from 'react' 
import { View } from 'react-native'
import { Card } from 'react-native-elements'
import IndividualEvent from '../components/IndividualEvent'


export default class AllEventList extends React.Component {

  render() {

    return(
      <View>
        { this.props.publicEventsProp.map(function(e, i) {
          return (
            <Card
              borderRadius = { 9 }
              key = { Math.random() }
            >
              <IndividualEvent
                publicEProp = { e } 
                key = { `eventID${ i }` }
              />
            </Card>
            )
          }) 
        }
      </View>
    )
  }
}

