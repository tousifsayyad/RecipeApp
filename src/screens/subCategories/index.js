import React, { useLayoutEffect, useState } from "react"
import { FlatList, Text, View, TouchableHighlight, Image, ActivityIndicator } from "react-native"
import styles from "./styles"
import SearchImage from "../../components/MenuImage/SearchIcon"
import { fetchSubCategories } from '../../api'

export default function SubCatScreen(props) {
    const { navigation } = props;
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = () => {
        fetchSubCategories(props.route.params.cat).then(function (response) {
            let data = response.data.meals;
            setRecipes(data)
            setLoading(false)
        }).catch(function (error) {
            console.log(error)
            setLoading(false)
        });
    }

    useLayoutEffect(() => {
        fetchData()
        navigation.setOptions({
            title: props.route.params.cat,
            headerRight: () => (
                <SearchImage
                    onPress={() => {
                        navigation.navigate('Search')
                    }}
                />
            ),
        });
    }, []);

    const onPressRecipe = (item) => {
        navigation.navigate("Recipe", { item })
    };

    const renderRecipes = ({ item }) => (
        <TouchableHighlight underlayColor="rgba(73,182,77,0.1)" onPress={() => onPressRecipe(item)} style={styles.categoriesItemContainer}>
            <>
                <Image style={styles.categoriesPhoto} source={{ uri: item.strMealThumb }} resizeMode={'cover'} />
                <Text style={styles.categoriesName}>{item.strMeal}</Text>
            </>
        </TouchableHighlight>
    );

    return (
        <>
            {loading ? <ActivityIndicator style={{ height: 100 }} color="#989898" size="large" /> :
                <FlatList showsVerticalScrollIndicator={false} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.idMeal}`} />
            }
        </>
    );
}
