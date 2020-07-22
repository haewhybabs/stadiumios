import { createAppContainer } from 'react-navigation';
import React,{Component} from 'react';
import { switchNavigator } from './source/navigations/switchNavigator';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

console.disableYellowBox = true;
const AppNav = createAppContainer(switchNavigator);

export default class App extends Component {

    constructor(props){
        super(props);
        this.state={}

        
    }

    

    

    render(){
        return (

            <AppNav />
        )
    }


}



