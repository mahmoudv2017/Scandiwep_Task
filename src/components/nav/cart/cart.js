import React, { Component } from 'react';
import style from './cart.module.css'
import CartItem from './CartItem/cart_item';

class Cart extends Component {
    constructor(props){
      super(props)

      this.state = {...props}
    }

    
    render() { 

        console.log(this.state.cart)

        return (
  
        <div className={style.cart}>

            <div className={style.top_div}>
                <p>My Bag <span>, {this.state.cart.length} items</span></p>

                <div className={style.shirt_details}>

                    <div className={style.data}>
                      <CartItem shirt_arr={this.state.cart} />
                    </div>

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