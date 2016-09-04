import composeWithTracker from 'rn-meteor-containerize';
import Meteor from 'react-native-meteor';

function composer(props, onData){
  const handle = Meteor.subscribe('busLines.all');

  if(handle.ready()){
    onData(null, {
      busLines: Meteor.collection('busLines').find({}),
    });
  } else {
    onData(null, {
      loading: true,
      busLines: [],
    });
  }
}

export default composeWithTracker(composer);
