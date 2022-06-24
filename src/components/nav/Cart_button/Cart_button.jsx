import React, { Component } from 'react';
import Cartsvg from '../cart_svg/cart'
import style from './styles.module.css'


class Cart_Button extends Component {

    
    
  
  
    render() { 

        
        return (
            <div>
                <li  style={{paddingTop : '15%' , width:'100%' , height : '86%' , textAlign : 'center'}} onClick={this.props.cart_toggler} > < Cartsvg /></li>
               {this.props.count > 0 ? <div className={style.counter}>{this.props.count}</div> : false} 

            </div>

        );
    }
}
 
export default Cart_Button;