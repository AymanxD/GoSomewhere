# GoSomewhere
Planning a night out? See all the events in select canadian cities. View the events in a list view or map view. Go somewhere! 

#### Authors and Contributors:
- Andrea Christians
- Matthew Hemming
- Ayman Mohatarem
- Siddhant Bhardwaj
- Andrey Almabeko



## Libraries


**axios(^3.2.1):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**eslint-plugin-react-native(^25.0.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**prop-types(^15.6.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react(16.2.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native(0.52.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native-event-listeners(^1.0.3):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native-flexi-radio-button(^0.2.2):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native-google-maps-directions(^1.1.2):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native-is-iphonex(^1.0.1):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native-material-textfield(^0.12.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native-material-ui(^1.20.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native-modal(^5.4.0):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

**react-native-side-menu(^1.1.3):** Gson is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Source [here](https://github.com/google/gson)

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

**Problem 1: We need a peristent state so that both the list view and map view can access common events.**

A short description.
```
// The method we implemented that solved our problem
public static int fibonacci(int fibIndex) {
    if (memoized.containsKey(fibIndex)) {
        return memoized.get(fibIndex);
    } else {
        int answer = fibonacci(fibIndex - 1) + fibonacci(fibIndex - 2);
        memoized.put(fibIndex, answer);
        return answer;
    }
}

// Source: Wikipedia Java [1]
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