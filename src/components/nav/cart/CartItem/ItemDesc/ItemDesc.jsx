import React from 'react';
import ItemImage from '../itemImage/itemImage';
import style from './itemDesc.module.css'
import Details from './ItemDetails/Details';

class ItemDesc extends React.Component {


    render() { 



     
        return (
            <div className={this.props.ItemDesc_style.bigger_container} key={this.props.some_key}>
                <div className={style.container}>

                    <Details style={this.props.details_style} productAdder={this.props.productAdder} item={this.props.item} prep_order={this.props.prep_order} selected_currency={this.props.selected_currency} />

                    {/* <ul className={style.count}>
                        <li onClick={ () => this.props.incrementer(this.props.index) } >+</li>
                        <li>{this.props.item.count}</li>
                        <li onClick={ () => this.props.decremnter(this.props.index) }>-</li>
                    </ul> */}
                </div>

                <ItemImage incrementer={this.props.incrementer} decremnter={this.props.decremnter} item={this.props.item} index={this.props.index} />
                <hr />
            </div>
         
          
        );
    }
}
 
export default ItemDesc;