import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useSelector } from "react-redux"
import Articles from "@view/Articles"
import * as articlesSlice from "@store/slices/articles"
import * as offline from "react-native-offline"
import MockListItem from "../__mocks__/MockListItem"

const spySetQuery = jest.spyOn(articlesSlice, "setQuery");
const spyFetchArticles = jest.spyOn(articlesSlice, "fetchArticles")
const spySetArticles = jest.spyOn(articlesSlice, "setArticles")
const spyUseIsConnected = jest.spyOn(offline, "useIsConnected")
  .mockImplementation(() => true)

jest.mock('react-native-gesture-handler', () => ({
  Swipeable: () => <MockListItem title="title" url="www.google.com" />
}));

jest.mock("@store/slices/articles", () => ({  
  getState: () => ({
    settings: jest.fn(),
    articles: jest.fn()
  }),
  setQuery: jest.fn(),
  fetchArticles: jest.fn(),
  setArticles: jest.fn()
}))

const mockState = {
  articles: {
    articles: [{
      id: "1111111111",
      author: "author1",
    }, {
      id: "2222222222",
      author: "author2",
    }, {
      id: "3333333333",
      author: "author3",
    }, {
      id: "4444444444",
      author: "author4",
    }],
    favoriteArticles: ["3333333333"],
    deletedArticles: ["4444444444"]
  }
}

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}))

const mockNavigate = jest.fn()

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate
  })
}))

jest.mock("react-native-offline", () => ({
  useIsConnected: jest.fn().mockReturnValue(true)
}))

describe("Main Articles view", () => {
  beforeEach(() => {
    useSelector.mockImplementation((cb) => cb(mockState))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const tree = render(<Articles />);
    expect(tree).toMatchSnapshot();
  });

  it('should render all the articles but the deleted one', async () => {
    const tree = render(<Articles />);
    const flatList = await tree.findByTestId("articles_flat-list")
    expect(flatList.props?.data?.length).toBe(3)
    expect(flatList.props?.data?.some(item => item.author === "author4")).toBeFalsy()
  });

  it("should dispatch setQuery on text change", async () => {
    const tree = render(<Articles />);
    const input = await tree.findByTestId("articles_text-input")
    fireEvent.changeText(input, 'Android');
    expect(spySetQuery).toHaveBeenCalled()
  })

  it('should dispatch fetchArticles and setArticles on submit text', async () => {
    const tree = render(<Articles />);
    const input = await tree.findByTestId("articles_text-input")
    fireEvent(input, 'submitEditing');
    expect(spyFetchArticles).toHaveBeenCalled()
    expect(spySetArticles).toHaveBeenCalled()    
  });

  it('should not dispatch fetchArticles and setArticles on submit text if device is offline', async () => {
    spyUseIsConnected.mockImplementation(() => false)
    const tree = render(<Articles />);
    const input = await tree.findByTestId("articles_text-input")
    fireEvent(input, 'submitEditing');
    expect(spyFetchArticles).not.toHaveBeenCalled()
    expect(spySetArticles).not.toHaveBeenCalled()    
  });

  it('should navigate to Article/WebView view with corresponding url if ListItem is pressed', async () => {    
    const tree = render(<Articles />);
    const listItem = await tree.queryAllByTestId("list-item_pressable")?.[0]
    fireEvent(listItem, 'press')
    expect(mockNavigate).toHaveBeenCalledWith({
      title: "title",
      url: "www.google.com"
    })
  });
})

