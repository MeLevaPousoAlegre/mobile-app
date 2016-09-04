import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

function MapBusMarker(props){
  return (
    <View
      style={[style.container, props.isCurrentOne && {
        backgroundColor: 'yellow',
      }]}
    >
      <Text
        style={[style.text, props.isCurrentOne && {
          color: '#333',
        }]}
      >
        {props.lineNumber}
      </Text>
    </View>
  )
}

MapBusMarker.propTypes = {
  lineNumber: PropTypes.string,
  isCurrentOne: PropTypes.bool,
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FF5A5F',
    padding: 5,
    borderRadius: 3,
  },

  text: {
    color: '#fff',
    fontSize: 13,
  },
})

export default MapBusMarker
