import { Component  } from 'react';
import ItemDesc from './ItemDesc/ItemDesc';



class CartItem extends Component {
    
   
    
      
    
    render() { 

    
       let arr = this.props.shirt_arr

   

      //  let x = 

        
       return (
           
            arr.map( (item,index) => {
            
                return(
                    <ItemDesc 
                        item={item} 
                        selected_currency={this.props.selected_currency} 
                        some_key={index} 
                        key={index} 
                        index={index} 
                        incrementer={this.props.incrementer} 
                        decremnter={this.props.decremnter} 
                    />
                )
                
            } )
       )
    }
}
 
export default CartItem;