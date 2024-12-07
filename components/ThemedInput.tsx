import { Feather } from "@expo/vector-icons";
import { View, TextInput, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import useResponsive from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type ThemedInputProps = {
  fieldName: string;
  value: string;
  onChange: (value: string) => void;
};

export const ThemedInput = ({
  fieldName,
  value,
  onChange,
}: ThemedInputProps) => {
  const [secureEntry, setSecureEntry] = useState(true);
  const { scale, verticalScale } = useResponsive();
  const color = useThemeColor();
  return (
    <View style={{ gap: verticalScale(10) }}>
      <ThemedText style={{ textTransform: "capitalize", fontFamily: "medium" }}>
        {fieldName}
      </ThemedText>
      <TextInput
        style={{
          color: color.text,
          fontFamily: "medium",
          borderWidth: 1,
          borderColor: color.border,
          paddingVertical: verticalScale(12),
          paddingHorizontal: scale(30),
          borderRadius: 4,
        }}
        secureTextEntry={fieldName === "password" && secureEntry}
        value={value}
        onChangeText={onChange}
        placeholder={`Enter your ${fieldName}`}
      />
      {fieldName === "password" && (
        <TouchableOpacity
          onPress={() => setSecureEntry(!secureEntry)}
          style={{
            position: "absolute",
            right: scale(30),
            bottom: verticalScale(12),
          }}
        >
          <Feather
            name={secureEntry ? "eye-off" : "eye"}
            size={20}
            color={color.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
