import composeWithTracker from 'rn-meteor-containerize';
import Meteor from 'react-native-meteor';

function composer(props, onData){
  const handle = Meteor.subscribe('busLineCurrentStops.all');

  if(handle.ready()){
    onData(null, {
      busLineCurrentStops: Meteor.collection('busLineCurrentStops').find({}),
    })
  } else {
    onData(null, {
      loading: true,
      busLineCurrentStops: [],
    })
  }
}

export default composeWithTracker(composer);
