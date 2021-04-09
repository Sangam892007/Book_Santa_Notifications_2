import React from 'react';
import {Text, View, TouchableOpacity, Stylesheet} from 'react-native'
import {Dimensions} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../Config';

export default class SwipeableFlatList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allnotifications:this.props.allnotifications,
        }
        
    }
    renderItem = (data)=>{
        console.log(data)
        return(
        <ListItem 
        LeftElement = {<Icon name = "book" type = "font-awsome" color = "red"/>}
        title = {data.item.Book_Name}
        titleStyle = {{color:"black", fontWeight:"bold"}}
        subtitle = {data.item.message}
        bottomDivider
        />
        )
    }
    renderHiddenItem = ()=>{
        <View>
            <Text>
                Swipe to delete
            </Text>
        </View>
    }
    UpdateMarkAsRead = (notifications)=>{
        console.log(notifications)
        db.collection("ALL_NOTIFICATIONS").doc(notifications=Doc_ID).update({
            Notification_Status:"Read"
        })

    }
    OnSwipeValueChange = (swipeData)=>{
        var allnotifications = this.state.allnotifications
        const {key,value} = swipeData
        if (value < -Dimensions.get("window").width) {
            const newData = [...allnotifications]
            const prevIndex = allnotifications.findIndex(Item=>{
                Item.key === key
            })
        newData.splice(prevIndex, 1)
        this.setState({
            allnotifications:newData,
        })
        this.UpdateMarkAsRead(allnotifications[prevIndex])
        }
    }

    render(){
        return(
            <View>
                <SwipeListView 
                disableRightSwipe
                data = {this.state.allnotifications}
                renderItem = {this.renderItem }
                renderHiddenItem = {this.renderHiddenItem}
                rightOpenValue = {-Dimensions.get('window').width}
                previewRowKey = {'0'}
                previewOpenValue = {-100}
                previewOpenDelay = {10000}
                onSwipeValueChange = {this.OnSwipeValueChange}
                />
            </View>
        )
    }
}