import React,{Component} from 'react';
import { StyleSheet, Text,Image, View , TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from "../config/Firebase"

class Order extends Component{
    constructor(props){
        super(props);
        this.state = {
            Order:[],
            Sum:0,
            Item_count:0,
        }
    }
    componentDidMount(){
        this.setState({Order:this.props.route.params.Order})
        this.props.navigation.setOptions({headerBackTitle:""})
        let Sum = 0
        let Item_count = 0
        for (let i = 0 ; i<this.props.route.params.Order.length;i++){
            Sum+=(this.props.route.params.Order[i].Price*this.props.route.params.Order[i].selected)
            Item_count+=this.props.route.params.Order[i].selected;
        }
        this.setState({Sum,Item_count})

    }
    Finish_Order(){
        let final_order = {};
        let Order_items = {};
        for (let i = 0 ; i<this.state.Order.length;i++){
            Order_items[this.state.Order[i].Bar_Code]=this.state.Order[i].selected
        }
        

        let Order_id =""

        let curr_date = ""
        if(new Date().getDate()<10){
            curr_date+="0"
            Order_id+="0"
        }
        curr_date+=new Date().getDate()+"/"
        Order_id+=new Date().getDate()+""
        if(new Date().getMonth()<10){
            curr_date+="0"
            Order_id+="0"
        }
        curr_date+=(new Date().getMonth()+1)+"/"
        Order_id+=(new Date().getMonth()+1)+""
        curr_date+=(new Date().getFullYear()+"")
        Order_id+=(new Date().getFullYear()+"")


        let curr_time = ""
        if(new Date().getHours()<10){
            curr_time+="0"
            Order_id+="0"
        }
        curr_time+=new Date().getHours()+":"
        Order_id+=new Date().getHours()+""
        if(new Date().getMinutes()<10){
            curr_time+="0"
            Order_id+="0"
        }
            curr_time+=(new Date().getMinutes())+":"
            Order_id+=(new Date().getMinutes())+""
        if(new Date().getSeconds()<10){
            curr_time+="0"
            Order_id+="0"
        }
        curr_time+=(new Date().getSeconds()+"")
        Order_id+=(new Date().getSeconds()+"")
        final_order["Final_price"] = this.state.Sum
        final_order["Date"] = curr_date
        final_order["Time"] = curr_time
        final_order["Quantity"] = this.state.Item_count
        final_order["Order_id"] = Order_id
        final_order["Client"] = this.props.route.params.Client
        final_order["Items"] = Order_items
        final_order["Status"] = "In progress"
        
        firebase.firestore().collection("Orders").doc(final_order.Order_id).set(final_order).then(()=>{
            alert("Oreder added succsefully")
            //update stock in data base
            this.state.Order.map(Product=>{
                firebase.firestore().collection("Products").doc(Product.Catagory).
                collection(Product.Catagory+"_Products").doc(Product.Product_name).
                update({Quantity:""+Product.Quantity-Product.selected})
                .catch(error=>{alert("during item stock update"+error)})
            })
            this.props.navigation.pop();
            this.props.navigation.navigate("Clients_list");

        })
        
    }
    Remove_Item(Product,index){
        let Order = this.state.Order
        Order.splice(index,1)
        this.setState({Order,Sum:this.state.Sum-(Product.Price*Product.selected)})
        if(Order.length === 0){
            this.props.navigation.pop()
        }
    }
    render_order(Product,index){
        return(
            <View style = {styles.Product_style}>
                
                <Image resizeMethod ={'scale'} source = {{uri:Product.Img_Url}} style = {styles.Img_style}/>
                
                <Text adjustsFontSizeToFit ={true} style={{width:"40%",textAlignVertical:"center"}} >{Product.Product_name+"\n"}</Text>
                
                <View style = {styles.Count_by_price_Style}>
                    
                    <Text style = {{marginBottom:5}}>{"₪"+Product.Price+" x "+Product.selected}</Text>
                    
                    <Text>{"= ₪"+Product.Price*Product.selected}</Text>
                
                </View>

                <TouchableOpacity style = {styles.Remove_Item_Style} onPress = {()=>this.Remove_Item(Product,index)}>

                    <Text style= {styles.Remove_Item_Text_Style}>X</Text>
                
                </TouchableOpacity>
            
            </View>
        )
    }
    render(){
        return(
            <View style = {{backgroundColor:"#0c979e"}}>
                
                <View style = {{backgroundColor:"#ffffff"}} >

                    <ScrollView style = {{height:"80%"}}>
                    
                        <View style = {styles.List_style}>
                    
                            {this.state.Order.map((Product,index)=>this.render_order(Product,index))}
                    
                        </View>
                    
                    </ScrollView>

                    <View style = { {shadowOpacity:50,shadowColor:"gray",backgroundColor:"#0c979e",height:"20%"}}>

                        <Text style ={styles.Sum_Text_style}>

                            Order Sum: ₪{this.state.Sum}

                        </Text>

                        <TouchableOpacity onPress ={()=>this.Finish_Order()} >

                            <Text style = {styles.Finish_Text_style}>

                                Finish Order

                            </Text>

                        </TouchableOpacity>

                    </View>
                
                </View>

            </View>
        )
    }
}
export default Order;
styles = StyleSheet.create({
    List_and_Footer_style:{
        flex:1,
        flexDirection:"column",
    },
    List_style:{
        width:"100%",
        flex:1,
        flexDirection:"column",
        shadowOpacity:0.5,
        shadowColor:"gray",
        flexWrap:"wrap",
    },
    Product_style:{
        width:"100%",
        height:"15%",
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap",
        borderColor:"gray",
        borderBottomWidth:1,
        paddingVertical:5
    },
    Img_style:{
        width:"15%",
        height:"100%",
        marginHorizontal:5,
        resizeMode:"contain",
    },
    Count_by_price_Style:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center"
    },
    Remove_Item_Style:{
        justifyContent:"center",
        width:"10%"
    },
    Remove_Item_Text_Style:{
        width:"100%",
        color:"#cc0000",
        fontWeight:"bold",
        fontSize:20
    },
    Sum_Text_style:{
        textAlign:"center",
        alignSelf:"center",
        width:"100%",
        fontSize:30,
        marginVertical:10,
    },  
    Finish_Text_style:{
        paddingHorizontal:"8%",
        textAlign:"center",
        alignSelf:"center",
        // width:"70%",
        fontSize:35,
        fontWeight:"bold",
        marginVertical:10,
        color:"#ffffff",
        borderWidth:3,
        borderRadius:20,
        borderColor:"#ffffff"
    },
})