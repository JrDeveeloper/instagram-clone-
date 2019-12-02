import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native'; //메인화면 전체적으로 위치배정에 관한 부분
import { Icon } from 'native-base'; //상단부분에 있는 카메라와 종이비행기 모양을 불러오는 Icon form에 관한 부분
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'; //Tab이란 form(?)에 관한 부분 [* v3와 v4는 import 해오는 from(위치로 명명)이 다름]
import { createAppContainer } from 'react-navigation';
import HomeTab from './AppTabNavigator/HomeTab'; //여기서부터 아래쪽으로 각 Tab을 해당 파일에서 import해오는것
import SearchTab from './AppTabNavigator/SearchTab';
import AddMediaTab from './AppTabNavigator/AddMediaTab';
import LikesTab from './AppTabNavigator/LikesTab';
import ProfileTab from './AppTabNavigator/ProfileTab';

const AppTabNavigator = createMaterialTopTabNavigator({
    HomeTab:{ screen:HomeTab },
    SearchTab:{ screen:SearchTab },
    AddMediaTab:{ screen:AddMediaTab },
    LikesTab:{ screen:LikesTab },
    ProfileTab:{ screen:ProfileTab }}, //여기까지가 메인화면 아랫부분에 Tab 띄우는 코드
    {animationEnabled:true,
     swipeEnabled:true,
     tabBarPosition:"bottom",
     tabBarOptions:{
        style:{
            ...Platform.select({
                ios:{backgroundColor:'white',}
            })
        },
            iconStyle:{height:100},
            activeTintColor:'#000',
            inactiveTintColor:'#d1cece',
            upperCaseLabel:false,
            showLabel:false,
            showIcon:true,
        } //여기까지가 메인화면 아랫부분 Tab에 이미지 씌우는 코드
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {

    static navigationOptions = {
        headerLeft:<Icon name='ios-camera' style={{ paddingLeft:10 }}/>,
        title: 'Instagram',
        headerRight:<Icon name='ios-send' style={{ paddingRight:10 }}/>,
    } //순서대로 배정해야 빌드했을때 순서대로 서있는것(?)

    render() {
        return <AppTabContainet/>;
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
});