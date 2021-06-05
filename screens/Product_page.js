import React,{Component} from 'react';
import { StyleSheet,Text,TextInput, View , TouchableOpacity ,Image} from 'react-native';

let Product_info ={
    Bar_Code:"",
    Brand:"",
    Img_Url:"",
    Price:0,
    Product_name:"",
}

class Product extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        Product_info = this.props.route.params;
        this.props.navigation.setOptions({title:Product_info.Product_name,headerBackTitle:""})
        this.setState({Product_info})

    }
    render(){
        return(
            <View style = {styles.background_style}>
                <Image style = {styles.Img_style} source = {{uri:Product_info.Img_Url}}/>
                <Text style = {styles.Text_style}>Brand: {Product_info.Brand}</Text>
                <Text style = {styles.Text_style}>Code: {Product_info.Bar_Code}</Text>
                <Text style = {styles.Price_style}>₪{Product_info.Price}</Text>
            </View>
        )
    }
}
export default Product
var styles =StyleSheet.create({
    Text_style:{
        borderWidth:2,
        margin:15,
        alignSelf:"center",
        textAlign:"center",
        alignContent:"center",
        padding:12,
        fontSize:18,
        height:50,
        borderRadius:20,
        width:"50%",
        color:"#5d5d5d",
        fontWeight:'bold',
        opacity:0.85
    },
    Title_style:{
        borderWidth:2,
        margin:15,
        alignSelf:"center",
        textAlign:"center",
        alignContent:"center",
        padding:12.5,
        fontSize:18,
        height:50,
        borderRadius:20,
        width:"50%",
    },
    Price_style:{
        color:"red",
        margin:15,
        alignSelf:"center",
        textAlign:"center",
        fontSize:24,
        width:"100%",
        fontWeight:'bold',
    },
    Img_style:{
        margin:2,
        height:'50%',
        width:"98%",
        resizeMode:"contain",
        backgroundColor : "#f6f6f6",
        borderWidth:2,
        borderColor:"#000000",
    },
    background_style:{
        height:'100%',
        width:'100%',
        backgroundColor : "#f6f6f6",
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
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
        width:"100%",
        height:60,
        alignSelf:'center'
    },
    Sign_in_Text_style:{
        textAlign:'center',
        margin:5,
        paddingVertical:6,
        paddingHorizontal:15,
        borderRadius:50,
        borderWidth:2,
        textAlignVertical:'center',
        alignSelf:'center',
        fontSize:30,
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