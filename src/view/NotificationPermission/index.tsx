import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,    
    Alert
} from 'react-native';
import notifee, { AuthorizationStatus }  from '@notifee/react-native';
import { Title } from "@component/Title"
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setNotificationsEnabled } from '@store/slices/settings';
import { setNotificationsPermissionStatus } from '@store/slices/permissions';

function NotificationPermission() {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()

    const handleContinue = async () => {        
        try {            
            const settings = await notifee.requestPermission();
            const status = settings?.authorizationStatus                   
            dispatch(setNotificationsPermissionStatus(status))            
            if (status === AuthorizationStatus.AUTHORIZED || status === AuthorizationStatus.PROVISIONAL) {
                dispatch(setNotificationsEnabled(true))
                navigation.navigate("App")
            } else if (status === AuthorizationStatus.DENIED) {
                Alert.alert("Alert", "Permissions have been denied, please try again or enable them in the OS settings")                
                dispatch(setNotificationsEnabled(false))
                console.log('Notification permission is denied');
            }            
        } catch (err) {
            dispatch(setNotificationsEnabled(false))
            console.error(err)
        }
    }

    const handleDeny = () => {
        dispatch(setNotificationsEnabled(false))
        navigation.navigate("App")
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <View />
                <View>
                    <Title text="Hacker News App" centered />
                </View>
                <View style={styles.middleContainer}>
                    <Text style={styles.text}>We request your permission to receive notifications in order to let you know when articles of your interest are created</Text>
                    <TouchableOpacity testID="notification-permission_continue" onPress={handleContinue}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity testID="notification-permission_deny"  onPress={handleDeny}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Don't send me notifications please</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: "lightgrey",
        flex: 1
    },
    container: {
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        margin: 12,
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 6
    },
    middleContainer: {
        alignItems: "center"
    },
    text: {
        textAlign: "center",
        width: 240
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        minWidth: 120
    },
    button: {

        backgroundColor: "blue",
        borderRadius: 6,
        marginTop: 12,
        padding: 12,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default NotificationPermission;
