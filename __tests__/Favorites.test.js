import React from 'react';
import { render } from '@testing-library/react-native';
import { useSelector } from "react-redux"
import Favorites from "@view/Favorites"

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
    }],
    favoriteArticles: ["3333333333"],
    deletedArticles: []
  }
}

jest.mock("react-redux", () => ({
  useSelector: jest.fn()
}))

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn()
}))

describe("Favorites Articles view", () => {
  beforeEach(() => {
    useSelector.mockImplementation((cb) => cb(mockState))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const tree = render(<Favorites />);
    expect(tree).toMatchSnapshot();
  });

  it('should render article present in favorites list', async () => {
    const tree = render(<Favorites />);
    const authorText = await tree.queryByTestId("list-item_author")    
    expect(authorText.props?.children).toBe("author3")
  });

  it('should not render article not present in favorites list', async () => {
    const tree = render(<Favorites />);
    const authorTextNodes = await tree.queryAllByTestId("list-item_author")    
    for(const node of authorTextNodes) {
      expect(node.props?.children).not.toBe("author1")    
      expect(node.props?.children).not.toBe("author2")          
    }
  });
})

