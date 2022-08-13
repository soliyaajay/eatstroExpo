// ---------- Imports ---------- //
import React, { useEffect, useState, type PropsWithChildren } from 'react';
import { FlatList, Image, SafeAreaView, Text, View, StyleSheet} from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../../common/Colors';
import Images from '../../common/Images';
import Strings from '../../common/Strings';
import SearchBar from '../../components/bars/SearchBar';
import FoodItem from '../../components/home/FoodItem';
import Loader from '../../components/Loader';
import { showToast, sum } from '../../Functions';
import { kitchenApi } from '../../graphQl';
// import { Container, H1, H3, NormalText, SafeContainer } from '../../styledComponents';
import GlobalStyles from '../../theme/GlobalStyles';
// ---------- Global Variables Declaration ---------- //

// ---------- Home Screen ---------- //
const Home = (props: any) => {
    // ---------- Variables Declaration---------- //
    const [searchValue, setSearchValue] = useState('')
    const [foodData, setFoodData] = useState([])
    const [filteredFoodData, setFilteredFoodData] = useState(foodData)
    const [loading, setLoading] = useState(false)
    const { addListener } = props.navigation
    // ---------- Life-Cycle Method---------- //
    useEffect(() => {
        kitchenData()
    }, [props.navigation])
    // ---------- Function Declaration---------- //
    async function kitchenData() {
        setLoading(true)
        await kitchenApi()?.then((response) => {
            setLoading(false)
            // console.log('response', response);
            const { items } = response
            setFoodData(items)
            setFilteredFoodData(items)
        })
    }
    function searchSomething(searchText: string) {
        setSearchValue(searchText)
        var newText = searchText
        newText = newText.trim().toLowerCase();
        let data = foodData.filter((l) =>
            l.price.toString().includes(newText) || l.name.toLowerCase().includes(newText)
        );
        setFilteredFoodData([...data])
    }

    function likeItem(liked: boolean, index: number) {
        let newFoodData = foodData.map((item, index) => { return { ...item, liked: false } })
        let obj = newFoodData[index]
        var randomNumber = Math.floor(Math.random() * 100) + 1;
        obj.favoriteCount = randomNumber
        obj.liked = !liked
        newFoodData[index] = obj
        setFilteredFoodData([...newFoodData])
    }
    // ---------- Home Screen return function---------- //
    return (
        <SafeAreaView style={GlobalStyles.safeContainer}>
            <View style={styles.container}>
                <View style={GlobalStyles.homeGreetingsContainer}>
                    <Text style={styles.mainTitle}>{Strings.HiUser}</Text>
                    <Image style={GlobalStyles.handImg} source={Images.Hand} />
                </View>
                <Text style={styles.normalTitle}>{Strings.WWLTET}</Text>
                <SearchBar extraStyle={GlobalStyles.mt10} placeholder={Strings.SearchSomething} onChangeText={(val: string) => searchSomething(val)} searchValue={searchValue} onPress={() => sum(10,15)} testID={'sum'}/>
                <View style={GlobalStyles.homeBottomContainer}>
                    <Text style={styles.H3Title}>{Strings.SearchResults}</Text>
                    <FlatList
                    testID='foodList'
                        contentContainerStyle={{ paddingTop: scale(10), paddingBottom: '70%' }}
                        data={filteredFoodData}
                        pagingEnabled
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            let dataProp
                            if (!item.hasOwnProperty('liked')) {
                                dataProp = { ...item, liked: false, }
                            }
                            else {
                                dataProp = { ...item }
                            }
                            return (
                                <FoodItem dataProp={dataProp} onPressAdd={() => showToast(Strings.CartMsg)} onPressLike={() => likeItem(item.liked, index)} />
                            )
                        }} />
                </View>
            </View>
            {loading && <Loader visible={loading} extraStyle={{}} />}
        </SafeAreaView>
    );
};
// ---------- SearchBar Screen StyleSheet ---------- //
const styles = StyleSheet.create({
    container: {
        flex: 1,
	backgroundColor: Colors.ScreenBG,
    paddingHorizontal: scale(20),
    
    },
    mainTitle: {
        	fontSize:30,
	color: Colors.Black,
	lineHeight:33,
    },
    normalTitle: {
        	fontSize:14,
	color: Colors.DarkGrey2,
	lineHeight:16,
    },
    H3Title: {
        fontSize:18,
color: Colors.Black,
lineHeight:33,
}
})
export default Home;