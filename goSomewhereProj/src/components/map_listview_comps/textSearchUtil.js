import {AsyncStorage} from "react-native";
import {Component} from "react";

export default class textSearchUtil extends Component {
// export function searchFilter(events, props) {
    async searchFilter() {

        let events = await AsyncStorage.getItem('originalEvents');

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

 //       props.changeEvents();
        //    this.forceUpdate;
    }
}
//module.exports.searchFilter = searchFilter;