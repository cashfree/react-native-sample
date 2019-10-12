import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import BasicFormElement from './BasicFormElement';



export default class BasicForm extends Component{
    constructor(props){
        super(props)
        console.log("basic form props");
        console.log(props);
    }
    createBasicFormObj = ()=>{
        const {fields, onChange} = this.props;
        let formObj = [];
        for( value of fields){
            console.log("val");
            console.log(typeof value)
            console.log(value);
            formObj.push(<BasicFormElement key={value} placeholder={value} val={this.props.parentState[value]} onChange={onChange}/>) 
        }
        console.log("formObj");
        console.log(formObj);
        return formObj
    }

    render(){
        return(
            <View style={styles.container}>
                {this.createBasicFormObj()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#111517',
        alignContent: 'space-between',
        margin: 5,
    }
})
//{this.createBasicFormObj()}