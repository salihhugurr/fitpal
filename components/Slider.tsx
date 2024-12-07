import React, { useState } from "react";
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import useResponsive from "@/hooks/useResponsive";
import { onboardingData } from "@/constants";
import { useThemeColor } from "@/hooks/useThemeColor";

export const Slider = ({ data }: { data: typeof onboardingData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scale, moderateScale, verticalScale, screenWidth } = useResponsive();
  const color = useThemeColor();

  const onDotPress = (index: number) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const flatListRef = React.useRef<FlatList>(null);

  const handleScroll = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / screenWidth);
    if (newIndex > data.length - 1 || newIndex < 0) {
      return;
    } else if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const renderItem = ({ item }: any) => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        width: screenWidth,
        paddingHorizontal: scale(50),
      }}
    >
      <Image
        source={item.image}
        borderRadius={scale(50)}
        style={{
          borderRadius: scale(50),
          width: "100%",
          height: verticalScale(400),
          resizeMode: "cover",
          marginBottom: verticalScale(15),
        }}
      />
      <ThemedText
        type="title"
        style={{
          fontSize: moderateScale(25),
          marginTop: verticalScale(15),
          textAlign: "center",
        }}
      >
        {item.description}
      </ThemedText>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        decelerationRate={0}
        snapToInterval={screenWidth}
        snapToAlignment="center"
        pagingEnabled
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <View
        style={{
          position: "absolute",
          bottom: verticalScale(20),
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              {
                width: moderateScale(10),
                height: moderateScale(10),
                borderRadius: moderateScale(5),
                backgroundColor: color.border,
                marginHorizontal: moderateScale(5),
              },
              index === currentIndex && { backgroundColor: color.primary },
            ]}
            onPress={() => onDotPress(index)}
          />
        ))}
      </View>
    </View>
  );
};
