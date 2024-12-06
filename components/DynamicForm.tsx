import React, { useState } from "react";
import { useForm, Controller, Path } from "react-hook-form";
import { z, ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, View, TouchableOpacity, Switch, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import useResponsive from "@/hooks/useResponsive";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedButton } from "./ThemedButton";
import { Feather } from "@expo/vector-icons";

type FormProps<T extends ZodObject<any>> = {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
};

export const DynamicForm = <T extends ZodObject<any>>({
  schema,
  onSubmit,
}: FormProps<T>) => {
  const { control, handleSubmit, formState } = useForm<z.infer<T>>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const { scale, verticalScale } = useResponsive();
  const color = useThemeColor();

  const fields = schema.shape; // Get the fields from the schema

  console.log("fields", fields);

  return (
    <View style={{ width: "100%", gap: verticalScale(20) }}>
      {Object.entries(fields).map(([fieldName, fieldSchema]) => {
        return (
          <FieldRenderer
            key={fieldName}
            fieldName={fieldName as Path<z.infer<T>>}
            fieldSchema={fieldSchema}
            control={control}
            formState={formState}
            color={color}
          />
        );
      })}
      <ThemedButton
        disabled={!formState.isDirty || !formState.isValid}
        title="Submit"
        type="filled"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

type FieldRendererProps<T> = {
  fieldName: Path<z.infer<T>>;
  fieldSchema: any;
  control: any;
  formState: any;
  scale: number;
  verticalScale: number;
  color: any;
};

const FieldRenderer = <T,>({
  fieldName,
  fieldSchema,
  control,
  formState,
}: FieldRendererProps<T>) => {
  console.log(fieldSchema);
  const [secureEntry, setSecureEntry] = useState(true);
  const errorOpacity = useSharedValue(0);
  const { scale, verticalScale } = useResponsive();
  const color = useThemeColor();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(errorOpacity.value, { duration: 300 }),
    transform: [{ translateY: withTiming(errorOpacity.value ? 0 : -10) }],
  }));

  const renderField = () => {
    if (fieldSchema instanceof z.ZodBoolean) {
      return (
        <Controller
          control={control}
          name={fieldName}
          render={({ field }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: color.text, fontFamily: "medium" }}>
                  {fieldSchema?._def?.description}
                </Text>
                <Switch
                  value={field?.value}
                  onValueChange={field?.onChange}
                  thumbColor={field?.value ? color.primary : color.border}
                />
              </View>
            );
          }}
        />
      );
    }

    return (
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <View style={{ gap: verticalScale(10) }}>
            <ThemedText
              style={{ textTransform: "capitalize", fontFamily: "medium" }}
            >
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
              value={field.value?.toString() || ""}
              onChangeText={field.onChange}
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
        )}
      />
    );
  };

  const errorMessage = formState.errors[fieldName]?.message;

  // Trigger animation when there is an error
  React.useEffect(() => {
    if (errorMessage) {
      errorOpacity.value = 1;
    } else {
      errorOpacity.value = 0;
    }
  }, [errorMessage]);

  return (
    <View style={{ gap: verticalScale(10) }}>
      {renderField()}
      <Animated.View style={[animatedStyle]}>
        {errorMessage && (
          <ThemedText type="warning">{errorMessage.toString()}</ThemedText>
        )}
      </Animated.View>
    </View>
  );
};
