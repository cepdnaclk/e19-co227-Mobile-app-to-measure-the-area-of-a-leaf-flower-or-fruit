import { useEffect, useState } from "react";
import React from "react";
import { db } from "../config";
import { ref, get, child } from "firebase/database";

import {
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

import Screen from "./Screen";
import colors from "../config/colors";

import AppText from "../components/AppText";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItem from "../components/ListItem";

function HistoryScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);
  const [dataArray, setDataArray] = useState(null);

  const postsRef = ref(db, "data");

  useEffect(() => {
    get(postsRef)
      .then((snapshot) => {
        setDataArray(
          Object.entries(snapshot.val()).map(([id, item]) => ({ id, ...item }))
        );
        setIsLoading(false);
      })

      .catch((error) => {
        console.error("Error" + error);
      });
  }, []);

  console.log(dataArray);
  //console.log(fetchedData);
  if (isLoading) {
    return (
      <View style={styles.indicatorView}>
        <ActivityIndicator
          size="large"
          color={colors.color2}
        ></ActivityIndicator>
      </View>
    );
  }

  // show error message

  if (error) {
    return (
      <View style={styles.indicatorView}>
        <AppText>Error encountered while fetching the data...</AppText>
      </View>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <TextInput
          placeholder="Enter search term"
          style={styles.text}
          clearButtonMode="always"
          autoCapitalize="none"
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        ></TextInput>
        <View style={styles.flatListContainer}>
          <FlatList
            data={dataArray}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem
                onPress={() =>
                  navigation.navigate("ReportScreen", {
                    item: item,
                  })
                }
                firstName={item.name}
                id={item.id && item.id.substring(1).toUpperCase()}

                // imageUrl={item.picture.\\\\\}
              ></ListItem>
            )}
            ItemSeparatorComponent={ListItemSeparator}
          ></FlatList>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },

  text: {
    height: 50,
    borderColor: colors.lightGray,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 20,
  },

  flatListContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    flex: 1,
  },

  indicatorView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default HistoryScreen;
