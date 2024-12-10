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
import { ThemedInput } from "./ThemedInput";

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

  const fields = schema.shape;

  return (
    <View style={{ width: "100%", gap: verticalScale(20) }}>
      {Object.entries(fields).map(([fieldName, fieldSchema]) => {
        return (
          <FieldRenderer
            key={fieldName}
            fieldName={fieldName as string}
            fieldSchema={fieldSchema}
            control={control}
            formState={formState}
            color={color}
            scale={0}
            verticalScale={0}
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

type FieldRendererProps = {
  fieldName: string;
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
}: FieldRendererProps) => {
  const [secureEntry, setSecureEntry] = useState(true);
  const errorOpacity = useSharedValue(0);
  const { scale, verticalScale } = useResponsive();
  const color = useThemeColor();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(errorOpacity.value, { duration: 300 }),
    transform: [{ translateY: withTiming(errorOpacity.value ? 0 : -10) }],
  }));

  const renderField = () => {
    if (
      fieldSchema instanceof z.ZodBoolean ||
      (fieldSchema instanceof z.ZodOptional &&
        fieldSchema?._def?.innerType instanceof z.ZodBoolean)
    ) {
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
                  {fieldSchema instanceof z.ZodBoolean
                    ? fieldSchema?._def?.description
                    : fieldSchema?._def?.innerType?.description}
                </Text>
                <Switch
                  value={field?.value}
                  onValueChange={field?.onChange}
                  thumbColor={field?.value ? color.background : color.primary}
                  trackColor={{
                    true: color.primary,
                    false: color.background,
                  }}
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
          <ThemedInput
            fieldName={fieldName}
            value={field.value}
            onChangeText={field.onChange}
            autoCapitalize={fieldName === "email" ? "none" : "sentences"}
          />
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
