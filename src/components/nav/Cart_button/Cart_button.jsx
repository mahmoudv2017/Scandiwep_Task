import React, { Component } from 'react';
import Cartsvg from '../cart_svg/cart'
import Wrapper from '../../hoc/wrapper';
import style from './styles.module.css'


class Cart_Button extends Component {

    
    
  
  
    render() { 

        let arr = [style.tooltop]
        let x =  this.props.count <= 0 ? style.clicked : arr.push(style.show)
        return (
            <Wrapper>
                <li  className={x} onClick={this.props.cart_toggler} > < Cartsvg /></li>
               {this.props.count > 0 ? <div className={style.counter}>{this.props.count}</div> : false} 
                <p className={arr.join(' ')}>No Items Exist Yet</p>
            </Wrapper>

        );
    }
}
 
export default Cart_Button;