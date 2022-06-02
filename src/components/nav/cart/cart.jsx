import React, { Component } from 'react';
import style from './cart.module.css'
import CartItem from './CartItem/cart_item';


class Cart extends Component {

    
    render() { 
        let totaler = {
            total : 0,
            symbol : ''
        }
  
       this.props.cart.forEach(element => {
           totaler.symbol = element.prices[this.props.selected_currency].currency.symbol
           return  totaler.total += element.prices[this.props.selected_currency].amount 
       });

        return (
  
        <div className={style.cart}>


            

            <div className={style.top_div}>
                <p className={style.pad_left} >My Bag<span>, {this.props.cart.length} items</span></p>

           

                <div className={style.data}>
                    <CartItem shirt_arr={this.props.cart} selected_currency={this.props.selected_currency} />
                </div>

             
                <div className={style.total}>
                    <p>Total : </p>
                    <p>{totaler.symbol}  {totaler.total}</p>
                </div>

            </div>


                    

            <div className={style.bottom_div}>
                <button>View Bag</button>
                <button>Check OUT</button>
            </div>


        </div>
        );
    }
}
 
export default Cart;