import { FC } from "react";
import { Text, View, Image, ImageSourcePropType } from "react-native";
import { styled } from "nativewind";
import { Tabs, Redirect } from "expo-router";
import icons from "../../constants/index";

interface TabProps {
  name: string;
  icon: ImageSourcePropType;
  focused: boolean;
}

const TabIcon: FC<TabProps> = ({ name, icon, focused }) => {
  const StyledText = styled(Text);
  const StyledView = styled(View);

  return (
    <StyledView className="flex fle-col items-center">
      <Image
        source={icon}
        resizeMode="contain"
        alt="tab image"
        style={{
          width: 24,
          height: 24,
          //   tintColor: focused ? "gray-200" : "gray-500",
        }}
      />
      <StyledText
        className={`text-sm ${
          focused ? "font-black text-gray-200" : "font-normal text-gray-500"
        }`}
      >
        {" "}
        {name}{" "}
      </StyledText>
    </StyledView>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 1,
          borderTopColor: "#000",
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="Artists"
        options={{
          title: "Artists",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} name="Artists" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Albums"
        options={{
          title: "Albums",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.album} name="Albums" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Tweets"
        options={{
          title: "Tweets",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.tweet} name="Tweets" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
