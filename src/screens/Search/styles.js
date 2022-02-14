import { StyleSheet, Dimensions } from "react-native";
import { RecipeCard } from "../../AppStyles";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  btnIcon: {
    height: 14,
    width: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9FAF3",
    borderRadius: 5,
    width: width - 100,
    justifyContent: "space-around"
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'grey'
  },
  searchInput: {
    backgroundColor: "#E9FAF3",
    color: "#787878",
    width: width - 150,
    height: 40,
    fontSize: 16
  }
});

export default styles;
