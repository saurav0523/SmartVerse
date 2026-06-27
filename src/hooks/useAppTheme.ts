import { Colors } from "../theme/colors";
import useThemeStore from "../stores/useThemeStore";

const useAppTheme = () => {
  const mode = useThemeStore((state) => state.mode);
  const colors = Colors[mode];
  return { mode, colors, isDark: mode === "dark" };
};

export default useAppTheme;
