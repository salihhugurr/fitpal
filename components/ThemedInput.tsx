import { Feather } from "@expo/vector-icons";
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { ThemedText } from "./ThemedText";
import useResponsive from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export interface ThemedInputProps extends TextInputProps {
  fieldName: string;
  value: string;
  onChangeText: (value: string) => void;
}

export const ThemedInput = ({
  fieldName,
  value,
  onChangeText,
  ...props
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
        {...props}
        style={{
          color: color.text,
          fontFamily: "medium",
          borderWidth: 1,
          borderColor: color.border,
          paddingVertical: verticalScale(12),
          paddingHorizontal: scale(30),
          borderRadius: 4,
        }}
        secureTextEntry={
          fieldName === "password" || (props.secureTextEntry && secureEntry)
        }
        value={value}
        onChangeText={onChangeText}
        placeholder={`Enter your ${fieldName}`}
      />
      {fieldName === "password" ||
        (props.secureTextEntry && (
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
        ))}
    </View>
  );
};
