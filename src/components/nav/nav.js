import {Component} from 'react';
import styles from './nav.module.css'
import Logo from './logo/logo'
import Cartsvg from './cart_svg/cart';
import Cart from './cart/cart'
import Prices from './prices/prices';
import Wrapper from '../hoc/wrapper'


class Nav extends Component {
    state = {  } 
    render() { 
        return (

            <Wrapper>
                
            
        
                <nav>
                
                    <ul className={styles.left_list}>
                        <li>Women</li>
                        <li>Men</li>
                        <li>Kids</li>
                    </ul>

                    <div className={styles.logo}>

                        <Logo />


                    </div>

                    <ul className={styles.right_list}>
                    <li> $  </li> 
                    <li className={styles.cart}> < Cartsvg /></li> 
                    </ul>

                    
                </nav>
                <Cart />
                {/* <Prices /> */}
            </Wrapper>
          
        );
    }
}
 
export default Nav;
