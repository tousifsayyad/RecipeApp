import React, { useLayoutEffect, useRef, useState } from "react";
import { ScrollView, Text, View, Image, Dimensions, TouchableHighlight, ActivityIndicator } from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import { fetchSingleProduct } from '../../api'

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = (id) => {
    fetchSingleProduct(id).then(function (response) {
      let data = response.data.meals[0]
      setRecipes(data)
      setLoading(false)
    }).catch(function (error) {
      console.log(error)
      setLoading(false)
    });
  }

  useLayoutEffect(() => {
    fetchData(route.params?.item.idMeal)
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = () => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: recipes.strMealThumb }} resizeMode="cover" />
      </View>
    </TouchableHighlight>
  );


  return (
    <>
      {loading ? <ActivityIndicator style={{ height: 100 }} color="#989898" size="large" /> :
        <ScrollView style={styles.container}>
          <View style={styles.carouselContainer}>
            <View style={styles.carousel}>
              {renderImage()}
            </View>
          </View>
          <View style={styles.infoRecipeContainer}>
            <Text style={styles.infoRecipeName}>{recipes.strMeal}</Text>
            <View style={styles.infoContainer}>
              <TouchableHighlight>
                <Text style={styles.category}>{recipes.strCategory}</Text>
              </TouchableHighlight>
            </View>

            {/* <View style={styles.infoContainer}>
              <Image style={styles.infoPhoto} source={require("../../../assets/icons/time.png")} />
              <Text style={styles.infoRecipe}>{recipes.time} minutes </Text>
            </View> */}

            <View style={styles.infoContainer}>
              <ViewIngredientsButton
                onPress={() => {
                  navigation.navigate("IngredientsDetails", { recipes });
                }}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoDescriptionRecipe}>{recipes.strInstructions.split(/\r\n|\n|\r/)}</Text>
            </View>
          </View>
        </ScrollView>
      }
    </>
  );
}
