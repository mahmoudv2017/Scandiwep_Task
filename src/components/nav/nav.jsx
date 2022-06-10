import {Component} from 'react';
import styles from './nav.module.css'
import Logo from './logo/logo'
import Cart from './cart/cart'
import Prices from './prices/prices';
import Backdrop from '../backdrop/backdrop';
import axios from '../../Axios';
import CartButton from './Cart_button/Cart_button';
import { Link  } from 'react-router-dom';
import ErrorBoundary from '../hoc/ErrorBoundary';


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
        if(this.state.currencies){       console.log(this.state.currencies[this.props.currency])}
 
        return (

            <ErrorBoundary>
                
            
        
                <nav>
                
                    <ul className={styles.left_list}>
                        <li onClick={() => {this.props.categories_changer(0)}}>
                        <Link to='/'>
                            Women
                        </Link>
                        </li>
                        <li onClick={() => {this.props.categories_changer(1)}}>
                        <Link to='/'>
                        Men
                        </Link></li>
                        <li onClick={() => this.props.categories_changer(2)}>
                        <Link to='/'>
                        Kids
                        </Link></li>
                    </ul>
                    
                    <div className={styles.logo}>
                    <Link to='/'>
                        <Logo />
                    </Link>
                        
                        
                        
                    </div>

                    <ul className={styles.right_list}>
                      {this.state.currencies ? <li onClick={this.backdrop_toggler}  >  {this.state.currencies[this.props.currency].symbol}  </li> : false }  
                        <CartButton cart_toggler={this.cart_toggler} count={this.state.cart.length}/>
                        
                        {/* <li variant="danger" ref={target}  onClick={this.cart_toggler} className={styles.cart}> < Cartsvg /></li>  */}
                    </ul>


                    {this.state.currencies ? <Prices prices={this.state.prices} currncy_changer={this.state.curency_changer} currencies={this.state.currencies} /> : false} 

                    { this.state.cart_toggler ? <Cart 
                    selected_currency={this.props.currency} 
                    currencies={this.props.currencies}
                    set_order={this.props.set_order} 
                    cart={this.props.cart} 
                    incrementer={this.props.incrementer}
                    decremnter={this.props.decremnter}
                    />
                    : null }
                </nav>

                {/* further optimizations needed , put the backdrop inside the two elements */}
                 
                 <Backdrop enabler={this.backdrop_closer} backdrop={this.state.backdrop}/>
            </ErrorBoundary>
          
        );
    }
}
 
export default Nav ;
