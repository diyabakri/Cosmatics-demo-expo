import React,{Component} from 'react';
import { ActivityIndicator,StyleSheet, Text, Image,ScrollView, TouchableOpacity } from 'react-native';
import {Button, View,CheckBox} from "native-base"
import firebase from "../config/Firebase"
import { TextInput } from 'react-native-gesture-handler';
class Restock extends Component{

    constructor(props){
        super(props);
        this.state = {
            Client:{},//contains the info for the current client
            collection : [],//contains all the products every product in the cloud database
            loading: true,//if true means the data is being loaded from the cloud when load is complete it turned into false and allows for screen to render
            Sum:0,//final sum of the order cost 
            active_tabs:{},//object used to keep only one tap open
            products_quantity:{}//contains the list of products picked for the order
        }
        /* collection structer = [{key:catagory name,Products:{Product_name1:{barcode:"",.....price:0}...product_name_n{}}}]         */ 
    }
    //builds a new list called order in which is all the products selected with the amount selected
    Update_Stock(){
        let Order = []
        let collection = this.state.collection
        let products_selected = this.state.products_quantity
        for(var i=0;i < collection.length;i++){
            let curr_catagory = collection[i].Products;
            for(var prop in curr_catagory){
                let curr_bar_code = curr_catagory[prop].Bar_Code
                if(products_selected[curr_bar_code].quantity_selected>0 && products_selected[curr_bar_code].Checked){
                    let temp = curr_catagory[prop]
                    temp.Quantity =  ""+(parseInt(temp.Quantity,10)+products_selected[curr_bar_code].quantity_selected)
                    Order.push(temp)
                }
            }
        }
        Order.map(Product=>{
            firebase.firestore().collection("Products").doc(Product.Catagory).collection(Product.Catagory+"_Products").doc(Product.Product_name).
            update({Quantity:Product.Quantity}).catch(error => console.log("Product stock updated"))
        })
        this.setState({Sum:0})
        this.componentDidMount();
    }
    Render_Catagory (doc,index){ 

        let active_tabs = this.state.active_tabs
          return(

            <View style = {styles.Catagory_style} >
                
                <Button onPress ={() =>  {
                                    for(let prop in active_tabs){  
                                        if (active_tabs[prop] && prop != doc.key){
                                            active_tabs[prop] = false
                                        }
                                    } // check for active taps and closes them
                                    active_tabs[doc.key] = !this.state.active_tabs[doc.key]
                                    this.setState(active_tabs)
                                }}
                        style = {styles.Devider_style}
                >
                <Text style = {styles.Devider_Text_style} >
                    {doc.key}
                </Text>
                </Button>
                                {/* for each product in this catagory call the function render product which returns the css for each product  */}
                    {this.state.active_tabs[doc.key]?//if the tap was clicked on start rendering the products else dont render anything
                    
                    <View style = {styles.Content_style} >
                    
                    {doc.Products.map(product=>this.Render_Product(product,index))}
                    
                    </View>
                    
                    :
                    
                    <View></View>
                    }
            
            </View>
          )
           
    }
    Render_Product (doc,index){
        //index is not used but is reserved for future use if need it contains the index of the product in the array collection 
        
        //update the sum in header
        //help vars
        //contains an array of objects each object has an bar_code prop as the name of the object and for each bar_code the is two props checked:bool , quantity_selected:Number
        let products_quantity = this.state.products_quantity
        //contains the current product in use and or change of values or render
        let current_product = products_quantity[doc.Bar_Code]
        //contains the current sum befor the currrent change and all changes are done on eit befor update
        let Sum = this.state.Sum
        //--------
        return(
            <View>
                <View style = {{

                    width:150,
                    height:25,
                    backgroundColor:current_product.Checked?
                    "#0c979e":"#ffffff",
                    alignSelf:"center",
                    justifyContent:"center",
                    marginTop:5,
                  
                    }}>
                        {/*item select check box if the quantaty is at 0 it adds 1 then adds the price to sum if more than one it adds selected quantity*price to sum  */}
                    <CheckBox   
                        checked={current_product.Checked} 
                        style = {{alignSelf:"center",justifyContent:"center",marginRight:22,height:20,width:20}}
                        onPress = {
                            ()=>
                            {
                                current_product.Checked = !current_product.Checked

                                if(current_product.Checked){
                                    if(current_product.quantity_selected==0){
                                        current_product.quantity_selected++
                                    }
                                    Sum+=(current_product.quantity_selected*doc.Price)
                                    this.setState({products_quantity,Sum})
                                }else{
                                    Sum-=(current_product.quantity_selected*doc.Price)
                                    this.setState({products_quantity,Sum}) 
                                }
                            }
                        } 
                    />

                </View>
                
                <TouchableOpacity //the imig and name of the product navigate to the product page with more info
                    style = {current_product.Checked?
                        styles.Checked_Item_style : styles.Item_style
                    }
                    // onPress = {()=> this.props.navigation.navigate('Product',doc)}
                >
                    {/* product name text it changes color based on the checked status of the product white is true black if false */}
                    <Text adjustsFontSizeToFit={true}  style = {current_product.Checked?styles.Checked_Item_Text_style:styles.Item_Text_style}>{doc.Product_name}</Text>
                    {/* the imge of the product imported via url */}
                    <Image resizeMethod ={'scale'} style = {styles.Img_style} source = {{uri:doc.Img_Url}}/> 
                
                </TouchableOpacity>
                
                <View style = {current_product.Checked?styles.Checked_quantity_bar:styles.quantity_bar}>
                    {/* when the button "-" is pressed the value of the product selected quantity is decrmnted by one */}
                    <Button transparent onPress={ ()=>{
                        if(current_product.quantity_selected>0){
                            current_product.quantity_selected--
                            //if the product is selected decreas the sum 
                            if(current_product.Checked){
                                Sum-=parseInt(doc.Price,10)
                            }
                        }
                        //update screen
                        this.setState({Sum})
                        this.setState({products_quantity})
                    } }>

                    <Text style = {{color:current_product.Checked?"white":"red",fontSize:30}}>-</Text>
                    
                    </Button>
                    {/* text input for the quantity cant go less than 0 or higher than in stock */}
                    <TextInput 
                        style = {styles.quantity_input}
                        keyboardType = {"decimal-pad"}
                        value = {""+current_product.quantity_selected}
                        onChangeText = {text => { 
                            //if the value enterd is less than 0 or not a number
                            if(parseInt(text,10)<0||isNaN(parseInt(text,10))){
                                text=0
                            }
                            //if the value is higher than the in stock 
                            //remove the prev value*price from sum
                            if(current_product.Checked){
                            Sum-=(current_product.quantity_selected*parseInt(doc.Price,10))
                            }
                            //get the new value
                            current_product.quantity_selected = parseInt(text,10)
                            //add the value * price to sum
                            if(current_product.Checked){
                            Sum+=(current_product.quantity_selected*parseInt(doc.Price,10))
                            }
                            //update state and screen
                            this.setState({products_quantity,Sum})

                        }} 
                        
                    />
                    {/* same as "-" button but adds to quantity */}
                    <Button transparent 
                    onPress={ ()=>{
                        
                        if(current_product.Checked){
                            Sum+=parseInt(doc.Price,10)
                        }
                        current_product.quantity_selected++
                    
                        //update screen and state
                        this.setState({Sum})
                        this.setState({products_quantity})
                    } }>
                    <Text style = {{color:current_product.Checked?"white":"blue",fontSize:30}}>+</Text>
                    </Button>

                </View>
                <View style ={styles.stock_style}>
                    <Text>{/* doc.Quantity contains the amount of the current product left in stock */}
                        In Stock: {parseInt(doc.Quantity,10)+parseInt(current_product.quantity_selected,10)}
                    </Text>
                </View>
            
            </View>
        )
    }
    async componentDidMount(){
        //main product collection "collection of Catagories"
        let db_ref = firebase.firestore().collection('Products');
        
        await db_ref.get().then((Db)=>{
            let Col_buff = []
            let Indexer ={}
            let temp_active = {} //contains catagory names with false for every catagory used to close and open taps
            let quantity_buffer = {}
            //db_ref has one doc only => Indexer document contains the names of every collection
            Db.docs.forEach(doc=>(Indexer=doc.data()))
            //going through Indexer feildes in order to get every catagory
           
            for(let prop in Indexer){
                
                let Catagory_buffer = {
                    key:prop,
                    Products:[]
                }//add a proparty with the catagory name
                
                db_ref.doc(prop).collection(prop+"_Products").get().then(//get the current collection in side prop = "curr catagory name"  
                    Col => {
                        
                        Col.forEach(Col_doc=>{//add every document in the current collection to the Catagory indexer inside the Buffer
                            Catagory_buffer.Products.push(Col_doc.data())
                            //add for each bar_code a quantity in the buffer
                            quantity_buffer[Col_doc.data().Bar_Code] = {quantity_selected:0,Checked:false}
                        })
                        
                        Col_buff.push(Catagory_buffer)//add the buffer as an element in the array Col_buff
                        temp_active[Catagory_buffer.key]=false//mark catagory tap as closed
                        // console.log(Col_buff)
                        this.setState({collection:Col_buff});//insert all the data in collection state and stop loading status
                    })    
                }
                
                this.setState({loading:false,active_tabs:temp_active,products_quantity:quantity_buffer,Client:this.props.route.params})
        })
        
        .catch(error => alert(error))
        
    }
    render(){
        return( 
        <View style = {styles.background_style}>
           <View style = {{flex:1,flexDirection:"row",flexWrap:"wrap",justifyContent:"center",width:"100%",height:"95%"}}>
               {this.state.loading?<ActivityIndicator  size="large" color="#6d6d6d" style = {{paddingTop:"75%",alignSelf:"center"}}/>: 
                <View>
                <ScrollView>
                <View style = {styles.List_style}>
                    {this.state.collection.map((item,index)=>this.Render_Catagory(item,index))}
                </View>
                </ScrollView>
                {this.state.Sum>0?<TouchableOpacity onPress = {()=>this.Update_Stock()} style = {styles.Update_Stock}><Text adjustsFontSizeToFit= {true} style = {styles.Fin_Text_order}>Update Stock</Text></TouchableOpacity>:<View/>}
                </View>
               }  
           </View>
        </View>
            )
        }
    }
    
export default Restock;
    
let styles =StyleSheet.create({
    background_style:{
        height:'100%',
        width:'100%',
        backgroundColor : "#f6f6f6"
    },
    Update_Stock:{
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
    Fin_Text_order:{
        textAlign:"center",
        color:"#ffffff",
        fontSize:30,
        fontWeight:"bold",
    },
    Content_style:{
        paddingTop:5,
        shadowOpacity:50,
        shadowColor:"gray",
        width:"100%",
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        flexWrap:"wrap",
        height:"45%",
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