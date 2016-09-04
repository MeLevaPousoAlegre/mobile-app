import React, {
  Component
} from 'react'
import {
  Text, 
  View, 
  ScrollView, 
  StyleSheet,
} from 'react-native'
import Meteor from 'react-native-meteor'
import MapView from 'react-native-maps';
import BusLinesContainer from '~/src/Containers/bus_lines'
import _ from 'lodash'

class BusLinesMap extends Component {
  render() {
    const stopsComing = _(this.props.busLines)
      .map(busLine => {
        return busLine.stopsComing.map(stop => ({
          coordinate: [stop.coordinates.latitude, stop.coordinates.longitude],
          title: stop.address,
          description: stop.stopDescription,
        }) )
      })
      .flatten()
      .value()

    return (
      <MapView
        style={locationStyles.map}
        initialRegion={{
          latitude: -22.262681,
          longitude: -45.940838,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {
          stops.map(stop => <MapView.Marker {...stop}/>)
        }
      </MapView>
    );
  }
}

export default BusLinesContainer(BusLinesMap)
