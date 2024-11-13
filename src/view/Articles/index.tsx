import React, { useMemo, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  RefreshControl
} from 'react-native';
import { throttle } from 'lodash';
import ListItem from "./ListItem"
import _ from "lodash"
import { useDispatch, useSelector } from 'react-redux';
import { useIsConnected } from 'react-native-offline';
import { Swipeable } from 'react-native-gesture-handler';
import { IState, IArticle } from "@interfaces"
import Title from "@component/Title"
import Spacer from "@component/Spacer"
import {
  setArticles,
  deleteArticle,
  addToFavorites,
  removeFromFavorites,
  fetchArticles,
  setQuery
} from '@store/slices/articles';
import DeleteIcon from "@img/icons/delete.png"

const Separator = () => <View style={{ height: 10 }} />;

function Articles() {
  const isConnected = useIsConnected()
  const dispatch = useDispatch()
  const [
    articles,
    deletedArticles,
    favoriteArticles,
    loading,
  ] = useSelector((state: IState) => [
    state.articles.articles,
    state.articles.deletedArticles,
    state.articles.favoriteArticles,
    state.articles.loading
  ])

  const articlesMemo = useMemo(() => {
    return articles?.filter?.((article: IArticle) => 
      !deletedArticles?.some((da: string) => da === article.id))
  }, [articles, deletedArticles])

  const onRefresh = useCallback(async () => {
    if (!isConnected) return
    const data = await dispatch(fetchArticles())
    dispatch(setArticles(data?.payload))
  }, [isConnected])

  useEffect(() => {
    onRefresh()
  }, [isConnected])

  const handleItemDelete = (id: string) => () => {
    dispatch(deleteArticle(id))
  }

  const handleItemLongPress = useCallback((id: string) => () => {
    if (favoriteArticles?.some((fa: string) => fa === id)) {
      dispatch(removeFromFavorites(id))
    } else {
      dispatch(addToFavorites(id))
    }
  }, [favoriteArticles])

  const handleTextInput = (text: string) => {
    dispatch(setQuery(text))
  };

  const throttledHandleTextInput = throttle(handleTextInput, 2000);

  return (
    <SafeAreaView>
      <Title text="Home" />
      <TextInput
        testID="articles_text-input"
        onChangeText={(text) => throttledHandleTextInput(text)}
        style={styles.textInput}
        placeholder='Search by topic... (iOS, Android, etc.)'
        placeholderTextColor="grey"
        onSubmitEditing={onRefresh}
      />
      <FlatList
        testID="articles_flat-list"
        data={articlesMemo}
        keyExtractor={(item) => item.id}
        windowSize={10}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => (
              <TouchableOpacity onPress={handleItemDelete(item.id)}>
                <View style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </View>
              </TouchableOpacity>
            )}
          >
            <ListItem
              onLongPress={handleItemLongPress(item.id)}
              key={item.title}
              item={item}
              isFavorite={favoriteArticles?.some((fa: string) => fa === item.id)}
            />
          </Swipeable>
        )}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={<Spacer height={120} />}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    marginBottom: 12,
    marginHorizontal: 12,
    color: "black"
  },
  deleteButton: {
    backgroundColor: "red",
    width: 80,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -8
  },
  deleteButtonText: {
    textAlign: "center",
    width: 80,
    color: "white"
  }
});

export default Articles;
