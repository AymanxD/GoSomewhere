import { StackNavigator } from 'react-navigation';

import Signin from '../screens/login_screen';
import Splash from '../screens/splash_screen';
import Map from '../screens/map_view_screen';
import Event from '../screens/event_details_screen';
import SignUp from '../screens/sign_up_screen';
import ListView from '../screens/list_view_screen';
import Comments from '../screens/comment_screen';
import PickCity from '../screens/pick_city_screen';


export default StackNavigator({
  Splash: {
    screen: Splash
  },
  Signin: {
    screen: Signin
  },
  SignUp: {
    screen: SignUp
  },
  Map: {
    screen: Map
  },
  ListView: {
    screen: ListView
  },
  Event: {
    screen: Event
  },
  Comments: {
    screen: Comments,
  },
  PickCity: {
      screen: PickCity,
  },
}, {
  headerMode: 'none'
});
