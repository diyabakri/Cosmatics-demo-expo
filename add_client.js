import React,{Component} from 'react';
import { StyleSheet, Text,TextInput, View , TouchableOpacity } from 'react-native';
import firebase from "../config/Firebase"

class Add_user extends Component{
constructor(props){
    super(props);
    this.state = {
        Name:"",
        Email:"",
        Phone_number:"",
    }
}
add_to_DB(){
firebase.firestore().collection("Clients").doc(this.state.Name).set(this.state).then(
    ()=>{
        alert("Client added succefully")
    }
).catch(error => alert(error))
}
render(){
    return(
        <View style = {styles.background_style}>
            <View style = {styles.Input_Style}>   
                
                <TextInput
                placeholder = {"Name"}
                autoFocus = {true}
                onChangeText = {Name => this.setState({Name})}
                value = {this.state.Name}
                keyboardType = {"default"}/>
            
            </View>
            <View style = {styles.Input_Style}>

                <TextInput
                placeholder = {"Email"}
                onChangeText = {Email => this.setState({Email})}
                value = {this.state.Email}
                keyboardType = {"email-address"}/>

            </View>
            <View style = {styles.Input_Style}>

                <TextInput
                placeholder = {"Phone_number"}
                onChangeText = {Phone_number => this.setState({Phone_number})}
                maxLength = {10}
                value = {this.state.Phone_number}
                keyboardType = {"decimal-pad"}/>

            </View>
          
            <View style = {styles.Sign_In_Button_Style}>
            <TouchableOpacity 
                onPress = { () => this.add_to_DB()}
            >
                <Text style = {styles.Sign_in_Text_style}>Add</Text>
            </TouchableOpacity>
            </View>
        
        </View>
    )
}
    


}
export default Add_user
var styles =StyleSheet.create({
    background_style:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignContent:"center",
        height:'100%',
        width:'100%',
        backgroundColor : "#f6f6f6"
    },
    Logo_style:{
        width:300,
        height:300,
        marginTop:35,
        alignSelf:'center',
        opacity:0.65
    },
    Sign_In_Button_Style:{
        marginTop:50,
        borderRadius:50,
        backgroundColor:"#ffffff",
        borderColor:"#5d5d5d",
        borderWidth:1,
        width:290,
        height:75,
        alignSelf:'center'
    },
    Sign_in_Text_style:{
        textAlign:'center',
        borderRadius:50,
        textAlignVertical:'center',
        alignSelf:'center',
        fontSize:50,
        color:"#5d5d5d",
        fontWeight:'bold',
        opacity:0.85
    },
    Dont_have_account:{
        fontSize:20,
        paddingTop:15,
        color:'#5d5d5d',
        alignSelf:'center'
    },
    Sign_Up_style:{
        fontSize:30,
        paddingTop:5,
        color:'#5d5d5d',
        alignSelf:'center',
        fontWeight:'bold',
        textDecorationLine: 'underline'
    },
    Input_Style:{
        position:"relative",
        borderColor:"#000000",
        borderWidth:2,
        borderRadius:50,
        width:300,
        height:55,
        alignSelf:'center',
        marginBottom:15,
        alignContent: "center",
        padding:15,
        paddingLeft:25
    },
})