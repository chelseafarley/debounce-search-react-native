import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";

const fruits = [
  "Apple",
  "Banana",
  "Pear",
  "Strawberry",
  "Feijoa",
  "Kiwifruit",
  "Blueberry",
  "Grape",
  "Avocado",
  "Orange",
  "Tangelo",
];

export default function App() {
  const [search, setSearch] = useState("");
  const [searchedFruits, setSearchedFruits] = useState(fruits);
  const [timeoutToClear, setTimeoutToClear] = useState();

  const fakeDelay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    return () => {
      clearTimeout(timeoutToClear);
    };
  }, []);

  const debounce = (callback, alwaysCall, ms) => {
    return (...args) => {
      alwaysCall(...args);
      clearTimeout(timeoutToClear);
      setTimeoutToClear(
        setTimeout(() => {
          callback(...args);
        }, ms)
      );
    };
  };

  const setSearchTextAlways = (text) => {
    setSearch(text);
  };

  const searchFruits = async (text) => {
    setSearch(text);
    await fakeDelay(3000);
    const filteredFruits = fruits.filter((fruit) => {
      return fruit.includes(text.toLowerCase());
    });
    setSearchedFruits(filteredFruits);
  };

  const debouncedSearchFruits = debounce(
    searchFruits,
    setSearchTextAlways,
    500
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={search}
        onChangeText={debouncedSearchFruits}
      />
      <FlatList
        data={searchedFruits}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#000000",
    borderWidth: 1,
    borderStyle: "solid",
    margin: 16,
    padding: 8,
    alignSelf: "stretch",
  },
});
