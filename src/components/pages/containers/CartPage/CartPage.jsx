import React, { Component } from 'react';
import CartItem from '../../../nav/cart/CartItem/cart_item';
import style from './CartPage.module.css'
import style_test from './test.module.css'
import itemDesc_style from './itemDescTest.module.css';
import Wrapper from '../../../hoc/wrapper';

class CartPage extends Component {
    
    prep_order = (products) => {
        this.props.set_order(products)
    }
    render() { 
        const totaler = {
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

            <div className={style.header_div}>
                <h1 className={style.header}>Cart</h1>

                <hr />
            </div>
               


                {this.props.cart.length > 0 ?
                <Wrapper>
                <div className={style.data2}>
                    <CartItem 
                    details_style={style_test}  
                    ItemDesc_style = {itemDesc_style}
                    arrows = {style.arrows}
                    incrementer={this.props.incrementer} 
                    prep_order={this.prep_order}  
                    decremnter={this.props.decremnter}  
                    shirt_arr={this.props.cart} 
                    selected_currency={this.props.selected_currency} />
                </div>

                <div className={style.total}>
                
                    <p>Tax 21% : <span>{totaler.symbol} { Number( (totaler.total * (21/100))).toFixed(2) }</span> </p>
                    <p>Qunatity : <span> {totaler.counter}</span></p>
                    <p>Total : <span> {totaler.symbol}  {Number(totaler.total).toFixed(2)}</span></p>
                    
                    <button onClick={this.prep_order} className={style.orderButton}>Order Now</button>

                </div>
                </Wrapper>

                :

                <h1 style={{width:'100%' , textAlign:'center'}} >Cart Is Empty</h1>
                  
                }

               
            </div>
        );
    }
}
 
export default CartPage;