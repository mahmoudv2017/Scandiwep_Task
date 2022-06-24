import React, { Component } from 'react';
import style from './Details.module.css'

const selected_attr = []


class Details extends Component {
    state = {
        refresh : true
    }
    
    orderPrep = (e , x , type = 'Color' , index = 0 ) => {
        x = '.'+x+'.'+this.props.style.ul_padder
      
        document.querySelectorAll(x+' li').forEach(list => {
            list.classList.remove(style.selected , style.color_selected)
        })
        type === 'Color' ? e.target.classList.add(style.color_selected) : e.target.classList.add(style.selected)

        const checker = selected_attr.find(attr => attr.id === type)
        if (checker) { checker.value = index }
        else {
            selected_attr.push({
                id: type, value: index
            })
        }




        const product = this.props.item
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
                                
                                <ul className={[this.props.style.ul_padder , style.sizer , x].join(' ')}>
                                    {   el.items.map( (item , index) => {
                                         const selected = selected_attr.filter( attr => attr.id === el.id )[0]
                                         const classes = selected.value === index ? style.color_selected : null
                                        
                                return (
                                    
                                    <li key={index} className={classes} onClick={ (e) => this.orderPrep(e , x , el.id , index)} style={{backgroundColor : item.value  }}  ></li>
                               
                                )  
                                } ) }
                             
                                   </ul>
                                : 
                               false

                                }
                             

                                
                                {el.id !== "Color" ? 
                                <ul className={[this.props.style.ul_padder , style.Not_sizer , x].join(' ')}>
                                    {
                                    el.items.map( (item , index) => {

                                        const selected = selected_attr.filter( attr => attr.id === el.id )[0]
                                        
                                        const classes = selected.value === index ? style.selected : null
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