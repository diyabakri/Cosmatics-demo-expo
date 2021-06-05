import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/Home"
const Stack = createStackNavigator();

export default function stack(){
    return(
        <NavigationContainer>
            <Stack.Screen name = "Home" component = {Home}/>
        </NavigationContainer>
    )
}