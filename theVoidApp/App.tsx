import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./index";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

/*  const styles = StyleSheet.create({
    body: {
      maxHeight: "100vh"
    },
  });*/

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation/>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
  // colorScheme={colorScheme}
}
