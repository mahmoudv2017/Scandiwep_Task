import axios from '../../../../Axios';
import React, { Component } from 'react';
import style from './PLP.module.css'
import Card from './card/card';


class PLP extends Component {
    constructor(props){
        super(props);
        this.state = {...props}
    }

    componentDidMount(){
        axios.get("/graphql?query={categories{name,products{id,name,inStock,description,gallery,category,prices{amount}}}}")
        .then(res => {
           
            this.setState({products : res.data.data.categories[0].products})

          
        })
    }



    render() { 
        let products = this.state.products
        console.log({plp_state : this.props.currency})
        let x = products.map( (product , index) => {
            return(

                <Card key={index} currency_selector={this.props.currency_selector} selected_currency={this.props.currency}  product={product} ProductAdder={this.state.ProductAdder}/>
               
            )
        })
        
        return (
            <div className={style.contain}>
                <h1 className={style.header}>Category name</h1>

                <div className={style.grid}>
                    {x}

                </div>
            </div>
            
        );
    }
}
 
export default PLP;