import React,{Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button, View} from "native-base"
import {ScrollView} from 'react-native-gesture-handler';
import firebase from "../config/Firebase"

class Order_List extends Component{
    constructor(props){
        super(props);
        this.state={
            Orders:[],
            active_tabs:{}
        }
    }
    async componentDidMount(){
        await firebase.firestore().collection("Orders").get().then(Col => {
            let Orders = []
            let active_tabs = {}
            Col.forEach(Order => {
                Orders.push(Order.data());
                active_tabs[Order.data().Order_id] = false;
            });
            this.setState({Orders,active_tabs})
        })
    }

   async Cancel_Order(Order){
        await firebase.firestore().collection("Orders").doc(Order.Order_id).update({Status:"Canceled"}).then(()=>
            {
                this.componentDidMount()
            }
        )
    }
    Render_Order(Order){
        let active_tabs = this.state.active_tabs
        return(

          <View style = {styles.Catagory_style} >
              
              <Button onPress ={() =>  {
                                  for(let prop in active_tabs){  
                                      if (active_tabs[prop] && prop != Order.Order_id){
                                          active_tabs[prop] = false
                                      }
                                  } // check for active taps and closes them
                                  active_tabs[Order.Order_id] = !this.state.active_tabs[Order.Order_id]
                                  this.setState(active_tabs)
                              }}
                      style = {styles.Devider_style}
              >
              <Text style = {styles.Devider_Text_style} >
                  {Order.Order_id}
              </Text>
              </Button>
                              {/* for each product in this catagory call the function render product which returns the css for each product  */}
                {this.state.active_tabs[Order.Order_id]?//if the tap was clicked on start rendering the products else dont render anything
                  
                <View style = {styles.Content_style} >
                  
                    <Text style = {styles.Order_info_text_style} >Date : {Order.Date+"\t"} Time: {Order.Time+"\n"} </Text>
                    <Text style = {styles.Order_info_text_style} >Quantity : {Order.Quantity+"\t\t"} Final Price : ₪{Order.Final_price+"\n"}</Text>
                    <Text style = {styles.Order_info_text_style} >Status:<Text style ={{color:Order.Status=="In progress"?"#0c979e":"#ff0000"}}> {Order.Status}</Text></Text>

                        {Order.Status=="In progress"?
                        <Button transparent style = {{alignSelf:"center"}} onPress = {()=> this.Cancel_Order(Order)}>
                            <Text style = {styles.Cancel_Text_style}>Cancel order</Text>
                        </Button>
                        :
                        
                        <View></View>}  
                </View>
                  
                  :
                  
                  <View></View>

                  }
          
          </View>
        )
         
    }
    render(){
        return(
            <View>
            
                <ScrollView>
            
                    <View>
            
                        {this.state.Orders.map(Order=>this.Render_Order(Order))}
            
                    </View>
            
                </ScrollView>
            
            </View>
        )
    }
}
export default Order_List;

let styles =StyleSheet.create({
    background_style:{
        height:'100%',
        width:'100%',
        backgroundColor : "#f6f6f6"
    },
    Fin_order:{
        width:"100%",
        height:"10%",
        justifyContent:"center",
        borderColor:"black",
        // borderWidth:1,
        alignSelf:"center",
        backgroundColor:"#0c979e",
        shadowOpacity:50,
        shadowColor:"gray",
    },
    Cancel_Text_style:{
        marginTop:3,
        color:"red",
        fontSize:30,
        fontWeight:"bold",
        justifyContent:"center",
        textAlignVertical:"center",
        textAlign:"center",
        
    },   
    Order_info_text_style:{
        fontSize:20,
        alignSelf:"center",
        width:"100%",
        textAlign:"center",
        fontWeight:"bold",
        color:"gray",
    },
    Fin_Text_order:{
        textAlign:"center",
        color:"#ffffff",
        fontSize:30,
        fontWeight:"bold",
    },
    Content_style:{
        paddingTop:5,
        paddingBottom:2,
        shadowOpacity:0.4,
        shadowColor:"gray",
        width:"100%",
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        flexWrap:"wrap",
        alignSelf:"center",
    },
    Devider_style:{
        width:'100%',
        height:50,
        backgroundColor : "#f6f6f6",
        borderBottomWidth:2,
        borderBottomEndRadius:10,
        borderColor:"gray",
        shadowOpacity:50,
        shadowColor:"gray",
    },
    Devider_Text_style:{
        width :"100%",
        fontSize:20,
        fontWeight:"bold",
        justifyContent:"center",
        textAlign:"center",
        color:"gray"
    },
    quantity_input:{
        alignContent:"center",
        height:"80%",
        alignSelf:"center",
        width:"30%",
        borderColor:"black",
        borderRadius:40,
        textAlign:"center",
        margin:8,
    },
    quantity_bar:{
        backgroundColor:"#ffffff",
        alignContent:"center",
        alignSelf:"center",
        alignItems:"center",
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        flexWrap:"wrap",
        width:150,
        borderColor:'black',
        // borderWidth:1,
        marginBottom:5 ,

    },
    Checked_quantity_bar:{
        backgroundColor:"#0c979e",
        alignContent:"center",
        alignSelf:"center",
        alignItems:"center",
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        flexWrap:"wrap",
        width:150,
        borderColor:'black',
        // borderWidth:1,
        marginBottom:5 ,

    },
    stock_style:{
        width:150,
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        flexWrap:"wrap",
        fontSize:20,
        alignSelf:"center",
        
    },
    Catagory_style:{
        width:'100%',
        flex:1,
        flexDirection:"column",
        alignSelf:"center",
        alignContent:"center",
        alignItems:"center",
        flexWrap:"wrap",
    },
    Item_style:{
        justifyContent:"center",
        flex:1,
        marginHorizontal:5,
        flexWrap:"wrap",
        flexDirection:"column",
        borderColor:"#5d5d5d",
        width:150,
        height:180,
        backgroundColor : "#ffffff",
        // shadowOpacity:50,
        // shadowColor:"gray",
        alignContent: "center",
     
    },
    Checked_Item_style:{
        justifyContent:"center",
        flex:1,
        marginHorizontal:5,
        flexWrap:"wrap",
        flexDirection:"column",
        borderColor:"#5d5d5d",
        width:150,
        height:180,
        backgroundColor : "#0c979e",
        alignContent: "center",
     
    },
    Item_Text_style:{
        alignSelf:"center",
        textAlign:"center",
        width:"100%",
        height:"20%",
        flexWrap:"wrap",
        flex:1,
        color:"gray",
        fontWeight:"bold",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    },
    Checked_Item_Text_style:{
        alignSelf:"center",
        textAlign:"center",
        width:"100%",
        height:"20%",
        flexWrap:"wrap",
        flex:1,
        color:"#ffffff",
        fontWeight:"bold",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    },
    Img_style:{
        height:'80%',
        width:"90%",
        resizeMode:"contain",
        backgroundColor : "#ffffff",
        // borderWidth:1,
        borderColor:"black",
        alignSelf:"center"
    },
    Price_style:{
        color:"red",
        alignSelf:"center",
        textAlign:"center",
        fontSize:18,
        width:"100%",   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    },
    List_style:{
        height:'100%',
        width:'100%',
        alignSelf:"center",
        alignContent:"center",
        alignItems:"center",
        flex:1,
        flexDirection:"column",
        flexWrap:"wrap"
    },
})