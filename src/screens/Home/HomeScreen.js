import React, { useLayoutEffect, useState } from 'react'
import {
    FlatList,
    Text,
    View,
    TouchableHighlight,
    Image,
    ActivityIndicator
} from 'react-native'
import styles from './styles'
import SearchImage from '../../components/MenuImage/SearchIcon'
import { fetchCategories } from '../../api'

export default function HomeScreen(props) {
    const { navigation } = props
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = () => {
        fetchCategories()
            .then(function (response) {
                let data = response.data.categories
                setRecipes(data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error)
                setLoading(false)
            })
    }

    useLayoutEffect(() => {
        fetchData()
        navigation.setOptions({
            title: 'Food Recipes',
            headerLeft: () => <View />,
            headerRight: () => (
                <SearchImage
                    onPress={() => {
                        navigation.navigate('Search')
                    }}
                />
            )
        })
    }, [])

    const onPressRecipe = (cat) => {
        navigation.navigate('SubCat', { cat: cat })
    }

    const renderRecipes = ({ item }) => (
        <TouchableHighlight
            underlayColor='rgba(73,182,77,0.1)'
            onPress={() => onPressRecipe(item.strCategory)}
            style={styles.container}
        >
            <>
                <Image
                    style={styles.photo}
                    source={{ uri: item.strCategoryThumb }}
                    resizeMode={'contain'}
                />
                <Text style={styles.title}>{item.strCategory}</Text>
            </>
        </TouchableHighlight>
    )

    return (
        <>
            {loading ? (
                <ActivityIndicator
                    style={{ height: 100 }}
                    color='#989898'
                    size='large'
                />
            ) : (
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={recipes}
                    renderItem={renderRecipes}
                    keyExtractor={(item) => `${item.idCategory}`}
                />
            )}
        </>
    )
}
