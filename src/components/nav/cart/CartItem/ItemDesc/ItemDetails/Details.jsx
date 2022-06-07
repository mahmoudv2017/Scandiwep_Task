import React, { Component } from 'react';
import style from './Details.module.css'


class Details extends Component {

    orderPrep = () => {
        console.log(  document.getElementsByClassName('liers')) 
    }
    
    render() { 

        let current_price = Math.round( (this.props.item.prices[this.props.selected_currency].amount * this.props.item.count) *10 )/10 
        return (
            
            <div className={style.pad_left}>
                <p  className={style.title} >{this.props.item.name}</p>

                <p className={style.price}>{  this.props.item.prices[this.props.selected_currency].currency.symbol}  {current_price}</p>

                {this.props.item.attributes.map( (el , index) => {
                    return(
                            <div key={index} style={{padding : '0' , width: '90%'}}>
                                <p className={style.subheader}>{el.id}:</p>


                                <ul className={[style.ul_padder , style.sizer].join(' ')}>
                                { el.type === "swatch" ? 
                                el.items.map( (item , index) => {
                                return  <li key={index}  style={{backgroundColor : item.value  , border : 'none'}} ></li>
                                } ) : 
                               false

                                }
                                </ul>

                                <ul className={[style.ul_padder , style.Not_sizer].join(' ')}>
                                {el.type !== "swatch" ?  el.items.map( (item , index) => {
                                    return  <li key={index}  onClick={ () => this.orderPrep(index)} >{item.value}</li>
                                    } ) : false}
                             
                             </ul>
                            </div>

                    )
                } )}

                
            </div>
        );
    }
}
 
export default Details;