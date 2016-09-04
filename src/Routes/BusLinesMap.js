import React, {
  Component
} from 'react'
import {
  Text, 
  View, 
  ScrollView, 
  StyleSheet,
} from 'react-native'
import _ from 'lodash'
import Meteor from 'react-native-meteor'
import MapView from 'react-native-maps';

// Components
import MapBusMarker from '~/Components/MapBusMarker'

// Containers
import BusLinesContainer from '~/Containers/bus_lines'

class BusLinesMap extends Component {
  render() {
    const busLineStopsGoing = _(this.props.busLines)
      .map(busLine => {
        return {
          lineNumber: busLine.lineNumber,
          stopsGoing: busLine.stopsGoing.map(stop => ({
            key: stop._id,
            coordinate: stop.coordinates,
            title: stop.address,
            description: stop.stopDescription,
            isCurrentOne: stop.isCurrentOne,
          }) ),
        }
      })
      .value()

    const busLineStopsComing = _(this.props.busLines)
      .map(busLine => {
        return {
          lineNumber: busLine.lineNumber,
          stopsComing: busLine.stopsComing.map(stop => ({
            key: stop._id,
            coordinate: stop.coordinates,
            title: stop.address,
            description: stop.stopDescription,
            isCurrentOne: stop.isCurrentOne,
          }) ),
        }
      })
      .value()

    return (
      <MapView
        style={{
          width: null,
          height: null,
          flex: 1,
        }}
        initialRegion={{
          latitude: -22.262681,
          longitude: -45.940838,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {
          busLineStopsGoing.map(({ stopsGoing, lineNumber }) => {
            return stopsGoing.map(stop => (
              <MapView.Marker {...stop}>
                <MapBusMarker
                  lineNumber={lineNumber}
                  isCurrentOne={stop.isCurrentOne}
                />
              </MapView.Marker>
            ))
          })
        }

        {
          busLineStopsGoing.map(({ lineNumber, stopsGoing }) => {
            return (
              <MapView.Polyline
                key={lineNumber}
                strokeColor={`#${lineNumber}888`}
                coordinates={stopsGoing.map(({ coordinate }) => coordinate)}
              />
            )
          })
        }

        {
          busLineStopsComing.map(({ stopsComing, lineNumber }) => {
            return stopsComing.map(stop => (
              <MapView.Marker {...stop}>
                <MapBusMarker
                  lineNumber={lineNumber}
                  isCurrentOne={stop.isCurrentOne}
                />
              </MapView.Marker>
            ))
          })
        }

        {
          busLineStopsComing.map(({ lineNumber, stopsComing }) => {
            return (
              <MapView.Polyline
                key={lineNumber}
                strokeColor={`#${lineNumber}888`}
                coordinates={stopsComing.map(({ coordinate }) => coordinate)}
              />
            )
          })
        }
      </MapView>
    );
  }
}

export default BusLinesContainer(BusLinesMap)
