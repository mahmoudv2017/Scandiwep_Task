import { Component  } from 'react';
import ItemDesc from './ItemDesc/ItemDesc';



class CartItem extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ...props
        //   shirt_arr : [ props.shirt_arr ]
        }
      }
    
      incrementer = (index) => {
        let props = this.state
        let number = props.shirt_arr[index].number_of_items
        props.shirt_arr[index].number_of_items = ++number
        this.setState({...props})
    }

    decremnter = (index) => {

        let props = this.state
        let number = props.shirt_arr[index].number_of_items
        props.shirt_arr[index].number_of_items = --number
        this.setState({...props})
    }
    
    render() { 

    
       let arr = this.state.shirt_arr

   

      //  let x = 

        
       return (
           
            arr.map( (item,index) => {
            
                return(
                    <ItemDesc item={item} key={index} index={index} incrementer={this.incrementer} decremnter={this.decremnter} />
                )
                
            } )
       )
    }
}
 
export default CartItem;