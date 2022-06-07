import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './cart.module.css'
import CartItem from './CartItem/cart_item';


class Cart extends Component {


  state={refresh : false}

    render() { 
        let totaler = {
            total : 0,
            symbol : ''
        }

      
  
       this.props.cart.forEach(element => {
           totaler.symbol = element.prices[this.props.selected_currency].currency.symbol
            
       
           totaler.total += (element.prices[this.props.selected_currency].amount * element.count)
           totaler.total =  Math.round(totaler.total * 10) / 10
       
           return totaler.total
       });

        return (
  
        <div className={style.cart}>


            {this.props.cart.length > 0 ? 
                <div>
                    <div className={style.top_div}>
                        <p className={style.pad_left} >My Bag<span>, {this.props.cart.length} items</span></p>

                    

                        <div className={style.data}>
                            <CartItem incrementer={this.props.incrementer} decremnter={this.props.decremnter} shirt_arr={this.props.cart} selected_currency={this.props.selected_currency} />
                        </div>

                    
                        <div className={style.total}>
                            <p>Total : </p>
                            <p>{totaler.symbol}  {totaler.total}</p>
                        </div>

                    </div>


                        

                    <div className={style.bottom_div}>
                        <Link to='/cart'>
                            <button>View Bag</button>
                        </Link>
                        
                        <button>Check OUT</button>
                    </div>
                </div>
             :

             <h1 className={style.alt_header}>No Items Exist </h1>
        
        }

            


        </div>
        );
    }
}
 
export default Cart;