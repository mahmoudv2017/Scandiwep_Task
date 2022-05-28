import React, { Component } from 'react';
import style from './cart.module.css'

class Cart extends Component {
    state = {
        shirts : 5,
        shirt_title : 'Apollo Running Short',
        price : '$50.00',
        number_of_items : 1,
        img_url : 'data:image/jpeg;base64,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'
    } 
    render() { 
        return (
        <div className={style.cart}>

            <div className={style.top_div}>
                <p>My Bag <span>, {this.state.shirts} items</span></p>

                <div className={style.shirt_details}>

                    <div className={style.data}>
                        <div>
                            <div>
                                <p>{this.state.shirt_title}</p>

                                <p>{this.state.price}</p>

                                <p>Size : </p>

                                <ul>
                                    <li>xs</li>
                                    <li>s</li>
                                    <li>m</li>
                                    <li>l</li>
                                </ul>

                                <p>color:</p>
                                <ul>
                                    <li><input type="color" name="green" id="color#1" /></li>
                                    <li><input type="color" name="black" id="color#2" /></li>
                                    <li><input type="color" name="dark" id="color#3" /></li>
                                </ul>
                            </div>
                          
                            <div>

                            </div>


                        </div>



                        <ul className={style.count}>
                            <li>+</li>
                            <li>{this.state.number_of_items}</li>
                            <li>-</li>
                        </ul>
                    </div>


                    <div className={style.data}>
                        <img src={this.state.img_url} alt=""/>
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