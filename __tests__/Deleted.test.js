import React from 'react';
import { render } from '@testing-library/react-native';
import { useSelector } from "react-redux"
import Deleted from "@view/Deleted"

const mockState = {
  articles: {
    articles: [{
      id: "1111111111",
      author: "author1",
      title: "article1",
      url: "www.google.com"
    }, {
      id: "2222222222",
      author: "author2",
      title: "article2",
      url: "www.google.com"
    }],
    favoriteArticles: [],
    deletedArticles: [
      "1111111111"
    ]
  }
}

jest.mock("react-redux", () => ({
  useSelector: jest.fn()
}))

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn()
}))

describe("Deleted Articles view", () => {
  beforeEach(() => {
    useSelector.mockImplementation((cb) => cb(mockState))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const tree = render(<Deleted />);
    expect(tree).toMatchSnapshot();
  });

  it('should render article present in deleted list', async () => {
    const tree = render(<Deleted />);
    const authorText = await tree.queryByTestId("list-item_author")    
    expect(authorText.props?.children).toBe("author1")
  });

  it('should not render article not present in deleted list', async () => {
    const tree = render(<Deleted />);
    const authorTextNodes = await tree.queryAllByTestId("list-item_author")    
    for(const node of authorTextNodes) {
      expect(node.props?.children).not.toBe("author2")  
    }
  });
})

