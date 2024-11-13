import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';

interface IParams {
  title?: string;
  url?: string;
}

function Article() {
  const [loading, setLoading]  = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const params: IParams | undefined = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: params?.title,
    });
  }, [navigation, params]);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" style={styles.activityIndicator} />
      ) : null}
      <WebView
        allowsBackForwardNavigationGestures
        domStorageEnabled
        allowFileAccess
        useWebView2
        allowsLinkPreview
        javaScriptEnabled
        source={{ uri: params?.url || '' }}
        style={[styles.webview, loading ? styles.hidden : styles.visible]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 12,
  },
  webview: { flex: 1 },
  visible: { display: 'flex' },
  hidden: { display: 'none' },
});

export default Article;
