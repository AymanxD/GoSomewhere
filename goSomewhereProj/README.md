# GoSomewhere
Planning a night out? See all the events in select Canadian cities. View the events in a list view or map view. GoSomewhere!

#### Authors and Contributors:
- Andrea Christians
- Matthew Hemming
- Ayman Mohatarem
- Siddhant Bhardwaj
- Andrey Almabekov



## Libraries


**axios(^0.18.0):** This component was used to call the REST API endpoints. The plugin sends the headers with a request that authorizes users in the backend. It is more convenient and clean when compared to the regular fetch function of the react/react-native package. Source [here](https://github.com/axios/axios).

**eslint-plugin-react-native(^25.0.0):** Linter to help organize code according to convention. Source [here](https://www.npmjs.com/package/eslint-plugin-react-native).

**react-native(^0.52.0):** Framework to create native applications based on JavaScript for both iOS and Android. Source [here](https://github.com/google/gson).

**react-native-event-listeners(^1.0.3):** The event-listener triggers events from one component to respond in other components to complete a specified task. In this case, we are listening to a toggleMenu event in the Sidebar which is triggered from several other components. Source [here](https://github.com/meinto/react-native-event-listeners).

**react-native-flexi-radio-button(^0.2.2):** The React-Native default components do not contain any radio buttons. Thus, this package was used to implement radio buttons in the filter modal. Source [here](https://github.com/thegamenicorus/react-native-flexi-radio-button).

**react-native-google-maps-directions(^1.1.2):** Used to create the navigation portion of the application from the event-details-screen so that users can navigate to the event using google maps. Source [here](https://github.com/tiaanduplessis/react-native-google-maps-directions).

**react-native-is-iphonex(^1.0.1):** This plugin was used for the camera screen to provide specific padding if the device is an IPhoneX. This was recommended in the original Expo camera documentation. Source [here](https://www.npmjs.com/package/react-native-is-iphonex).

**react-native-material-textfield(^0.12.0):** In order to conform with Google's aesthetic material design standards, this component was added. The React-Native Material UI doesn't style the text input fields. Source [here](https://github.com/n4kz/react-native-material-textfield).

**react-native-material-ui(^1.20.0):** The Material UI was used to style the application according to Google's aesthetic material design standard. This plugin helps to design components easily and thus avoid manually adding styles for the components that conform to convention. Source [here](https://github.com/xotahal/react-native-material-ui).

**react-native-modal(^5.4.0):** Used to create the Filter Modal. Source [here](https://github.com/react-native-community/react-native-modal).

**react-native-side-menu(^1.1.3):** This component was used to keep the links of our main components in the left drawer. Source [here](https://github.com/react-native-community/react-native-side-menu).

**react-native-vector-icons(^4.5.0):** Used for the range of icons that were available and customizable in the Event-Details-Screen. It has a series of sub-libraries and specifically Entypo, Material Community Icons and Material Icons were the ones that were used in this application. Additionally, the React Native Material UI works well with Vector Icons-so this was an added benefit. Source [here](https://github.com/oblador/react-native-vector-icons).

**react-navigation(^1.0.3):** Allows to navigate and pass data between screens. Source [here](https://github.com/wix/react-native-navigation).

## Installation Notes
#### Requirements:
- Mobile phone/application running Android 4.1 and up.

#### Built with:
- React Native
- Expo 25.0.0- Android Emulator
- Node 8.9.4 - Installer

#### Instructions:
- Download the Expo app for either iOS or Android
- Navigate to project directory in the terminal
- Run 'npm install'
- Run 'npm start'
- Use Expo app to scan the QR code



## Code Examples

**Problem 1: The list view and map view could not access and manipulate the same set of filtered and unfiltered events.**

We retrieved our events from our backend through an axios API call. We then saved the events retrieved from the backend in AsyncStorage. AsyncStorage allows any elements stored in it to persist throughout the whole application,
thus both the list-view and map-view could access and filter the same set of events. We again used AsyncStorage to store all of the user filtered events.
Since these filtered events were also stored in AsyncStorage, they could also be manipulated by both the list view and map view.

        axios.get('/events')
            .then(async (response) => {

                // Saves events from the API in the events state and AsyncStorage
                this.setState({events: response.data}, () => {
                    AsyncStorage.setItem('originalEvents', JSON.stringify(this.state.events));
                });
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    Alert.alert(JSON.stringify(error.response.data));
                } else {
                    Alert.alert("catching exception", JSON.stringify(error));
                }
            });

**Problem 2: Switching from MapBox to Mapview.**

Initially, we decided to implement MaxBox, however this proved to be troublesome with Expo. To implement our application with MapBox, some configuration changes neeeded to done within the Android Java file. Instead, we used Expo's Mapview which uses React-Native-Maps which does not require any changes to native Java files.

                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: this.state.curr_city_lat,
                            longitude: this.state.curr_city_long,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    >
                        {this.state.events.map((event) => {
                            return (
                                <MapView.Marker
                                    coordinate={{latitude: event['latitude'], longitude: event['longitude']}}
                                    key={event['id']}
                                    onCalloutPress={()=>{
                                        this.props.navigation.navigate('Event', { event: event });
                                    }}>
                                    <MapView.Callout style={{ width: 300 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{event['title']}</Text>
                                        <Text>{event['description'].substring(0,event['description'].indexOf(".",100)+1)}</Text>
                                    </MapView.Callout>
                                </MapView.Marker>
                            )
                        })}
                    </MapView>

## Feature Section
#### Features
- Sign up and login in with or without Facebook O-Auth
- Displays events from Facebook API and Eventbrite API
- View the event's in a list-view or map-view
- Pick your city with support for Halifax and Toronto
- Users can navigate to the event
- Users can leave comments, share and signal whether they are attending or not
- Camera support for profile picture
- Ability to search events based on a text field, distance to event, and date
- 'Hamburger Menu'

## Final Project Status
Our project has been successful. We have a working backend. Push notifications is the only feature that is left to be added (Bonus feature). In the future, we would like to do Natural Langauge Processing from the Twitter API. The app will be tested with users to determine its market viability.

#### Minimum Functionality
- Sign up screen for the user to create an account. The screen takes username, email address, and password. [Completed]
- Login screen with two supported fields: username and password. [Completed]
- 'Go Somewhere' will be active in Halifax. [Completed]
- Events displayed with descriptions in list-view. [Completed]
- A screen for each event (event-details-screen) which contains the date of event, a generic photo for each of the event categories, and details about the venue. Businesses will be separated by category and will have category picture and description associated with them. [Completed]


#### Expected Functionality
- Events displayed with descriptions in map-view and list-view. The user can switch between map and list-view. [Completed]
- Search bar at the top of the map-view and list-view screen to search for events. [Completed]
- A menu bar at the bottom of the map-view and list-view screen. There will be three icons on the menu bar: switch city, categories (filter for types of events), and a toggle from list-view to map-view (vice-versa). [Completed]
- Find your current location button for map-view using location services. [Completed]
- Users have access to GPS directions to an event. [Completed]
- The map-view has event bubbles that show the number of people showing interest about an event. [Completed]
- Event-details-screen will have a list of all the Tweets which mention the event. (Comments instead of Tweets) [Completed]
- The event-details-screen has an option to say the user is attending the event. [Completed]



#### Bonus Functionality
- Login screen that supports Open Authorization from Google, Facebook, and Twitter. [Completed]
- User profile screen will be added which includes a personal photo, and other text based information. [Completed]
- 'Go Somewhere' will be active in Halifax and Toronto. [Completed]
- A 'Pick your City' screen. This screen will let you choose Halifax or Toronto. If the user has location services, then this screen will be bypassed and the correct city will be chosen. [Completed]
- Push notifications to inform the user of events in their area. [To do]
- Event-details-screen automates its data collection of the venue photos, category, and details from an API. [Completed]
- Within the menu bar, the categories feature has the ability to filter based on the category data fetched from an API.  [Completed]

## Backend
- The backend for this app was done in Ruby On Rails which serves the REST API's. The application is deployed on the Heroku Platform which provides easy deployment on free instance. The project is on github [here](https://github.com/siddhantbhardwaj/gosomewhere_backend). Additionally, the web services are deployed in this [URL](https://gosomewhere-backend.herokuapp.com).
- Example endpoint: https://gosomewhere-backend.herokuapp.com/events. The endpoints require the user to be authenticated first and then use the token which is recieved after the Sign-In or Sign-Up process.
- In addition to the Ruby on Rails application, an open source Express.js based web [application](https://github.com/tobilg/facebook-events-by-location) was used to fetch the Facebook events based on the user's location. This Express.js-based app is forked [here](https://github.com/siddhantbhardwaj/go-somewhere-fb) and deployed as a web service on Heroku [here](https://go-somewhere-fb.herokuapp.com).

## Sources

- [1] A. Siromoney, Disabling Buttons in React Native Arpith Siromoney Medium, Medium, 15-Dec-2015. [Online]. Available: https://medium.com/@arpith/disabling-buttons-in-react-native-dfd683c25634. [Accessed: 04-Apr-2018].

- [2] axios/axios, GitHub, 10-Mar-2018. [Online]. Available: https://github.com/axios/axios. [Accessed: 02-Apr-2018].

- [3] "Draw horizontal rule in React Native", Stackoverflow.com, 2018. [Online]. Available: https://stackoverflow.com/questions/43380260/draw-horizontal-rule-in-react-native. [Accessed: 02- Apr- 2018].

- [4] expo/camera, GitHub. [Online]. Available: https://github.com/expo/camerja/blob/master/App.js. [Accessed: 02-Apr-2018].

- [5] Facebook, Facebook - Expo Documentation. [Online]. Available: https://docs.expo.io/versions/latest/sdk/facebook.html. [Accessed: 02-Apr-2018].

- [6] Handle response and callback function · Issue #1027 · axios/axios, GitHub. [Online]. Available: https://github.com/axios/axios/issues/1027. [Accessed: 04-Apr-2018]

- [7] Intellicode, Intellicode/eslint-plugin-react-native, GitHub, 11-Jan-2018. [Online]. Available: https://github.com/Intellicode/eslint-plugin-react-native. [Accessed: 02-Apr-2018].

- [8] meinto/react-native-event-listeners, GitHub. [Online]. Available: https://github.com/meinto/react-native-event-listeners. [Accessed: 02-Apr-2018].

- [9] Modal · React Native, React Native Blog ATOM. [Online]. Available: https://facebook.github.io/react-native/docs/modal.html. [Accessed: 02-Apr-2018].

- [10] n4kz/react-native-material-textfield, GitHub, 18-Jan-2018. [Online]. Available: https://github.com/n4kz/react-native-material-textfield. [Accessed: 02-Apr-2018].

- [11] oblador/react-native-vector-icons, GitHub. [Online]. Available: https://github.com/oblador/react-native-vector-icons. [Accessed: 02-Apr-2018].

- [12] Question: Implementing a splash screen with React Navigation · Issue #156 · react-navigation/react-navigation, GitHub. [Online]. Available: https://github.com/react-navigation/react-navigation/issues/156. [Accessed: 02-Apr-2018].

- [13] react-native-community/react-native-side-menu, GitHub, 28-Feb-2018. [Online]. Available: https://github.com/react-native-community/react-native-side-menu. [Accessed: 02-Apr-2018].

- [14] React navigation goback() and update parent state, Stack Overflow. [Online]. Available: https://stackoverflow.com/questions/44223727/react-navigation-goback-and-update-parent-state/44227835. [Accessed: 04-Apr-2018].

- [15] react-native-is-iphonex, npm. [Online]. Available: https://www.npmjs.com/package/react-native-is-iphonex. [Accessed: 02-Apr-2018].

- [16] Sample Codes (JavaScript), Distance. [Online]. Available: https://www.geodatasource.com/developers/javascript.[Accessed: 04-Apr-2018].

- [17]  thegamenicorus/react-native-flexi-radio-button, GitHub, 25-Oct-2017. [Online]. Available: https://github.com/thegamenicorus/react-native-flexi-radio-button. [Accessed: 02-Apr-2018].

- [18] tiaanduplessis/react-native-google-maps-directions, GitHub. [Online]. Available: https://github.com/tiaanduplessis/react-native-google-maps-directions. [Accessed: 02-Apr-2018].

- [19] tobilg/facebook-events-by-location, GitHub, 19-Feb-2018. [Online]. Available: https://github.com/tobilg/facebook-events-by-location. [Accessed: 03-Apr-2018].

- [20] "TouchableOpacity onPress only fires when clicking on content inside · Issue #1516 · Microsoft/react-native-windows", GitHub, 2018. [Online]. Available: https://github.com/Microsoft/react-native-windows/issues/1516. [Accessed: 02- Apr- 2018].

- [21] xotahal/react-native-material-ui, GitHub. [Online]. Available: https://github.com/xotahal/react-native-material-ui. [Accessed: 02-Apr-2018].
