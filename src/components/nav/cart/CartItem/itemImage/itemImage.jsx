import { Component } from 'react';
import style from "./itemImage.module.css"

class ItemImage extends Component {
    constructor(props){

        super(props)
        this.state = {...props}
    }

    
    render() { 

        let item = this.state.item
        return (
            <div > 
                <img className={style.image_size} src={item.gallery[0]} alt={item.gallery[1]}/>
            </div>
        );
    }
}
 
export default ItemImage;
