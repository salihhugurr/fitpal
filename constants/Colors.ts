// Primary and secondary colors for fitness app
const primaryColorLight = "#27AE60"; // Blue
const secondaryColorLight = "#2F80ED"; // Green
const primaryColorDark = "#27AE60"; // Blue (same as light mode for consistency)
const secondaryColorDark = "#2F80ED"; // Green (same as light mode for consistency)

export const Colors = {
  light: {
    primary: primaryColorLight,
    secondary: secondaryColorLight,
    text: "#11181C", // Dark Gray for text
    background: "#F5F5F5", // Light Gray background
    backgroundOpposite: "#121212", // Light Gray background
    tint: primaryColorLight, // Primary blue tint
    icon: "#687076", // Subtle gray for icons
    tabIconDefault: "#687076", // Subtle gray for default tab icons
    tabIconSelected: secondaryColorLight, // Blue for selected tab icon
    cardBackground: "#FFFFFF", // White for cards
    border: "#E0E0E0", // Light border color
    error: "#EB5757", // Red for errors
    success: "#6FCF97", // Green for success
  },
  dark: {
    primary: primaryColorDark,
    secondary: secondaryColorDark,
    text: "#ECEDEE", // Light Gray text
    background: "#121212", // Very Dark Gray background
    backgroundOpposite: "#F5F5F5", // Light Gray background
    tint: primaryColorDark, // Primary blue tint
    icon: "#9BA1A6", // Lighter gray for icons
    tabIconDefault: "#9BA1A6", // Lighter gray for default tab icons
    tabIconSelected: secondaryColorDark, // Blue for selected tab icon
    cardBackground: "#1E1E1E", // Dark Gray for cards
    border: "#3E3E3E", // Darker border color
    error: "#EB5757", // Red for errors
    success: "#6FCF97", // Green for success
  },
};
