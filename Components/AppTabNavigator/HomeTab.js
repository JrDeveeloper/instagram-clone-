import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Icon, Container, Content, Thumbnail } from 'native-base';
import CardComponent from '../CardComponent';

export default class HomeTab extends Component {

    state = {
        feeds:[]
    }

    componentWillMount(){
        this.fetchFeeds().then(feeds => {this.setState({feeds})});
    }

    fetchFeeds(){
        const data = {
            id:1,
            jsonrpc:"2.0",
            method:"call",
            params:[
                "database_api",
                "get_discussions_by_created",
                [{ tag: "kr", limit: 20 }]
            ]
        };

    return fetch('https://api.steemit.com', {
        method:'POST',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => res.result)
    }

    static navigationOptions = {
        tabBarIcon:({ tintColor }) => (
            <Icon name='ios-home' style={{ color: tintColor }}/>
        )
    }

    render(){
        return(
            <Container style={style.container}>
                <Content>
                    {}
                    <View style={{height:100}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:7}}>
                            <Text style={{fontWeight:'bold'}}>Stories</Text>

                            <View style={{flexDirection:'row', 'alignItems':'center'}}>
                                <Icon name="md-play" style={{fontSize:14}}></Icon>
                                <Text style={{fontWeight:'bold'}}>Watch All</Text>
                            </View>
                        </View>

                    <View style={{ flex:3 }}>
                        <ScrollView
                        horizontal={true}>
                            <Thumbnail source = {{ uri : 'https://pbs.twimg.com/media/EKTjMOpUUAErTbx.jpg' }}/>
                            <Thumbnail source = {{ uri : 'https://pbs.twimg.com/media/EKSil1kU8AUgz4f.jpg' }}/>
                            <Thumbnail source = {{ uri : 'https://pbs.twimg.com/media/Ejv0NkHVUAAcBmW.jpg' }}/>
                            <Thumbnail source = {{ uri : 'https://pbs.twimg.com/media/Ejv0NkKVAAEJzSf.jpg' }}/>
                        </ScrollView>
                    </View>
                </View>
                    {}
                   {this.state.feeds.map(feed => <CardComponent data={ feed }/>)}
                </Content>
            </Container>
        );
    }

}
const style = StyleSheet.create({
    container:{flex:1, backgroundColor:'white'}
});