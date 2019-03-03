
import React from 'react' 
import { View, Text, ScrollView, Image } from 'react-native'
import { Card, Button } from 'react-native-elements'
import IndivPrivateEventList from '../components/IndivPrivateEventList'


export default class ProfileMain extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <ScrollView>
        <Card
          title="My Info"
        >
          <Text>This is some information</Text>
          <Text>This is some information</Text>
          <Text>This is some information</Text>
          <Text>This is some information</Text>
          <Text>This is some information</Text>
          <Image 
            style ={{alignContent: "flex-end"}}
            source={{uri: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiCh9rNsebgAhVyCTQIHebhAEEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F1478011%2Favatar_person_profile_avatar_user_user_avatar_icon&psig=AOvVaw3Q_7HDcETU2E1jy25vl3Gv&ust=1551716780919216'}}
            />
        </Card>

    <Card>
      <Button 
        title="New Event"
        type = "outline"
        raised = { true }
      />
    </Card>



        <Card
          title="Hosting Events"
        >
          <ScrollView horizontal ={true}>
            { this.props.myHostingEvents.map(function(z, a){
              return (
                <Card
                  borderRadius = { 9 }
                  key = { Math.random() }
                >
                  <IndivPrivateEventList
                    privateEProp = { z }
                    key = { `pEventID${ a }` }
                  />                  
                </Card>

              )
            })

            }

          </ScrollView>
        </Card>


        <Card
          title="Friends Events"
        >
                  <ScrollView horizontal ={true}>
            { this.props.myEvents.map(function(z, a){
              return (
                <Card
                  borderRadius = { 9 }
                  key = { Math.random() }
                >
                  <IndivPrivateEventList
                    privateEProp = { z }
                    key = { `pEventID${ a }` }
                  />                  
                </Card>

              )
            })

            }

          </ScrollView>


        </Card>
      </ScrollView>
    )
  }
}

      
