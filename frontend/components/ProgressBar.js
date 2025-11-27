import { Bar } from "react-native-progress";
import { View, StyleSheet } from "react-native";
import { useProgress } from "../context/ProgressContext.js";

export default function ProgressBar() {
  const { uploadProgress } = useProgress();

  return (
    <View style={styles.container}>
      <Bar
        progress={uploadProgress}
        width={300}
        color="#3498db"
        unfilledColor=""
        borderWidth={0}
        style={{
          zIndex: 100,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "absolute",
    top: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
