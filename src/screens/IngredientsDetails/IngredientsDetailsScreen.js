import React, { useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;


  const item = route.params?.recipes;

  const ingredientsArray = [];
  const [data, setData] = useState([])

  const filterData = (item) => {
    let temp = []
    for (let i = 1; i < 25; i++) {
      let key = 'strIngredient' + i
      let val = 'strMeasure' + i
      if (item[key]) {
        temp = { 'key': item[key], 'val': item[val] }
        ingredientsArray.push(temp)
      }
    }
    setData(ingredientsArray)
  }

  useLayoutEffect(() => {
    filterData(item)
    navigation.setOptions({
      title: 'Ingredients',
      headerTitleStyle: {
        alignSelf: 'center',
      },
      headerRight: () => <View />,
    });
  }, []);

  const renderIngredient = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: 'https://www.themealdb.com/images/ingredients/' + item.key + '-small.png' }} resizeMode="contain" />
        <Text style={styles.title}>{item.key}</Text>
        <Text style={{ color: "#676767" }}>{item.val}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={3} data={data} renderItem={renderIngredient} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}
