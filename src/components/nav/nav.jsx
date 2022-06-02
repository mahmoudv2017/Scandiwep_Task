import {Component} from 'react';
import styles from './nav.module.css'
import Logo from './logo/logo'
import Cart from './cart/cart'
import Prices from './prices/prices';
import Backdrop from '../backdrop/backdrop';
import Wrapper from '../hoc/wrapper';
import axios from '../../Axios';
import CartButton from './Cart_button/Cart_button';


class Nav extends Component {
    
    constructor(props){
        super(props)

        this.state = {...props , currencies : null}
    }

  

    componentDidMount (){
        axios.get('/graphql?query={currencies{symbol , label}}')
        .then(res => {
          this.setState({currencies : res.data.data.currencies})
         // console.log(this.state)
        })
      }
    backdrop_toggler = ( ) => {

        let backdrop_state = this.state.backdrop
        let prev_prices = this.state.prices
        this.setState({backdrop:!backdrop_state , prices:!prev_prices })
    }

    cart_toggler = ( ) => {

        let backdrop_state = this.state.backdrop
        let prev_prices = this.state.cart_toggler
        this.setState({cart_toggler:!prev_prices , backdrop: !backdrop_state})
    }

    backdrop_closer = ( ) => {

        this.setState({backdrop:false , prices : false , cart_toggler : false })
    }
 
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
                        <li onClick={this.backdrop_toggler}  > $   </li> 
                        <CartButton cart_toggler={this.cart_toggler} count={this.state.cart.length}/>
                        {/* <li variant="danger" ref={target}  onClick={this.cart_toggler} className={styles.cart}> < Cartsvg /></li>  */}
                    </ul>



                    
                </nav>

                {/* further optimizations needed , put the backdrop inside the two elements */}
                { this.state.cart_toggler ? <Cart selected_currency={this.props.currency} currencies={this.state.currencies} cart={this.state.cart} /> : null }  
                { this.state.backdrop ? <Backdrop enabler={this.backdrop_closer} backdrop={true}/>  : null } 
                {this.state.currencies ? <Prices prices={this.state.prices} currncy_changer={this.state.curency_changer} currencies={this.state.currencies} /> : false} 
            </Wrapper>
          
        );
    }
}
 
export default Nav;
