import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Switch,
    View,
    Text,
} from 'react-native';
import Title from '@component/Title';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationsEnabled } from '@store/slices/settings';

function Settings() {
    const dispatch = useDispatch();
    const notificationsEnabled = useSelector(state => state.settings.notificationsEnabled);

    const handleToggle = () => {
        dispatch(setNotificationsEnabled(!notificationsEnabled));
    };

    return (
        <SafeAreaView>
            <Title text="Settings" />
            <View style={styles.optionContainer}>
                <Switch
                    testID="settings_notification-enabled-toggle"
                    value={notificationsEnabled}
                    onValueChange={handleToggle}
                    trackColor={{ false: '#ccc', true: '#4CAF50' }}
                    thumbColor={notificationsEnabled ? '#fff' : '#fff'}
                />
                <Text style={styles.optionText}>Notifications Enabled</Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginTop: 8,
    },
    optionText: {
        width: 240,
        marginLeft: 12,
    },
});

export default Settings;
