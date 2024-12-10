import { ScreenLayout } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import useResponsive from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import useUserStore from "@/store/user";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { user } = useUserStore();
  const { scale, verticalScale, moderateScale } = useResponsive();
  const color = useThemeColor();

  // Dummy fitness and healthy life activity data
  const activities = [
    {
      id: 1,
      title: "Morning Run Completed",
      timestamp: "1 hour ago",
      description: "You ran 5 kilometers in 30 minutes. Great pace!",
    },
    {
      id: 2,
      title: "Hydration Goal Reached",
      timestamp: "3 hours ago",
      description: "You drank 8 glasses of water today. Stay hydrated!",
    },
    {
      id: 4,
      title: "Workout Completed",
      timestamp: "2 days ago",
      description: "You completed a 45-minute strength training session.",
    },
    {
      id: 5,
      title: "Steps Goal Achieved",
      timestamp: "3 days ago",
      description: "You reached 10,000 steps. Keep moving!",
    },
  ];

  return (
    <ScreenLayout headerTitle="Home">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: scale(50),
          paddingTop: verticalScale(10),
          paddingBottom: verticalScale(100),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText type="title">Hello {user?.firstName} 👋</ThemedText>
          <ThemedText>
            Fitness Score: <ThemedText type="link">100</ThemedText>
          </ThemedText>
        </View>
        <View style={{ marginTop: verticalScale(20), gap: verticalScale(20) }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ThemedText type="subtitle">Latest Activities</ThemedText>
            <TouchableOpacity>
              <ThemedText type="link">See All</ThemedText>
            </TouchableOpacity>
          </View>
          {activities.map((activity) => (
            <View
              key={activity.id}
              style={{
                backgroundColor: color.border,
                borderRadius: 10,
                paddingHorizontal: scale(30),
                paddingVertical: verticalScale(15),
                marginBottom: verticalScale(10),
                shadowColor: color.backgroundOpposite,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <ThemedText type="subtitle">{activity.title}</ThemedText>
              <ThemedText
                style={{
                  marginTop: verticalScale(5),
                  color: color.secondary,
                  fontSize: moderateScale(15),
                }}
              >
                {activity.timestamp}
              </ThemedText>
              <ThemedText
                style={{
                  marginTop: verticalScale(5),
                  fontSize: moderateScale(18),
                }}
              >
                {activity.description}
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
