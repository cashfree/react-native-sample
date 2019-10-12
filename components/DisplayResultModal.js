import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Modal} from 'react-native';

export default class DisplayResultModal extends Component {

    render(){
        const {content, onPress} = this.props;
        return(
        <Modal visible={true}>
            <View style={styles.modalContainer}>
                <Text style={{textAlign: 'center'}}>
                    {content}
                </Text>
                <TouchableOpacity style={styles.buttonStyle}
                onPress={onPress}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                    close
                </Text>
                </TouchableOpacity>
            </View>
        </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,   
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        margin: 30,
        backgroundColor: '#0764fa',
        borderRadius: 30,
        padding: 10,
    }
})