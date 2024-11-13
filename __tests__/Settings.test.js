import React from 'react';
import { render, fireEvent } from '@testing-library/react-native'
import Settings from "@view/Settings"

import * as settingsSlice from "@store/slices/settings"

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const spySetNotificationsEnabled = jest.spyOn(settingsSlice,
  "setNotificationsEnabled"
)

jest.mock("@store/slices/settings", () => ({
  setNotificationsEnabled: jest.fn(),
}))

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}))

describe("Settings view", () => {  
  it('renders correctly', () => {
    const tree = render(<Settings />);
    expect(tree).toMatchSnapshot();
  });

  it('should call set notifications enabled if toggle is set to true', async () => {
    const tree = render(<Settings />);
    const toggle = await tree.findByTestId("settings_notification-enabled-toggle")
    fireEvent(toggle, "onValueChange", true)
    expect(spySetNotificationsEnabled).toHaveBeenCalled()
  });

})

