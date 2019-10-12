import React, {Component} from 'react';
import { Modal, StyleSheet, TouchableOpacity, View ,Text} from 'react-native';
import CashfreePG from 'cashfreereactnativepg';

export default class CallCashfree extends Component{
    constructor(props){
        super(props);
        console.log("call cashfree props");
        console.log(props);
        this.state = {
            loading: true,
        }
    }

    getToken = () =>{
        try{
            const {orderId, orderAmount, onPayment} = this.props;
            const orderCurrency = "INR";        
            const tokenUrl = "https://test.cashfree.com/api/v2/cftoken/order";
            fetch(tokenUrl, {
                method: 'POST',
                cache: 'no-cache',
                headers:  {
                    'Content-Type': 'application/json',
                    'x-client-id': '275432e3853bd165afbf5272',
                    'x-client-secret': '2279c0ffb9550ad0f9e0652741c8d06a49409517'
                },
                body:JSON.stringify({
                    orderId,
                    orderAmount,
                    orderCurrency
                })
                
            }).then((result) => {
                return result.json()  
            }).then((response)=>{
                console.log("token gen response");
                console.log(response);
                if(response.status === 'OK' && response.message === 'Token generated'){
                    this.setState({tokenData: response.cftoken, loading: false});
                    return;
                }
                throw {name:"request error", message:"response.message"};
            })
            .catch((err) => {
                console.log("err in getting token");
                console.log(err);
                const errorObj = {
                    txStatus: "Failed",
                    err: err,
                }
                return this.setState({loading: false},onPayment(errorObj));
            })

        }
        catch(err){
            const {onPayment} = this.props;
            console.log("err caught in getting token");
            console.log(err);
            const errorObj = {
                txStatus: "Failure-Internal",
                err: err,
            }
            return this.setState({loading: false},onPayment(errorObj));
        }
    }

    renderLoadingModal = () => {
        const {loading} = this.state;
        if(!loading) return null;
        return(
        <Modal visible={loading}>
            <View style={{flex: 1,   
            paddingTop: 15,
            justifyContent: 'center',
            alignItems: 'center',}}>
                <Text style={{textAlign: 'center'}}>
                    Loading....
                </Text>
            </View>
        </Modal>)

    }

    payCashFree = () => {
        const {loading, tokenData} = this.state;
        const {onPayment} = this.props;
        console.log("payCashFree called");
        console.log(tokenData);
        if(loading) return null

        // get and clean propsObj
        let propsObj = {...this.props};
        propsObj.tokenData = tokenData;
        propsObj.callback = onPayment;
        delete propsObj.onPayment
        console.log("propsObj");
        console.log(propsObj);
        return <CashfreePG {...propsObj}/>

    }

    render(){
        console.log("call cashfree render called");
        console.log("state");
        console.log(this.state);
        const{loading} = this.state;
        //TODO: find a better place to call getToken, move this to component did mount and component did update
        if(loading) 
        {
            this.getToken();
        }
        return(
            <View>
                {this.renderLoadingModal()}
                {this.payCashFree()}
            </View>
        );
    }
} 