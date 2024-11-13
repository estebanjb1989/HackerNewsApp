import React, { useMemo } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import ListItem from "@view/Articles/ListItem"
import Title from "@component/Title"
import _ from "lodash"
import { useSelector } from 'react-redux';
import { IArticle, IState } from "@interfaces"

const Separator = () => <View style={{ height: 10 }} />;

function Favorites() {  
  const [
    articles,
    deletedArticles,
    favoriteArticles
  ] = useSelector((state: IState) => [
    state.articles.articles,
    state.articles.deletedArticles,
    state.articles.favoriteArticles
  ])

  const articlesMemo = useMemo(() => {
    return articles?.filter?.((article: IArticle) =>
      !deletedArticles?.some((da: IArticle) => da === article.id) &&
      favoriteArticles?.some((fa: IArticle) => fa === article.id)
    )
  }, [articles, deletedArticles])


  return (
    <SafeAreaView>
      <Title text="Favorites" />
      <FlatList        
        data={articlesMemo}
        keyExtractor={(item) => item.id}
        windowSize={10}
        renderItem={({ item }) => (
          <ListItem
            key={item.title}
            item={item}
            isFavorite={true}
          />
        )}
        ItemSeparatorComponent={Separator}
      />

    </SafeAreaView>
  );
}

export default Favorites;
