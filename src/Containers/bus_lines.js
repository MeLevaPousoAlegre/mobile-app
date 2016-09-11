import { compose } from 'react-komposer'
import Meteor from 'react-native-meteor'
import EJSON from 'ejson'
import {
  AsyncStorage,
  View,
} from 'react-native'
import _ from 'lodash'

const BUS_LINE_STORAGE_KEY = '@appData/busLines'

function composer(props, onData){
  AsyncStorage.getItem(BUS_LINE_STORAGE_KEY, (readError, storedBusLines) => {
    if(readError) return console.warn(readError)

    if(_.isEmpty(storedBusLines))
      Meteor.call('busLines/fetchAll', (error, busLines) => {
        if(error) return console.warn('Error', error)

        console.warn(`Read ${busLines.length} bus lines`)
        AsyncStorage.setItem(BUS_LINE_STORAGE_KEY, EJSON.stringify(busLines))
        onData(null, {
          busLines,
          loading: false,
        })
      })
    else {
      console.warn('Read bus lines from storage')
      onData(null, {
        busLines: EJSON.parse(storedBusLines),
        loading: false,
      })
    }
  })

  onData(null, {
    busLines: [],
    loading: true,
  })
}

export default compose(composer, () => <View/>, () => <View/>);
