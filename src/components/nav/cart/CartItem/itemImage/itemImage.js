import React, { Component } from 'react';


class ItemImage extends Component {
    constructor(props){

        super(props)
        this.state = {...props}
    }

    
    render() { 

        let item = this.state.item
        return (
            <div > 
                <img src={item.img_url} alt=""/>
            </div>
        );
    }
}
 
export default ItemImage;
