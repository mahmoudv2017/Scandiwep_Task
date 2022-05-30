import { Component } from 'react';
import styles from './prices.module.css'

class Prices extends Component {

    constructor(props){
        super(props)

        this.state = {...props}
    }

    render() { 

        
        let prices = this.state.currencies

        return (
            <ul className={styles.prices}>

                {prices.map( (currency,index) => {
                    return <li onClick={() => this.state.currncy_changer(index)} key={index}>{currency.symbol}   {currency.label}</li>
                } )}
                {/* <li>$ USD</li>
                <li>€ EUR</li>
                <li>¥ JPY</li> */}
            </ul>
        );
    }
}
 
export default Prices;