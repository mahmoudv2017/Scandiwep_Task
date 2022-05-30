import React, { Component } from 'react';
import style from './card.module.css'
import CartAdderSvg from '../cartAdderSvg/cartAdderSvg';

class Card extends Component {
    constructor(props){
        super(props)
        this.state = {...props}
    }
    render() { 
        console.log({card_state : this.props})
        return (
            <div key={this.props.key} className={style.card} >
                <img src={this.props.product.gallery[0]} alt="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" className={style.card_image}/>
                <p>{this.props.product.name}</p>
                <div className={style.cart_adder} onClick={ () => this.props.ProductAdder(this.state.product.id)}>
                    <CartAdderSvg />
                </div>
                <p>{this.props.currency_selector[this.props.selected_currency]} {this.props.product.prices[this.props.selected_currency].amount}</p>
            </div>
        );
    }
}
 
export default Card;