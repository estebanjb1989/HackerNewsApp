import { NavigationContainer } from '@react-navigation/native';
import { NotificationWrapper } from '@component/NotificationWrapper';
import AppDrawer from "./AppDrawer"
import { PermissionsStack } from './PermissionsStack';
import { createStackNavigator } from '@react-navigation/stack';
import Article from "@view/Article"
import { useSelector } from 'react-redux';
import { IState } from '@interfaces';

const MainStack = createStackNavigator()

export const AppNavigation = () => {
    const notificationsPermissionStatus = useSelector((state: IState) => state.permissions?.notificationsPermissionStatus)

    return (
        <NavigationContainer>
            <MainStack.Navigator screenOptions={{
                headerShown: false
            }}>
                {notificationsPermissionStatus !== 1 && <MainStack.Screen name="Permissions" component={PermissionsStack} />}
                <MainStack.Screen name="App" component={AppDrawer} />
                <MainStack.Screen options={{
                    headerShown: true,
                }} name="Article" component={Article} />
            </MainStack.Navigator>

            <NotificationWrapper />
        </NavigationContainer>
    )
}