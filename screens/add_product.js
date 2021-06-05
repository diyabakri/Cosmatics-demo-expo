import React,{Component} from 'react';
import { StyleSheet, Text,TextInput, View , TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from "../config/Firebase"

class Product_Form extends Component{
constructor(props){
    super(props);
    this.state = {
        Img_Url:"",
        Product_name:"",
        Bar_Code:"",
        Price:"",
        Quantity:"",
        Brand:"",
        Catagory:"",
    }
}
 add_to_DB(){
    firebase.firestore().collection("Products")
    .doc(this.state.Catagory)
    .collection(this.state.Catagory+"_Products")
    .doc(this.state.Product_name).set(this.state).then(
        ()=>{
            var temp = {}
            temp[this.state.Catagory]= this.state.Catagory
            firebase.firestore().collection("Products")
            .doc("Indexer").get().then(
                doc => {
                    if(doc.exists){
                        firebase.firestore().collection("Products")
                        .doc("Indexer").update(temp).then(alert("Product added succefully"))
                    }else{
                        firebase.firestore().collection("Products")
                        .doc("Indexer").set(temp).then(alert("Product added succefully"))
                    }
                }
            ).catch(error => alert("In fetshing"+error))
        }
    ).catch(error => alert("Creating catagory doc "+error))
}
render(){
    return(
        <View>
            <ScrollView>
            
                <View style = {{marginTop:30}}>
                    <View style = {styles.Input_Style}>   
                        
                        <TextInput
                        placeholder = {"Product Name"}
                        onChangeText = {Product_name => this.setState({Product_name})}
                        value = {this.state.Product_name}
                        keyboardType = {"default"}/>
                    
                    </View>
                    <View style = {styles.Input_Style}>

                        <TextInput
                        placeholder = {"Bar Code"}
                        maxLength = {10}
                        onChangeText = {Bar_Code => this.setState({Bar_Code})}
                        value = {this.state.Bar_Code}
                        keyboardType = {"default"}/>

                    </View>
                    <View style = {styles.Input_Style}>

                        <TextInput
                        placeholder = {"Brand"}
                        onChangeText = {Brand => this.setState({Brand})}
                        value = {this.state.Brand}
                        keyboardType = {"default"}/>

                    </View>
                    <View style = {styles.Input_Style}>

                        <TextInput
                        placeholder = {"Catagory"}
                        onChangeText = {Catagory => this.setState({Catagory})}
                        value = {this.state.Catagory}
                        keyboardType = {"default"}/>

                    </View>
                    <View style = {styles.Input_Style}>

                        <TextInput
                        placeholder = {"Price"}
                        onChangeText = {Price => this.setState({Price})}
                        value = {this.state.Price}
                        keyboardType = {"decimal-pad"}/>

                    </View>
                    <View style = {styles.Input_Style}>

                        <TextInput
                        placeholder = {"Quantity"}
                        onChangeText = {Quantity => this.setState({Quantity})}
                        value = {this.state.Quantity}
                        keyboardType = {"decimal-pad"}/>

                    </View>
                    <View style = {styles.Input_Style}>   
                        
                        <TextInput
                        placeholder = {"Image url"}
                        onChangeText = {Img_Url => this.setState({Img_Url})}
                        value = {this.state.Img_Url}
                        keyboardType = {"default"}/>
                    
                    </View>
                    <View style = {styles.Sign_In_Button_Style}>
                    <TouchableOpacity 
                        onPress = { () => this.add_to_DB()}
                        >
                        <Text style = {styles.Sign_in_Text_style}>Add</Text>
                    </TouchableOpacity>
                    </View>
                
                </View>

            </ScrollView>
        </View>
    )
}
    


}
export default Product_Form
var styles =StyleSheet.create({
    background_style:{
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
        // marginTop:50,
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