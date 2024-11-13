import React from "react";
import CustomDrawer from "./CustomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppStack } from "./AppStack";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={() => <CustomDrawer />}>
      <Drawer.Screen
        options={{
          title: "Hacker News",
        }}
        name={"DrawerNavigator/AppStack"}
        component={AppStack}
      />
    </Drawer.Navigator>
  );
}
