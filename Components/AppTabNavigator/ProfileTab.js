import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
const { width, height } = Dimensions.get('window');

let images = [
    "https://cdn.pixabay.com/photo/2019/12/01/09/39/landscape-4665051_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_960_720.png",
    "https://cdn.pixabay.com/photo/2019/11/18/23/31/exec-4636080_960_720.png",
    "https://cdn.pixabay.com/photo/2019/11/27/18/23/technology-4657552_960_720.png",
    "https://cdn.pixabay.com/photo/2014/12/29/17/39/code-583073_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/11/18/18/37/programming-1836330_960_720.png",
    "https://cdn.pixabay.com/photo/2016/11/18/00/32/programming-1833058_960_720.png",
    "https://cdn.pixabay.com/photo/2018/08/14/18/07/programmer-3606210_960_720.png",
    "https://cdn.pixabay.com/photo/2017/02/13/14/14/head-2062723_960_720.png",
    "https://cdn.pixabay.com/photo/2015/04/22/20/18/internet-735262_960_720.png"
]

export default class ProfileTab extends Component {

    componentWillMount() {
        const username = 'gghite';

        this.fetchState(username).then(({
            accounts,
            content,
            feed_price,
            props,
        }) => {
            const { name, post_count, reputation, json_metadata, blog, net_vesting_shares, created } = accounts[username];
            const { profile } = JSON.parse(json_metadata);
            const log = Math.log(parseInt(String(reputation).substring(0, 4))) / Math.log(10);
            this.setState({
                name,
                reputation: Math.max(((String(reputation).length - 1) + (log - parseInt(log))) - 9, 0) * 9 + 25,
                postCount: post_count,
                profile,
                blogs: Object.values(content)
            })
        });

        this.fetchFollowCount(username).then(({following_count, follower_count}) => {
            this.setState({
                followingCount: following_count,
                followerCount: follower_count
            })
        });
    }

    renderSectionOne = () => {
        return images.map((image, index) => {
            return (
                <View key = {index}
                        style = {{ width: width/3, height: width/3 }}>
                            <Image source = {{ url: image }} style = {{ flex:1 }}/>
                        </View>
            )
        })
    }
    renderSection = () => {
        if(this.state.activeIndex === 0) {
            return (
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    {this.renderSectionOne()}
                </View>
            )
        }
    } //Profile Tab에서 페이지 별 내용

    fetchAccount(username) {
        const data = {
            id: 3,
            jsonrpc: "2.0",
            method: "call",
            params: [
                "database_api",
                "get_accounts",
                [[username]]
            ]
        };
        return fetch('https://api.steemit.com',{
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result[0])
    }

    fetchFollowCount(username) {
        const data = {
            id: 4,
            jsonrpc: "2.0",
            method: "call",
            params: [
                "follow_api",
                "get_follow_count",
                [username]
            ]
        };
        return fetch('https://api.steemit.com',{
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result)
    }

    fetchState(username) {
        const data = {
            id: 4,
            jsonrpc: "2.0",
            method: "call",
            params : [
                "database_api",
                "get_state",
                [`/@${username}`]
            ]
        };
        return fetch('https://api.steemit.com',
        {
            method : 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result)
    }

    fetchState(username) {
        const data = {
            id: 3,
            jsonrpc: "2.0",
            method: "call",
            params: [
                "database_api",
                "get_state",
                [`/@${username}`]
            ]
        };
        return fetch('https://api.steemit.com',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result[0])
    }

    static navigationOptions = {
        tabBarIcon:({ tintColor }) =>(
            <Icon name='ios-person' style={{ color: tintColor }}/>
        )
    }

    constructor(props){
        super(props)

        this.state = {
            name: '',
            reputation: 0,
            profile: {},
            postCount: 0,
            followingCount: 0,
            followerCount: 0,
            activeIndex: 0,
            blogs: []
        };
    }//null is not an object evaluating this.state.name 의 문제점 해결
    //해결방안은 this. 가 정의되지 않았기에 this. 를 정의해줬음.
    //이것이 정의되지 않으면 9번째 라인부터 전체적으로 오류가 발생됨.

    segmentClicked = (activeIndex) => {
        this.setState({
            activeIndex
        });
    }

    render(){
        const{
            name,
            reputation,
            profile,
            postCount,
            followingCount,
            followerCount
        } = this.state;

        return(
            <Container style={{ flex:1, backgroundColor:'white' }}>
                <Header>
                    <Left><Icon name='md-person-add' style={{ paddingLeft:10 }}></Icon></Left>
                    <Body><Text style={{ fontWeight:'bold' }}>o_k_1216</Text></Body>
                    <Right><EntypoIcon name="back-in-time" style={{ paddingRight:10, fontSize: 32 }}/></Right>
                </Header>
                <Content>
                    <View style={{flexDirection:'row', paddingTop:10}}>
                        <View style={{flex:1, alignItems:'center'}}>
                            <Image source={{ url: 'https://steemitimages.com/u/anpigon/avatar' }}
                                    style={{width:75, height:75, borderRadius:37.5}}/>
                        </View>
                        <View style={{flex:3}}>
                            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                <View style={{alignItems:'center'}}>
                                    <Text>10</Text>
                                    <Text style={{fontSize:10, color:'gray'}}>posts</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <Text>978</Text>
                                    <Text style={{fontSize:10, color:'gray'}}>follower</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <Text>188</Text>
                                    <Text style={{fontSize:10, color:'gray'}}>following</Text>
                                    </View>                         
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button bordered dark
                                        style={{flex:4, marginLeft:10, justifyContent:'center', height:30, marginTop:10}}>
                                            <Text>Edit Profile</Text>
                                        </Button>
                                        <Button bordered dark small icon
                                                style={{flex:1, marginRight:10, marginLeft:5, justifyContent:'center', height:30, marginTop:10}}>
                                                    <Icon name="settings"/>
                                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:10, paddingVertical:10}}>
                        <Text style={{fontWeight:'bold'}}>오덕균</Text>
                        <Text>Baby Developer</Text>
                        <Text>insta : o_k_1216</Text>
                    </View>
                    
                    <View style = {{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth:1, borderTopColor:'#eae5e5'}}>
                        <Button transparent
                            onPress={() => this.segmentClicked(0)} // <- 프로필탭에 아랫부분 클릭시 색 변환 및 페이지 변환코드
                            active={this.state.activeIndex === 0}> 
                            <Icon name = 'ios-apps' 
                                    style = {[ this.state.activeIndex === 0 ? {} : {color: 'grey'} ]}/> 
                        </Button>
                        <Button transparent
                            onPress={() => this.segmentClicked(1)}
                            active={this.state.activeIndex === 1}>
                            <Icon name = 'ios-list'
                                    style = {[ this.state.activeIndex === 1 ? {} : {color : 'grey'} ]}/>
                        </Button>
                        <Button transparent
                            onPress={() => this.segmentClicked(2)}
                            active={this.state.activeIndex === 2}>
                            <Icon name = 'ios-people' 
                                    style = {[ this.state.activeIndex === 2 ? {} : {color : 'grey'} ]}/>
                        </Button>
                        <Button transparent
                            onPress={() => this.segmentClicked(3)}
                            active={this.state.activeIndex === 3}>
                            <Icon name = 'ios-bookmark' 
                                    style = {[ this.state.activeIndex === 3 ? {} : {color : 'grey'} ]}/>
                        </Button>
                    </View>
                    {this.renderSection()}
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    container:{flex:1, alignItems:'center', justifyContent:'center',}
});