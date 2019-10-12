import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import BasicForm from './BasicForm';
import RadioButton from './RadioButton';
import CallCashFree from './CallCashFree';
import DisplayResultModal from './DisplayResultModal';

const originalState={
    source: "reactsdk",
    env: "test",
    appId: "275432e3853bd165afbf5272",
    orderId: String(Math.floor(Math.random() * 10000)),
    //below values have been hardcoded for ease of testing
    orderAmount: "100",
    customerName: "A",
    customerPhone: "1234512345",
    customerEmail: "a@a.com",
    paymentOption: null,
    checkoutFields: ["appId", "orderId", "orderAmount", "customerName", "customerPhone", "customerEmail"], 
    //checkoutFields: ["appId"],

    //seamless
    //paymentParams
    payViaCashFree: false,
    eventData: null,
}

export default class RenderForm extends Component{
    constructor(props){
        super(props);
        this.state = {...originalState}
        
    }

    //Input events
    onChange = (field,val) => {
        console.log("onChange")
        console.log(field);
        console.log(val);
        let obj = {}
        obj[field] = val;
        this.setState(obj);
    }

    onClick = (val) => {
        if(val==="none") val = null;
        if(val === this.state.paymentOption) return;
        this.setState({paymentOption: val});
    }

    onPayment = (eventData) => {
        console.log("onPayment called");
        console.log(eventData);
        this.setState({eventData, payViaCashFree: false});
    }

    resetState = () =>{
        let rState = {...originalState};
        rState.orderId = String(Math.floor(Math.random() * 10000));
        this.setState(rState);
    }


    //payment logic
    verifyCheckoutForm = () => {

    }

    payViaCashFree = (event) => {
        console.log("pay via cashfree hit");
        console.log(event);
        console.log(event.nativeEvent);
        this.setState({payViaCashFree: true});
    } 

    //rendering logic
    renderForm = () => {
        const {checkoutFields} = this.state;
        let stateObj = {...this.state};
        delete stateObj.checkoutFields;
        return <BasicForm fields={checkoutFields} parentState={stateObj} onChange={this.onChange} />
    }

    renderPaymentOptions = () => {
        //to add payment options card,nb,wallet,upi
        const paymentOptions = ["card","nb","wallet","upi","none"];
        let checkedOption = this.state.paymentOption;
        if(checkedOption === null) checkedOption = "none";
        let optionButtons = [];
        for(paymentOption of paymentOptions){
            if(paymentOption === checkedOption){
                optionButtons.push(<RadioButton key={paymentOption} value={paymentOption} checked={true} onClick={this.onClick}/>);
            }
            else{
                optionButtons.push(<RadioButton key={paymentOption} value={paymentOption} checked={false} onClick={this.onClick}/>);
            }
        }
        return(
            <View style={styles.paymentOptionsContainer}>
                {optionButtons}
            </View>
        );
    }

    renderPaymentOptionForm = () =>{
        const {paymentOption} = this.state;

        if(!paymentOption) return null;

        let stateObj = {...this.state};
        delete stateObj.checkoutFields;
        switch(paymentOption){
            case "card": {
                const fields = ["card_number", "card_holder", "card_cvv", "card_expiryMonth", "card_expiryYear"]
                return <BasicForm fields={fields} parentState={stateObj} onChange={this.onChange} />
            }
            case "nb": {
                const fields = ["paymentCode"];
                return <BasicForm fields={fields} parentState={stateObj} onChange={this.onChange} />
            }
            case "wallet": {
                const fields = ["paymentCode"];
                return <BasicForm fields={fields} parentState={stateObj} onChange={this.onChange} />
            }
            case "upi": {
                const fields = ["upi_vpa"];
                return <BasicForm fields={fields} parentState={stateObj} onChange={this.onChange} />
            }
        }

        return null;
    }

    renderPaymentButton = () => {
        return (<TouchableOpacity
        style={styles.button}
        onPress={this.payViaCashFree}>
        <Text> pay </Text>
        </TouchableOpacity>)
    }

    callCashFree = () => {
        const {payViaCashFree} = this.state;
        if(!payViaCashFree) return null;

        // get and clean state
        let stateObj = {...this.state};
        delete stateObj.checkoutFields;
        delete stateObj.payViaCashFree;
        delete stateObj.eventData;

        console.log("stateObj being passed to cashfree");
        console.log(stateObj);

        return <CallCashFree {...stateObj} onPayment={this.onPayment}/>

    }

    displayResult = () =>{
        const {eventData} = this.state;

        if(!eventData) return null;

        return <DisplayResultModal content={eventData}  onPress={this.resetState}/>
    }

    render(){
        return (
            <View style={styles.container}>
            {this.renderForm()}
            {this.renderPaymentOptionForm()}
            {this.renderPaymentOptions()}
            {this.renderPaymentButton()}
            {this.callCashFree()}
            {this.displayResult()}
            </View>
            );
    }


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#111517',
      // justifyContent: 'center',
      paddingHorizontal: 10,
      paddingTop: 40,
      alignContent: 'space-between',

    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      margin: 10,
      borderRadius: 30,
    },
    paymentOptionsContainer:{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    }
  })