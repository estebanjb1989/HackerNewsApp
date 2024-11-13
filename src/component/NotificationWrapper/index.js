import { useEffect } from 'react';
import { Platform } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundFetch from 'react-native-background-fetch';
import { useDispatch } from 'react-redux';
import { fetchArticles, setArticles } from '@store/slices/articles';
import { openLink } from '@lib';

export const NotificationWrapper = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    notifee.onForegroundEvent((event) => {
      if (event.type === EventType.PRESS) {
        const url = event.detail?.notification?.data?.url;
        if (Platform.OS === 'ios') {
          openLink(url);
        } else {
          navigation.navigate('Article', {
            url,
          });
        }
      }
    });

    notifee.onBackgroundEvent(async (event) => {
      if (event.type === EventType.PRESS) {
        const url = event.detail?.notification?.data?.url;
        if (Platform.OS === 'ios') {
          openLink(url);
        } else {
          navigation.navigate('Article', {
            url,
          });
        }
      }
    });

    const configureBF = async () => {
      try {
        await BackgroundFetch.configure(
          {
            startOnBoot: true,
          },
          async (taskId) => {
            const data = await dispatch(fetchArticles());
            dispatch(setArticles(data.payload));
          },
          (taskId) => {
            BackgroundFetch.finish(taskId);
          }
        );

        await BackgroundFetch.start();
        const status = await BackgroundFetch.status();
        if (status !== 2) {
          throw "Background fetch couldn't initialize";
        } else {
          console.log('Background fetch started!');
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    };

    configureBF();
  }, [dispatch, navigation]);

  return null;
};
