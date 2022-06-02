import React, { Component } from 'react';
import style from './PLP.module.css'
import Card from './card/card';


class PLP extends Component {
  

  



    render() { 
        let products = this.props.products
        console.log(products)
        let x = products.map( (product , index) => {
            return(

                <Card prop_key={index} key={index} currency_selector={this.props.currency_selector} selected_currency={this.props.currency}  product={product} ProductAdder={this.props.ProductAdder}/>
               
            )
        })
        
        return (
            
                <div className={style.contain}>
                    <h1 className={style.header}>Category name</h1>

                    <div className={style.grid}>
                        {x}

                    </div>
                </div>
        
           
            
        );
    }
}
 
export default PLP;