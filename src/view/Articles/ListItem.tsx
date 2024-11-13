import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { IArticle } from '@interfaces';
import FavoriteIcon from '@img/icons/favorite.png';
import { openLink, getTimeAgoFromTS } from '../../lib';

interface IListItemProps {
  item: IArticle;
  onLongPress: (id: string) => void;
  isFavorite: boolean;
}

function ListItem({
  item,
  onLongPress,
  isFavorite,
}: IListItemProps): React.JSX.Element {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const handlePress = () => Platform.OS === 'ios' ? openLink(item.url) : navigation.navigate('Article',
    { url: item.url, title: item.title }
  );

  const timeAgo = getTimeAgoFromTS(new Date(item.createdAt).getTime());

  return (
    <TouchableOpacity
      testID="list-item_pressable"
      onPress={handlePress}
      onLongPress={() => onLongPress?.(item.id)}
    >
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.infoTopContainer}>
            {isFavorite ? (
              <Image source={FavoriteIcon} style={styles.favoriteIcon} />
            ) : null}
          </View>
          <Text>{item.title}</Text>
          <Text style={styles.authorText} testID="list-item_author">{item.author} - {timeAgo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    alignItems: 'center',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: 'grey',
    marginHorizontal: 8,
  },
  infoTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: -12,
    top: -12,
  },
  authorText: {
    marginTop: 8,
    color: 'grey',
  },
});

export default ListItem;
