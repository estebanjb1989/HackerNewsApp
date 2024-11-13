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
import { IArticle, IState } from '@interfaces';
import { useSelector } from 'react-redux';

const Separator = () => <View style={{ height: 10 }} />;

function Deleted() {  
  const [
    articles,
    deletedArticles,    
  ] = useSelector((state: IState) => [
    state.articles.articles,
    state.articles.deletedArticles,    
  ])

  const articlesMemo = useMemo(() => {
    return articles.filter((article: IArticle) =>
      deletedArticles?.some((da: IArticle) => da === article.id)
    )
  }, [articles, deletedArticles])


  return (
    <SafeAreaView>
      <Title text="Deleted Articles" />
      <FlatList
        style={styles.flatList}
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

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: 'white'
  },
});

export default Deleted;
