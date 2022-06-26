import React from 'react';
import ItemImage from '../itemImage/itemImage';
import style from './itemDesc.module.css'
import Details from './ItemDetails/Details';

class ItemDesc extends React.Component {


    render() { 



     
        return (
            <div className={this.props.ItemDesc_style.bigger_container} key={this.props.some_key}>
                <div className={style.container}>

                    <Details style={this.props.details_style} index={this.props.index}  productAdder={this.props.productAdder} item={this.props.item} prep_order={this.props.prep_order} selected_currency={this.props.selected_currency} />

                 
                </div>

                <ItemImage arrows={this.props.arrows} incrementer={this.props.incrementer} decremnter={this.props.decremnter} item={this.props.item} index={this.props.index} />
                <hr />
            </div>
         
          
        );
    }
}
 
export default ItemDesc;