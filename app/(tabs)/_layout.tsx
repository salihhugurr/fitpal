import TabBar from "@/components/TabBar";
import useResponsive from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Tabs } from "expo-router";

const TabBarIcon = ({
  color,
  size,
  name,
}: {
  color: string;
  size: number;
  name: any;
}) => {
  return <FontAwesome name={name} color={color} size={size} />;
};

export default function TabsLayout() {
  const { moderateScale } = useResponsive();
  const color = useThemeColor();
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: color.border,
        },
        tabBarItemStyle: {
          backgroundColor: color.error,
          marginHorizontal: 5,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name={"home"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          headerShown: false,
          tabBarLabel: "Plan",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name={"calendar"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="food_log"
        options={{
          headerShown: false,
          tabBarLabel: "Food Log",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name={"apple"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          headerShown: false,
          tabBarLabel: "Progress",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name={"line-chart"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name={"user"} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
