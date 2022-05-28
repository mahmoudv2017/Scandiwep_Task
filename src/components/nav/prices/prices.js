import { Component } from 'react';
import styles from './prices.module.css'

class Prices extends Component {

    render() { 
        return (
            <ul className={styles.prices}>
                <li>$ USD</li>
                <li>€ EUR</li>
                <li>¥ JPY</li>
            </ul>
        );
    }
}
 
export default Prices;