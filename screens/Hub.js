import React,{Component} from 'react';
import { StyleSheet,Text,Image,View,TouchableOpacity } from 'react-native';

class HUB extends Component{
constructor(props){
    super(props);
    this.state = {
    }
}
render(){
    return(
        <View style = {{flex:1,flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
            <TouchableOpacity 
                onPress = { () =>  this.props.navigation.navigate('Form') }
            >
                <Image source = {require("./img/Add_Product.png")} style = {styles.Logo_style}/>
                <Text style = {styles.Sign_in_Text_style}>Add product</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                onPress = { () =>  this.props.navigation.navigate('add_Client')}
            >
                <Image source = {require("./img/Add_Client.png")} style = {styles.Logo_style}/>
                <Text style = {styles.Sign_in_Text_style}>Add Client</Text>

            </TouchableOpacity>
     
            <TouchableOpacity 
                onPress = { () =>  this.props.navigation.navigate('Order_List')}
            >
                <Image source = {require("./img/Order_List.png")} style = {styles.Logo_style}/>
                <Text style = {styles.Sign_in_Text_style}>Orders</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                onPress = { () =>  this.props.navigation.navigate('Clients_list')}
            >
                <Image source = {require("./img/Order.png")} style = {styles.Logo_style}/>
                <Text style = {styles.Sign_in_Text_style}>New Order</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                onPress = { () =>  this.props.navigation.navigate('Restock')}
            >
                <Image source = {require("./img/Restock.png")} style = {styles.Logo_style}/>
                <Text style = {styles.Sign_in_Text_style}>Restock</Text>

            </TouchableOpacity>
     
     
     
        </View>
    )
}
    


}
export default HUB
var styles =StyleSheet.create({
    Logo_style:{
        width:150,
        height:150,
        marginTop:5,
        alignSelf:'center',
    },
    Sign_in_Text_style:{
        textAlign:'center',
        borderRadius:50,
        textAlignVertical:'center',
        alignSelf:'center',
        fontSize:20,
        color:"#5d5d5d",
        fontWeight:'bold',
        opacity:0.85
    },
})