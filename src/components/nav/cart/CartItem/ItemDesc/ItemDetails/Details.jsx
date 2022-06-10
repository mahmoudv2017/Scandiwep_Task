import React, { Component } from 'react';
import style from './Details.module.css'


class Details extends Component {

    orderPrep = (e , x , type = 'swatch' ) => {
        x = '.'+x
        let real_type ,content 
        document.querySelectorAll(x+' li').forEach(list => {
            list.classList.remove(style.selected , style.color_selected)
        })
        if(type === 'swatch'){
            e.target.classList.add(style.color_selected)
            real_type = 'Color'
            content = e.target.style.backgroundColor
        }
        else{
            content = e.target.outerText
            real_type = 'Size'
            e.target.classList.add(style.selected)
        }
  
 
        

         this.props.item.OrderedAttrebiutes = [
            {
                id : real_type,
                value : content
            }
         ]
         this.props.prep_order(this.props.item)
    }
    
    render() { 

        let current_price = Math.round( (this.props.item.prices[this.props.selected_currency].amount * this.props.item.count) *10 )/10 
        return (
            
            <div className={style.pad_left}>
                <p  className={style.title} >{this.props.item.name}</p>

                <p className={style.price}>{  this.props.item.prices[this.props.selected_currency].currency.symbol}  {current_price}</p>

                {this.props.item.attributes.map( (el , index) => {
                    let x = this.props.item.id + index
                    return(
                            <div key={index} style={{padding : '0' }}>
                                <p className={style.subheader}>{el.id}:</p>


                                
                                { el.type === "swatch" ? 
                                <ul className={[style.ul_padder , style.sizer , x].join(' ')}>
                                    {   el.items.map( (item , index) => {
                                return (
                               
                                    <li key={index} onClick={ (e) => this.orderPrep(e , x , el.type)} style={{backgroundColor : item.value  }}  ></li>
                               
                                )  
                                } ) }
                             
                                   </ul>
                                : 
                               false

                                }
                             

                                
                                {el.type !== "swatch" ? 
                                <ul className={[style.ul_padder , style.Not_sizer , x].join(' ')}>
                                    {
                                    el.items.map( (item , index) => {
                                        return  <li key={index}  onClick={ (e) => this.orderPrep(e , x , el.type)} >{item.value}</li>
                                        } )
                                    } 
                                    </ul> : false}
                             
                 
                            </div>

                    )
                } )}

                
            </div>
        );
    }
}
 
export default Details;