import React, { Component } from 'react';
import CartItem from '../../../nav/cart/CartItem/cart_item';
import style from './CartPage.module.css'

class CartPage extends Component {
    
    prep_order = (products) => {
        this.props.set_order(products)
    }
    render() { 
        let totaler = {
            total : 0,
            counter : 0,
            symbol : ''
        }
  
       this.props.cart.forEach(element => {
        totaler.symbol = element.prices[this.props.selected_currency].currency.symbol
        totaler.counter += element.count 
        totaler.total += (element.prices[this.props.selected_currency].amount * element.count)

           return totaler.total
       });
        return (
            <div className={style.Cart_container}>

                <h1 className={style.header}>Cart</h1>

                <div className={style.data2}>
                    <CartItem  incrementer={this.props.incrementer} prep_order={this.prep_order}  decremnter={this.props.decremnter}  shirt_arr={this.props.cart} selected_currency={this.props.selected_currency} />
                </div>

                <div className={style.total}>
                    
                    <p>Tax 21% : <span>{totaler.symbol} { Math.round( (totaler.total * (21/100)) *10 )/10 }</span> </p>
                    <p>Qunatity : <span> {totaler.counter}</span></p>
                    <p>Total : <span> {totaler.symbol}  {Math.round(totaler.total * 10) / 10}</span></p>
                    
                    <button onClick={this.prep_order} className={style.orderButton}>Order Now</button>
                   
                </div>
            </div>
        );
    }
}
 
export default CartPage;