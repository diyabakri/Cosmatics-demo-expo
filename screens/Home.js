import React,{Component} from 'react';
import { StyleSheet, Text,TextInput, View , TouchableOpacity,Image } from 'react-native';
import {HideWithKeyboard,ShowWithKeyboard } from 'react-native-hide-with-keyboard';
import firebase from "../config/Firebase"

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            Email:"review@test.com",
            Password:"123456"
        }


    }
    Login_user(){
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.Email,this.state.Password)
        .then(res => {
            this.props.navigation.navigate('Hub')
        })
        .catch(error => alert(error));
    }
    render(){
        return(
            <View style = {styles.background_style}>
                <View>
                    <ShowWithKeyboard>
                        <View style = {{marginTop:50}}></View>
                    </ShowWithKeyboard>

                    <HideWithKeyboard>
                        <Image style = {styles.image_style} source={require("./img/lotemicon.png")}></Image>
                    </HideWithKeyboard>

                    <View style = {styles.Input_Style}>
                        <TextInput
                            placeholder = {"Email"}
                            onChangeText = {Email => this.setState({Email})}
                            value = {this.state.Email}
                            keyboardType = {'email-address'}
                            returnKeyType = {"next"}
                            
                        >
                        </TextInput>
                    </View>
                    <View style = {styles.Input_Style}>
                    <TextInput
                        placeholder = {"Password"}
                        onChangeText = {Password => this.setState({Password})}
                        value = {this.state.Password}
                        secureTextEntry = {true}
                    >
                    </TextInput>
                    </View>
                </View>
                 
                <View style = {styles.Sign_In_Button_Style}>
                        <TouchableOpacity 
                            onPress = { () => this.Login_user()}
                        >
                            <Text style = {styles.Sign_in_Text_style}>Sign in</Text>
                        </TouchableOpacity>
                </View>
               
            </View>
        )
    }
}

export default Home;

var styles =StyleSheet.create({
    background_style:{
        height:'100%',
        width:'100%',
        backgroundColor : "#f6f6f6"
    },
    image_style:{
        width:300,
        height:300,
        marginTop:20,
        marginBottom:20,
        alignSelf:'center',

    },
    Logo_style:{
        width:300,
        height:300,
        marginTop:35,
        alignSelf:'center',
        opacity:0.65
    },
    Sign_In_Button_Style:{
        marginVertical:10,
        borderRadius:50,
        backgroundColor:"#ffffff",
        borderColor:"#5d5d5d",
        borderWidth:2,
        width:290,
        height:75,
        alignSelf:'center',
        flex:0.75,
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center'
    },
    Sign_in_Text_style:{
        textAlign:'center',
        fontSize:50,
        fontWeight:'bold',
        color:"gray"
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