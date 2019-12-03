import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

export default class AddMediaTab extends Component {

    static navigationOptions = {
        tabBarIcon:({ tintColor }) => (
            <Icon name='ios-add-circle' style ={{ color: tintColor }}/>
        )
    }

    render(){
        return(
            <View style={style.container}>
                <Text>AddMedia</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container:{flex:1, alignItems:'center', justifyContent:'center',}
});