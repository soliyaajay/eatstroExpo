// ---------- Imports ---------- //
import React, { type PropsWithChildren } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Strings from '../../common/Strings';
import SearchBar from '../../components/bars/SearchBar';
// import { Container, SafeContainer } from '../../styledComponents';
import GlobalStyles from '../../theme/GlobalStyles';
// ---------- Global Variables Declaration ---------- //

// ---------- Favourite Screen ---------- //
const Favourite = (props: any) => {
    // ---------- Variables Declaration---------- //
    // ---------- Function Declaration---------- //
    // ---------- Favourite Screen return function---------- //
    return (
        <SafeAreaView>
            <View>
                <Text>{Strings.FavScr}</Text>
            </View>
        </SafeAreaView>
    );
};
export default Favourite;