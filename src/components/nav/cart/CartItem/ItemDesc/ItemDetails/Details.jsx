import React, { Component } from 'react';
import style from './Details.module.css'

let selected_attr = []


class Details extends Component {
    state = {
        refresh : true
    }
    
    orderPrep = (e , x , type = 'Color' , index = 0 ) => {
        x = '.'+x
      
        document.querySelectorAll(x+' li').forEach(list => {
            list.classList.remove(style.selected , style.color_selected)
        })
        type === 'Color' ? e.target.classList.add(style.color_selected) : e.target.classList.add(style.selected)

        let checker = selected_attr.find(attr => attr.id === type)
        if (checker) { checker.value = index }
        else {
            selected_attr.push({
                id: type, value: index
            })
        }




        let product = this.props.item
        product.selectedAttr.map(attr => {

            selected_attr.forEach(selected => {
                if (attr.id === selected.id) {
                    attr.value = selected.value
                }
            })
            return attr

        })

   
        //this.props.productAdder(product)
        this.setState({refresh:false})
    }
    
    render() { 

        let current_price = Math.round( (this.props.item.prices[this.props.selected_currency].amount * this.props.item.count) *10 )/10 
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
                                    
                                    <li key={index} className={classes} onClick={ (e) => this.orderPrep(e , x , el.id , index)} style={{backgroundColor : item.value  }}  ></li>
                               
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
                                        return  <li key={index} className={classes}  onClick={ (e) => this.orderPrep(e , x , el.id , index)} >{item.value}</li>
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