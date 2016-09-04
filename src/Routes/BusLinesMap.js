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
import shallowCompare from 'react-addons-shallow-compare'
import Meteor from 'react-native-meteor'
import MapView from 'react-native-maps';

// Components
import MapBusMarker from '~/Components/MapBusMarker'

// Containers
import BusLinesContainer from '~/Containers/bus_lines'
import BusLineCurrentStopsContainer from '~/Containers/bus_line_current_stops'

@BusLinesContainer
@BusLineCurrentStopsContainer
class BusLinesMap extends Component {
  static defaultProps = {
    busLines: [],
    busLineCurrentStops: [],
  }

  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const currentStops = this.props.busLineCurrentStops
    const busLineStopsGoing = _(currentStops)
      .map(busLine => {
        if(!busLine.currentStops.going) return null

        const busLineStops = _.find(this.props.busLines, { lineNumber: busLine.lineNumber })
        const stop = _.find(_.get(busLineStops, 'stopsGoing'), {address: busLine.currentStops.going.address}) || {}

        if(!stop.coordinates) return null

        return {
          key: stop._id,
          lineNumber: busLine.lineNumber,
          coordinate: stop.coordinates,
          title: stop.address,
          description: stop.stopDescription,
          isCurrentOne: true,
        }
      })
      .filter(stop => stop !== null)
      .map(stop => (
        <MapView.Marker {...stop}>
          <MapBusMarker
            lineNumber={stop.lineNumber}
            isCurrentOne={stop.isCurrentOne}
          />
        </MapView.Marker>
      ))
      .value()

    const busLineStopsComing = _(currentStops)
      .map(busLine => {
        if(!busLine.currentStops.coming) return null

        const busLineStops = _.find(this.props.busLines, { lineNumber: busLine.lineNumber })
        const stop = _.find(_.get(busLineStops, 'stopsComing'), {address: busLine.currentStops.coming}) || {}

        if(!stop.coordinates) return null

        return {
          key: stop._id,
          lineNumber: busLine.lineNumber,
          coordinate: stop.coordinates,
          title: stop.address,
          description: stop.stopDescription,
          isCurrentOne: true,
        }
      })
      .filter(stop => stop !== null)
      .map(stop => {
        <MapView.Marker {...stop}>
          <MapBusMarker
            lineNumber={stop.lineNumber}
            isCurrentOne={stop.isCurrentOne}
          />
        </MapView.Marker>
      })
      .value()

    console.warn(`Loaded ${busLineStopsGoing.length} bus line stops going`)
    console.warn(`Loaded ${busLineStopsComing.length} bus line stops coming`)

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
        {busLineStopsGoing}
        {busLineStopsComing}
      </MapView>
    )
  }
}

export default BusLinesMap
