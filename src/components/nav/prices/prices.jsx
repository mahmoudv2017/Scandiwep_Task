import { Component } from 'react';
import styles from './prices.module.css'

class Prices extends Component {

    constructor(props){
        super(props)

        this.state = {...props}
    }

    render() { 

        
        let prices = this.state.currencies
        let styler = this.props.prices ? [styles.prices ]  : styles.hidden
        

        return (
            <ul className={styler}>

                {prices.map( (currency,index) => {
                    return <li onClick={() => {

                        this.props.backdrop_closer()

                        this.state.currncy_changer(index)

                    } } key={index}>{currency.symbol}   {currency.label}</li>
                } )}

            </ul>
        );
    }
}
 
export default Prices;