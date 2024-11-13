import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,  
} from 'react-native';
import { WebView } from 'react-native-webview';

interface IParams {
  title?: string;
  url?: string;
}

function Article() {
  const [loading, setLoading]  = useState(false)
  const route = useRoute()
  const navigation = useNavigation()
  const params: IParams | undefined = route.params  

  useEffect(() => {
    navigation.setOptions({
      title: params?.title
    })
  }, [navigation, params])

  return (
    <>
      {loading ? (        
        <ActivityIndicator size="large" style={{
          marginTop: 12,
        }} />
      ) : null}
      <WebView
        source={{ uri: params?.url || "" }}
        style={{ flex: 1, display: loading ? "none" : "flex" }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </>
  );
}

export default Article;
