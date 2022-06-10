import React, { Component } from 'react';
import style from './Details.module.css'


class Details extends Component {

    orderPrep = (e , x , type = 'Color' ) => {
        x = '.'+x
      
        document.querySelectorAll(x+' li').forEach(list => {
            list.classList.remove(style.selected , style.color_selected)
        })
        if(type === 'Color'){
            e.target.classList.add(style.color_selected)
     
            // let content = e.target.style.backgroundColor
        }
        else{
            // content = e.target.outerText
  
            e.target.classList.add(style.selected)
        }
  
    }
    
    render() { 

        let current_price = Math.round( (this.props.item.prices[this.props.selected_currency].amount * this.props.item.count) *10 )/10 
        console.log(current_price)
        let selected_attr = this.props.item.selectedAttr
      
        return (
            
            <div className={style.pad_left}>
                <p  className={style.title} >{this.props.item.name}</p>

                <p className={style.price}>{  this.props.item.prices[this.props.selected_currency].currency.symbol}  {current_price}</p>

                {this.props.item.attributes.map( (el , index) => {
                    let x = this.props.item.id + index
                    return(
                            <div key={index} style={{padding : '0' }}>
                                <p className={style.subheader}>{el.id}:</p>


                                
                                { el.id === "Color" ? 
                                
                                <ul className={[style.ul_padder , style.sizer , x].join(' ')}>
                                    {   el.items.map( (item , index) => {
                                         let selected = selected_attr.filter( attr => attr.id === el.id )[0]
                                         let classes = selected.value === index ? style.color_selected : null
                                        
                                return (
                                    
                                    <li key={index} className={classes} onClick={ (e) => this.orderPrep(e , x , el.id)} style={{backgroundColor : item.value  }}  ></li>
                               
                                )  
                                } ) }
                             
                                   </ul>
                                : 
                               false

                                }
                             

                                
                                {el.id !== "Color" ? 
                                <ul className={[style.ul_padder , style.Not_sizer , x].join(' ')}>
                                    {
                                    el.items.map( (item , index) => {

                                        let selected = selected_attr.filter( attr => attr.id === el.id )[0]
                                        
                                        let classes = selected.value === index ? style.selected : null
                                        return  <li key={index} className={classes}  onClick={ (e) => this.orderPrep(e , x , el.id)} >{item.value}</li>
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