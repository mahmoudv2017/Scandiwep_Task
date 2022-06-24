import { Component } from 'react';
import style from './card.module.css'
import CartAdderSvg from '../cartAdderSvg/cartAdderSvg';
import { Link  } from 'react-router-dom'

class Card extends Component {


    
  
    render() { 

        let styles_arr = [style.card_image]
          let attribues = []
          this.props.product.attributes.forEach( attr => {
          let x = {
            id : attr.id , value : 0
          }
          attribues.push(x)
        } )

        this.props.product.selectedAttr = attribues

        return (

            <div key={this.props.prop_key} className={style.card} >
                
                  
                    <Link to={'id='+this.props.product.id} className={styles_arr.join(' ')}> 
                    {!this.props.product.inStock ?  <div className={style.inStock}>Out Of Stock</div> : false}
                        <img  src={this.props.product.gallery[0]} alt="https://www.w3schools.com/css/paris.jpg" />
                    </Link>
               
                
                <p>{this.props.product.brand} {this.props.product.name}</p>
                
                {this.props.product.inStock ?  
                    <div className={style.cart_adder} onClick={ () => this.props.ProductAdder(this.props.product)}>
                        <CartAdderSvg />
                    </div> : false}
               
                <p className={style.price}>{this.props.product.prices[this.props.selected_currency].currency.symbol} {this.props.product.prices[this.props.selected_currency].amount}</p>
            </div>
        );
    }
}
 
export default Card;