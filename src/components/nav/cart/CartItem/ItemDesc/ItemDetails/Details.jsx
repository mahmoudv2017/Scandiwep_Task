import React, { Component } from 'react';
import style from './Details.module.css'

class Details extends Component {
   
    render() { 
        return (
            <div className={style.pad_left}>
                <p>{this.props.item.name}</p>

                <p className={style.price}>{this.props.item.prices[this.props.selected_currency].currency.symbol}  {this.props.item.prices[this.props.selected_currency].amount}</p>

                <p>Size : </p>

                <ul className={[style.ul_padder , style.sizer].join(' ')}>
                    <li>xs</li>
                    <li className={style.selected}>s</li>
                    <li>m</li>
                    <li>l</li>
                </ul>

                <p>color:</p>
                <ul className={[style.ul_padder , style.color_siezer].join(' ')}>
                    <li><input type="color" name="green" id="color#1" defaultValue='#1D1F22' /></li>
                    <li><input type="color" name="black" id="color#2" defaultValue='#15A4C4'/></li>
                    <li><input type="color" name="dark" id="color#3" defaultValue='#EA8120'/></li>
                </ul>
            </div>
        );
    }
}
 
export default Details;