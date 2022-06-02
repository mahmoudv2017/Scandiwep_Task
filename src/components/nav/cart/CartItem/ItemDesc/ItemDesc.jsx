import React from 'react';
import ItemImage from '../itemImage/itemImage';
import style from './itemDesc.module.css'
import Details from './ItemDetails/Details';

class ItemDesc extends React.Component {
    constructor(props){
        super(props)

        this.state = { ...props }
    }

    render() { 



     
        return (
            <div className={style.bigger_container} key={this.props.some_key}>
                <div className={style.container}>

                    <Details item={this.props.item} selected_currency={this.props.selected_currency} />

                    <ul className={style.count}>
                        <li onClick={ () => this.props.incrementer(this.props.index) } >+</li>
                        <li>{this.props.item.count}</li>
                        <li onClick={ () => this.props.decremnter(this.props.index) }>-</li>
                    </ul>
                </div>

                <ItemImage item={this.props.item} />
            </div>
         
          
        );
    }
}
 
export default ItemDesc;