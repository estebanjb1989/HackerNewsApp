import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import notifee from '@notifee/react-native';
import { IArticle, IState } from "@interfaces";

interface IArticleState {
  articles: IArticle[];
  deletedArticles: string[];
  favoriteArticles: string[];
  loading: boolean;
  query: string;
}

const initialState = {
  articles: [],
  deletedArticles: [],
  favoriteArticles: [],
  loading: false,
  query: "tech"
} as IArticleState;

const articlesSlice = createSlice({
  name: "articlesSlice",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setArticles(state, action) {
      state.articles = action.payload;
    },
    deleteArticle(state, action) {
      state.deletedArticles = [...(state.deletedArticles || []), action.payload]
    },
    addToFavorites(state, action) {
      state.favoriteArticles = [...(state.favoriteArticles || []), action.payload]
    },
    removeFromFavorites(state, action) {
      state.favoriteArticles = state.favoriteArticles?.filter(fa => fa !== action.payload)
    },
    setQuery(state, action) {
      state.query = action.payload
    }
  },
});

// Define an async action creator
export const fetchArticles = createAsyncThunk(
  'articles/fetch',
  async (args, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true))
      const query = (getState() as IState).articles?.query

      const response = await fetch("https://hn.algolia.com/api/v1/search_by_date?query=" + query)
      const data = await response.json()

      const articles = data.hits
        .filter((hit: any) => hit.story_title && hit.story_url)
        .map((hit: any) => ({
          id: hit.created_at_i,
          title: hit.story_title,
          author: hit.author,
          createdAt: hit.created_at,
          url: hit.story_url
        } as IArticle))
        .sort((a: any, b: any) => {
          if (a.created_at_i > b.created_at_i) return -1;
          if (a.created_at_i < b.created_at_i) return 1;
          return 0;
        })

      const notificationsEnabled = (getState() as IState)?.settings?.notificationsEnabled
      const currentArticles = (getState() as IState)?.articles?.articles

      if (notificationsEnabled && currentArticles?.length > 0) {
        const newArticles = articles.filter((art: IArticle) =>
          !currentArticles?.some((curr: IArticle) => curr.id === art.id)
        )

        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });

        for (const newArticle of newArticles) {
          await notifee.displayNotification({
            title: "New article by " + newArticle.author,
            body: newArticle.title,
            data: {
              url: newArticle.url || ""
            },
            android: {
              channelId,
              smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
              // pressAction is needed if you want the notification to open the app when pressed
              pressAction: {
                id: 'default',
              },
            },
          });
        }
      }

      return articles
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      dispatch(setLoading(false))
    }
  }
);

export const {
  setLoading,
  setArticles,
  deleteArticle,
  addToFavorites,
  removeFromFavorites,
  setQuery
} = articlesSlice.actions;

export default articlesSlice.reducer;
