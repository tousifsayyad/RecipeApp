import axios from 'react-native-axios'

const url = 'https://www.themealdb.com/api/json/v1/1'

export const fetchCategories = () => {
    return axios(url + '/categories.php', {
        method: 'GET'
    })
}

export const fetchSubCategories = (cat) => {
    return axios(url + '/filter.php?c=' + cat, {
        method: 'GET'
    })
}

export const fetchSingleProduct = (id) => {
    return axios(url + '/lookup.php?i=' + id, {
        method: 'GET'
    })
}

export const search = (q) => {
    return axios(url + '/search.php?s=' + q, {
        method: 'GET'
    })
}
