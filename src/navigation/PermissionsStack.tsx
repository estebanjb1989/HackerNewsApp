import { createStackNavigator } from "@react-navigation/stack";
import NotificationPermission from "@view/NotificationPermission"

const Stack = createStackNavigator()

export const PermissionsStack = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="NotificationPermission" component={NotificationPermission}>            
        </Stack.Screen>        
    </Stack.Navigator>
)
