import React,{Component} from 'react';
import { ActivityIndicator,Text,View,TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from "../config/Firebase"

class Clients_list extends Component{
    constructor(props){
        super(props)
        this.state ={
            Clients_list:[],
            loading: true,
        }
    }
async componentDidMount(){
    let Clients_list = []
    let db_ref = firebase.firestore().collection('Clients');
    db_ref.get().then(Col=>{
        Col.forEach(doc => Clients_list.push(doc.data()))
        this.setState({Clients_list,loading:false})
    }).catch(error => alert(error))
}
render_Item(Client){
    return(
        <TouchableOpacity 
            onPress = {()=>this.props.navigation.navigate("Catalog",Client)}
        >
            <View  style = {{width:"100%",paddingVertical:10,flex:1,flexDirection:"row",borderBottomWidth:1,borderColor:"black"}}>
                <View>
                    <Text style = {{paddingLeft:"10%",fontSize:25,fontWeight:"bold",color:"gray"}}>{Client.Name} </Text>
                </View>
                <View style = {{flex:1,flexDirection:"column",justifyContent:"center"}}>
                    <Text style = {{textAlign:"center"}}>{Client.Email}</Text>
                    <Text style = {{textAlign:"center"}}>{Client.Phone_number}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
render(){
    return(
        <View>
            {this.state.loading?<ActivityIndicator  size="large" color="#6d6d6d" style = {{paddingTop:"75%",alignSelf:"center"}}/>:<ScrollView>
            {this.state.Clients_list.map(Client=>this.render_Item(Client))}
            </ScrollView>}
        </View>
    )
}
}
export default Clients_list;