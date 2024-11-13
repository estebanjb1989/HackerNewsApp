import React from 'react';
import { render, fireEvent } from '@testing-library/react-native'
import { useSelector } from "react-redux"
import NotificationPermission from "@view/NotificationPermission"

import * as permissionsSlice from "@store/slices/permissions"
import * as settingsSlice from "@store/slices/settings"

const mockState = {
  permissions: {
    notificationsPermissionStatus: null
  }
}

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const spySetNotificationsPermissionStatus = jest.spyOn(permissionsSlice,
  "setNotificationsPermissionStatus");

const spySetNotificationsEnabled = jest.spyOn(settingsSlice,
  "setNotificationsEnabled"
)

jest.mock('@notifee/react-native', () => ({
  requestPermission: jest.fn(),
  AuthorizationStatus: jest.fn()
}))

jest.mock("@store/slices/permissions", () => ({
  setNotificationsPermissionStatus: jest.fn(),
}))

jest.mock("@store/slices/settings", () => ({
  setNotificationsEnabled: jest.fn(),
}))

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}))

describe("Notification Permission view", () => {
  beforeEach(() => {
    useSelector.mockImplementation((cb) => cb(mockState))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const tree = render(<NotificationPermission />);
    expect(tree).toMatchSnapshot();
  });

  it('should call set notifications enabled true and navigate to app if user decides to continue', async () => {
    const tree = render(<NotificationPermission />);
    const continueButton = await tree.findByTestId("notification-permission_continue")
    fireEvent.press(continueButton)
    expect(spySetNotificationsPermissionStatus).toHaveBeenCalled()
  });

  fit('should call set notifications enabled false and navigate to app if user decides to deny', async () => {
    const tree = render(<NotificationPermission />);
    const denyButton = await tree.findByTestId("notification-permission_deny")
    fireEvent.press(denyButton)    
    expect(spySetNotificationsEnabled).toHaveBeenCalled()
  });
})

