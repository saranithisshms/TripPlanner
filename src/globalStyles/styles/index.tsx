import { StyleSheet, Dimensions, } from 'react-native';
import Color from '../color'


const globalStyles = StyleSheet.create({

    mainCont: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff'
    },

    flexColumn: {
        flex: 1,

    },

    helpertext: {
         padding:5,
        // left:2,
        color: Color.errorColor,

    },


});

export default globalStyles;