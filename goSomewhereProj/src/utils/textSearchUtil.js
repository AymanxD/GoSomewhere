import {AsyncStorage} from "react-native";

export function searchFilter() {

        let events = await AsyncStorage.getItem('events');
        let search = await AsyncStorage.getItem('search');
        events = JSON.parse(events);

        let searchArr = [];

        for (let i = 0; i < events.length; i++) {
            let title = events[i].title;
            if (title.contains(search)) {
                searchArr.push(events[i]);
            }
        }
        console.log(searchArr);

        AsyncStorage.setItem('events', JSON.stringify(searchArr));

        this.props.changeEvents();
        this.forceUpdate;
    }
