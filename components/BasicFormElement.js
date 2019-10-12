import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput} from 'react-native';


export default class BasicFormElement extends Component{
    constructor(props){
        super(props);
        console.log("bfe props");
        console.log(props);
    }
    onChangeText = (event)=> {
        const {onChange, placeholder} = this.props;
        onChange(placeholder, event);
    }
    render(){
        const {placeholder, val} = this.props;
        return(
            <View style={styles.textContainer}>
            <TextInput onChangeText = {this.onChangeText} value={val} style={styles.textInput} placeholder={placeholder} />
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        alignItems:'center',
        padding: '5%',
    },
    textInput: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        maxHeight: '140%',
        borderRadius: 40,
        paddingLeft: '5%',
        paddingRight: '5%',
    }
})