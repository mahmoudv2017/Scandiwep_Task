import { Component } from 'react';
import style from "./itemImage.module.css"
import LeftButton from '../../../../pages/containers/CartPage/buttonComponents/rightButton';
import RightButton from '../../../../pages/containers/CartPage/buttonComponents/LeftButton';

class ItemImage extends Component {
   
    state = {
        index : 0
    }
    

  
    render() { 

        let item = this.props.item
        return (
            <div className={style.image_container}> 
                <img className={style.image_size} src={ this.state.index+1 > item.gallery.length ? item.gallery[0] : item.gallery[this.state.index]} alt={item.gallery[0]}/>

                <ul className={style.count}>
                    <li onClick={ () => this.props.incrementer(this.props.index) } >+</li>
                    <li>{this.props.item.count}</li>
                    <li onClick={ () => this.props.decremnter(this.props.index) }>-</li>
                </ul>

                <ul>
                <li onClick={ () => {if(this.state.index-1 >= 0) {  this.setState({index:this.state.index-1})  } } }> <LeftButton /> </li>
                <li onClick={ () => {if(item.gallery.length > this.state.index+1) {  this.setState({index:this.state.index+1})  } } } ><RightButton /></li>
                    
                    
                </ul>
            </div>
        );
    }
}
 
export default ItemImage;
