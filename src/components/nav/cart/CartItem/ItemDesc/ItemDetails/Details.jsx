import React, { Component } from 'react';
import style from './Details.module.css'



class Details extends Component {
    state = {
        refresh : true
    }
    
    orderPrep = (e , x , type = 'Color' , index = 0 , another_index = 0 ) => {
        x = x+another_index

     
      
        document.querySelectorAll('#'+x+' li').forEach(list => {
           
            list.classList.remove(style.selected , style.color_selected)
        })
        type === 'Color' ? e.target.classList.add(style.color_selected) : e.target.classList.add(style.selected)

    
    }
    
    render() { 

        const current_price =  (this.props.item.prices[this.props.selected_currency].amount * this.props.item.count).toFixed(2)
        const selected_attr = this.props.item.selectedAttr
      
        return (
            
            <div className={this.props.style.pad_left}>

                <div>
                    
                    <p className={this.props.style.title}>{this.props.item.brand}</p>
                    <p  className={this.props.style.brand} >{this.props.item.name}</p>
                </div>
                

                <p className={this.props.style.price}>{  this.props.item.prices[this.props.selected_currency].currency.symbol}  {current_price}</p>

                {this.props.item.attributes.map( (el , index) => {
                    const x = this.props.item.id + index
                    return(
                            <div key={index} style={{padding : '0' }}>
                                <p className={this.props.style.subheader}>{el.id}:</p>


                                
                                { el.id === "Color" ? 
                                
                                <ul  id={x+this.props.index} className={[this.props.style.ul_padder , style.sizer ,x, x+this.props.index+index].join(' ')}>
                                    {   el.items.map( (item , index) => {
                                         const selected = selected_attr.filter( attr => attr.id === el.id )[0]
                                         const classes = selected.value === index ? style.color_selected : null
                                        
                                return (
                                    
                                    <li key={index} className={classes}  style={{backgroundColor : item.value  }}  ></li>
                               
                                )  
                                } ) }
                             
                                   </ul>
                                : 
                               false

                                }
                             

                                
                                {el.id !== "Color" ? 
                                <ul id={x+this.props.index} className={[this.props.style.ul_padder , style.Not_sizer ,x,  x+this.props.index+index].join(' ')}>
                                    {
                                    el.items.map( (item , index) => {

                                        const selected = selected_attr.filter( attr => attr.id === el.id )[0]
                                        let classes = null
                                        if(selected){
                                             classes = selected.value === index ? style.selected : null
                                        }
                                        return  <li key={index} className={classes}  >{item.value}</li>
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