import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';


export default class RadioButton extends Component{
    onClickRadio = () =>{
        const {onClick, value} = this.props;
        onClick(value);
    }

    render(){
        const{ checked, value } = this.props;
        let styleClass = checked? "RadioButtonChecked":"RadioButtonNot";
        return(
            <View style={styles.RadioButtonContainer}>
                <TouchableOpacity
                style={[styles.RadioButton,styles[styleClass]]}
                onPress = {this.onClickRadio}
                >
                    <Text style={{textAlign: 'center'}}>{value}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    RadioButtonContainer: {
        padding: 10,
        margin: 10,
    },
    RadioButtonNot: {
        backgroundColor: '#83cf00',
    },
    RadioButtonChecked: {
        backgroundColor: '#f06f05'
    },
    RadioButton:{
        padding: 10,
        borderRadius: 30,
        minWidth: 50,
    }

})