import { Component  } from 'react';
import ItemDesc from './ItemDesc/ItemDesc';


class CartItem extends Component {
    
   
    
      
    
    render() { 

    
       const arr = this.props.shirt_arr

   

      //  const x = 

        
       return (
           
            arr.map( (item,index) => {
            
                return(
                    <ItemDesc 
                        item={item} 
                        selected_currency={this.props.selected_currency} 
                        some_key={index} 
                        key={index} 
                        index={index} 
                        arrows={this.props.arrows}
                        details_style={this.props.details_style}
                        ItemDesc_style={this.props.ItemDesc_style}
                        productAdder={this.props.productAdder}
                        prep_order={this.props.prep_order}
                        incrementer={this.props.incrementer} 
                        decremnter={this.props.decremnter} 
                    />
                )
                
            } )
       )
    }
}
 
export default CartItem;