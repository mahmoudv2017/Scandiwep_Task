import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './cart.module.css'
import details_style from './CartItem/ItemDesc/ItemDetails/Details.module.css'
import ItemDesc_style from './CartItem/ItemDesc/itemDesc.module.css'
import scrollBar from '../../pages/containers/PDP/scrollbar/scrollbar.module.css';
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
                <div style={{height : 'inherit'}}>
                    <div className={[style.top_div , scrollBar.invisible_scrollbar].join(' ')}>
                        <p className={style.pad_left} >My Bag<span>, {this.props.cart.length} items</span></p>

                    

                        <div className={style.data}>
                            <CartItem  
                            productAdder={this.props.productAdder} 
                            incrementer={this.props.incrementer} 
                            decremnter={this.props.decremnter} 
                            details_style={details_style}
                            ItemDesc_style={ItemDesc_style}
                            shirt_arr={this.props.cart} 
                            selected_currency={this.props.selected_currency} />
                        </div>

                    
                        <div className={style.total}>
                            <p>Total : </p>
                            <p>{totaler.symbol}  {totaler.total}</p>
                        </div>

                    </div>


                        

                    <div className={style.bottom_div}>
                        <Link to='/cart'>
                            <button onClick={this.props.cart_toggler}>View Bag</button>
                        </Link>
                        
                        <button onClick={() => this.props.set_order(this.props.cart)} >Check OUT</button>
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