import { createStackNavigator } from "@react-navigation/stack";
import Articles from "@view/Articles"
import Deleted from "@view/Deleted"
import Favorites from "@view/Favorites"
import Settings from "@view/Settings"

const Stack = createStackNavigator()

export const AppStack = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="Home" component={Articles}>            
        </Stack.Screen>        
        <Stack.Screen name="Deleted" component={Deleted}>            
        </Stack.Screen>
        <Stack.Screen name="Favorites" component={Favorites}>            
        </Stack.Screen>        
        <Stack.Screen name="Settings" component={Settings}>            
        </Stack.Screen>        
    </Stack.Navigator>
)
