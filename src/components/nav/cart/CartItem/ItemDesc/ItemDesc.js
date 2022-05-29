import React from 'react';
import ItemImage from '../itemImage/itemImage';
import style from './itemDesc.module.css'

class ItemDesc extends React.Component {
    constructor(props){
        super(props)

        this.state = { ...props }
    }

    render() { 
        let props = this.state

        return (
            <div className={style.bigger_container} key={props.key}>
                <div className={style.container}>
                    <div>
                        <p>{props.item.shirt_title}</p>

                        <p>{props.item.price}</p>

                        <p>Size : </p>

                        <ul>
                            <li>xs</li>
                            <li>s</li>
                            <li>m</li>
                            <li>l</li>
                        </ul>

                        <p>color:</p>
                        <ul>
                            <li><input type="color" name="green" id="color#1" /></li>
                            <li><input type="color" name="black" id="color#2" /></li>
                            <li><input type="color" name="dark" id="color#3" /></li>
                        </ul>
                    </div>

                    <ul className={style.count}>
                        <li onClick={ () => props.incrementer(props.index) } >+</li>
                        <li>{props.item.number_of_items}</li>
                        <li onClick={props.decremnter}>-</li>
                    </ul>
                </div>

                <ItemImage item={props.item} />
            </div>
         
          
        );
    }
}
 
export default ItemDesc;