import { Component } from 'react';
import style from "./itemImage.module.css"

class ItemImage extends Component {
   

    
    render() { 

        let item = this.props.item
        return (
            <div className={style.image_container}> 
                <img className={style.image_size} src={item.gallery[0]} alt={item.gallery[1]}/>

                <ul className={style.count}>
                    <li onClick={ () => this.props.incrementer(this.props.index) } >+</li>
                    <li>{this.props.item.count}</li>
                    <li onClick={ () => this.props.decremnter(this.props.index) }>-</li>
                </ul>
            </div>
        );
    }
}
 
export default ItemImage;
