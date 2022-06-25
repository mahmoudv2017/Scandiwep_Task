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
import Arrow from './prices/arrow';

class Nav extends Component {
    
    constructor(props){
        super(props)

        this.state = {...props , currencies : null}
    }

   



  

    componentDidMount (){
        axios.get('/graphql?query={currencies{symbol , label}}')
        .then(res => {
          this.setState({currencies : res.data.data.currencies})
        })
        
      }
    prices_toggler = (e ) => {
      
      document.getElementsByClassName(styles.currency_div)[0].classList.toggle(styles.upArrow)

        const prev_prices = this.state.prices
        this.setState({backdrop:false , prices:!prev_prices , cart_toggler : false })
    }

    cart_toggler = ( ) => {
        document.getElementsByClassName(styles.currency_div)[0].classList.remove(styles.upArrow)
        let backdrop_state = this.state.backdrop
        const prev_prices = this.state.cart_toggler
        if(this.state.prices === true){
            backdrop_state = false
        }
        this.setState({cart_toggler:!prev_prices , backdrop: !backdrop_state , prices:false })
    }

    backdrop_closer = ( ) => {

        this.setState({backdrop:false , prices : false , cart_toggler : false })
    }
    
    
    render() { 
 
        return (

            <ErrorBoundary>
                
            
        
                <nav>
                
                    <ul className={styles.left_list}>
                        {this.props.allcategs.map((cat,index) => {
                            return(
                                <li key={index} onClick={() => {this.props.categories_changer(cat)}}>
                                <Link to="/" >
                                    {cat.name}
                                </Link>
                            </li>
                            )
                           
                        })}
                     
                    </ul>
                    
                    <div className={styles.logo}>
                    <Link to='/'>
                        <Logo />
                    </Link>
                        
                        
                        
                    </div>

                    <ul className={styles.right_list}>
                      {this.state.currencies ? 
                        
                        <div className={styles.currency_div} onClick={ (e) => this.prices_toggler(e)}>
                            <li>  {this.state.currencies[this.props.currency].symbol}  </li>
                            <Arrow />

                            {this.state.currencies ? 

                                <Prices  

                                prices={this.state.prices}
                                currncy_changer={this.state.curency_changer} 
                                currencies={this.state.currencies}
                                backdrop_closer={this.backdrop_closer}
                            /> : false} 
                        </div>
                    

                        
                        : false }  
                        <CartButton cart_toggler={this.cart_toggler} count={this.props.cart.length}/>
                        
              
                    </ul>


                   

                    { this.state.cart_toggler ? <Cart 
                    selected_currency={this.props.currency} 
                    currencies={this.props.currencies}
                    set_order={this.props.set_order} 
                    productAdder={this.props.productAdder}
                    cart_toggler={this.cart_toggler}
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
