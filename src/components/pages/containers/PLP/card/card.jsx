import React, { Component } from 'react';
import style from './card.module.css'
import CartAdderSvg from '../cartAdderSvg/cartAdderSvg';
import { Link  } from 'react-router-dom'

class Card extends Component {

 

  
    render() { 

        return (

            <div key={this.props.prop_key} className={style.card} >
                 <Link to={'id='+this.props.product.id} className={style.card_image}> 
                    <img  src={this.props.product.gallery[0]} alt="https://www.w3schools.com/css/paris.jpg" />
                </Link>
                <p>{this.props.product.name}</p>
                
                <div className={style.cart_adder} onClick={ () => this.props.ProductAdder(this.props.product.id)}>
                    <CartAdderSvg />
                </div>
                <p className={style.price}>{this.props.currency_selector[this.props.selected_currency]} {this.props.product.prices[this.props.selected_currency].amount}</p>
            </div>
        );
    }
}
 
export default Card;