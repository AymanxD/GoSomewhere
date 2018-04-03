# GoSomewhere
Planning a night out? See all the events in select canadian cities. View the events in a list view or map view. Go somewhere!

#### Authors and Contributors:
- Andrea Christians
- Matthew Hemming
- Ayman Mohatarem
- Siddhant Bhardwaj
- Andrey Almabeko



## Libraries


**axios(^0.18.0):** This component was used to call the REST API endpoints. The plugin sends the headers with a request that authorizes users in the backend. It is more convenient and clean when compared to the regular ‘fetch’ function of the react/react-native package. Source [here](https://github.com/axios/axios)

**eslint-plugin-react-native(^25.0.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**prop-types(^15.6.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react(16.2.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native(0.52.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native-event-listeners(^1.0.3):** Triggers events from one component and responds in other components to complete a specified task. In this case, we are listening to a toggleMenu event in the Sidebar which is triggered from several other components. Source [here](https://github.com/meinto/react-native-event-listeners)

**react-native-flexi-radio-button(^0.2.2):** React native default does not contain any radio buttons. Thus this package was used to implement radio buttons in the filter modal. Source [here](https://github.com/thegamenicorus/react-native-flexi-radio-button)

**react-native-google-maps-directions(^1.1.2):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native-is-iphonex(^1.0.1):** This plugin was used for the camera screen to provide specific padding if the device is an IPhoneX. This was recommended in the original expo’s camera documentation. Source [here](https://www.npmjs.com/package/react-native-is-iphonex)

**react-native-material-textfield(^0.12.0):** In order to conform with Google’s aesthetic material design standards, this component was added. The React-Native Material UI doesn’t style the text input fields. Source [here](https://github.com/n4kz/react-native-material-textfield)

**react-native-material-ui(^1.20.0):** The material UI was used to style the application according to Google’s aesthetic material design standard. This plugin helps to design components easily and thus avoiding manually adding style for every single element we create in the components. Source [here](https://github.com/xotahal/react-native-material-ui)

**react-native-modal(^5.4.0):** Used to create the filter modal. Source [here](https://github.com/react-native-community/react-native-modal)

**react-native-side-menu(^1.1.3):** This component was used to keep the links of our main components in the left drawer. Source [here](https://github.com/react-native-community/react-native-side-menu)

**react-native-vector-icons(^4.5.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-navigation(^1.0.3):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

## Installation Notes
#### Requirements:
- Mobile phone/application running Android 4.1 and up.

#### Built with:
- React Native
- Expo 25.0.0- Android Emulator
- Node 8.9.4 - Installer

#### instructions:
- download the Expo app for either iOS or Android
- navigate to project directory in the terminal
- run 'npm install'
- run 'npm start'
- use Expo app to scan the QR code



## Code Examples
You will encounter roadblocks and problems while developing your project. Share 2-3 'problems' that your team solved while developing your project. Write a few sentences that describe your solution and provide a code snippet/block that shows your solution. Example:

**Problem 1: The list view and map view could not access and manipualte the same set of filtered and unfiltered events.**

We retrieved our events from our backend through an axios API call. We then saved the events retrieved from the backend in AsyncStorage. AsyncStorage allows any elements stored in it to persist throughout the whole application,
thus both the list view and map view could access and filter the same set of events. We again used AsyncStorage to store all of the user filtered events.
Since these filtered events were also stored in AsyncStorage, they could also be manipulated by both the list view and map view.
```
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

```

## Feature Section
#### Features
- sign up and login in with or without Facebook o-auth
- displays events from Facebook API and Eventbrite API
- view the event's in a list view or a map view
- pick your city with support for Halifax and Toronto
- ///add the parts for the event screen
- camera support for profile picture
- ability to search events based on a text field, distance to event, and date
- 'hamburger menu'

## Final Project Status
Our project has been a success and we also have a working backend. Push notifications is the only feature that is left to be added. In the future we would like to do Natural Langauge Processing from the Twitter API. The app will be tested with customers to determine it's market viability.

#### Minimum Functionality
- Sign up screen for the user to create an account. The screen takes username, email address, and password. [Completed]
- Login screen with two supported fields: username and password. [Completed]
- 'Go Somewhere' will be active in Halifax. [Completed]
- Events displayed with descriptions in list-view. [Completed]
- A screen for each event (called ‘event details screen’) which contains the date of event, a generic photo for each of the event categories, and details about the venue. Businesses will be separated by category and will have category picture and description associated with them. [Completed]


#### Expected Functionality
- Events displayed with descriptions in map-view and list-view. The user can switch between map and list-view. [Completed]
- Search bar at the top of the map-view and list-view screen to search for events. [Completed]
- A menu bar at the bottom of the map-view and list-view screen. There will be three icons on the menu bar: switch city, categories (filter for types of events), and a toggle from list-view to map-view (vice-versa). [Completed]
- Find your current location button for map-view using location services. [Completed]
- Users have access to GPS directions to an event. [Completed]
- The map-view has event bubbles that show the number of people showing interest about an event. [Completed]
- Event details screen will have a list of all the Tweets which mention the event. (Comments instead of Tweets) [Completed]
- The event details screen has an option to say the user is attending the event. [Completed]



#### Bonus Functionality
- Login screen that supports Open Authorization from Google, Facebook, and Twitter. [Completed]
- User profile screen will be added which includes a personal photo, and other text based information. [Completed]
- 'Go Somewhere' will be active in Halifax and Toronto. [Completed]
- A ‘Pick your City’ screen. This screen will let you choose Halifax or Toronto. If the user has location services, then this screen will be bypassed and the correct city will be chosen. [Completed]
- Push notifications to inform the user of events in their area. [To do]
- Event details screen automates its data collection of the venue photos, category, and details from an API. [Completed]
- Within the menu bar, the ‘categories’ feature has the ability to filter based on the category data fetched from an API.  [Completed]

## Backend
- The backend for this app is done in Ruby On Rails which serves REST api's. The application is deployed on Heroku platform which provides easy deployment on free instance. The project is on github Souece [here](https://github.com/siddhantbhardwaj/gosomewhere_backend) and the web services are deploued on the URL [https://gosomewhere-backend.herokuapp.com](https://gosomewhere-backend.herokuapp.com).
- Example Endpoint: https://gosomewhere-backend.herokuapp.com/events. The endpoints require the user to be authenticated first and then use the token which is recieved after signin or signup process.
- In addition to Ruby on Rails application, we also had to use an opensource Express.js based web [application](https://github.com/tobilg/facebook-events-by-location) to fetch the facebook events based on the user's location. This Express.js based app is forked [https://github.com/siddhantbhardwaj/go-somewhere-fb](https://github.com/siddhantbhardwaj/go-somewhere-fb) and deployed as a web service on Heroku [https://go-somewhere-fb.herokuapp.com](https://go-somewhere-fb.herokuapp.com)

## Sources
Use IEEE citation style.
What to include in your project sources:
- Stock images
- Design guides
- Programming tutorials
- Research material
- Android libraries
- Everything listed on the Dalhousie [*Plagiarism and Cheating*](https://www.dal.ca/dept/university_secretariat/academic-integrity/plagiarism-cheating.html)
- Remember AC/DC *Always Cite / Don't Cheat* (see Lecture 0 for more info)

[1] "Java (programming language)", En.wikipedia.org, 2018. [Online]. Available: https://en.wikipedia.org/wiki/Java_(programming_language).

[1]“Facebook,” Facebook - Expo Documentation. [Online]. Available: https://docs.expo.io/versions/latest/sdk/facebook.html. [Accessed: 02-Apr-2018].
