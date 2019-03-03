

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header, Card } from 'react-native-elements'
import AllEventList from '../components/AllEventList'
import IndivHomeEvent from '../components/IndivHomeEvent'

export default class HomeEventList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {


    return(
      <View> 
        {this.props.myFriendsEventsProp.map(function(m, d) {
          return (
            <Card
            borderRadius = { 9 }
            key = { Math.random() }
          >
            <IndivHomeEvent
              friendsEProp = { m } 
              key = { `fEventID${ d }` }
            />
          </Card>



          )

        })



        }
      </View>

    )
  }







}

