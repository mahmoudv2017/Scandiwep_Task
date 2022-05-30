import { Component } from 'react';

import Wrapper from '../hoc/wrapper';
import Nav from '../nav/nav';
import axios from '../../Axios'
import PLP from '../pages/containers/PLP/PLP';


class Layout extends Component{

  state = {
    shirts : 5,
    currency : 2,
    currency_selector : ['$' , '£' , 'A$' , '¥' , '₽'],
    currencies : null,
    prices:false,
    products : [] ,
    cart_toggler : false,
    backdrop : false,
    cart : []
   
} 


  
  
  componentDidMount (){
      axios.get('http://localhost:4000/graphql?query={currencies{symbol , label}}')
      .then(res => {
        this.setState({currencies : res.data.data.currencies})
       // console.log(this.state)
      })
    }


    ProductAdder = (id) => {
        let arr = this.state.cart
        let jk = "\"" +id+ "\""

        axios.get("/graphql?query={product(id:"+jk+"){id,name,gallery,description,category,prices{amount,currency{symbol}},brand,attributes{id,name,type}}}")
        .then(res => {
            res.data.data.product.count = 1
            arr.push(res.data.data.product)
            this.setState({cart : arr , sss : 4})
        })
    }


    curency_changer = (index) => {
      this.setState({currency : index})
    }
    
    
    render(){

      console.log(this.state.currency)

      let sss = this.state.currency
        return(

        

            <Wrapper>
                 {this.state.currencies ? <Nav 
                 currencies={this.state.currencies} 
                 backdrop={this.state.backdrop} 
                 currency={this.state.currency} 
                 cart={this.state.cart}
                 curency_changer={this.curency_changer}
                 
                 /> : false }
                 
                 <PLP 
                  products={this.state.products} 
                  currency={sss} 
                  currency_selector={this.state.currency_selector}
                  cart={this.state.cart} 
                  ProductAdder={this.ProductAdder}
                  />
                 
           
               

                {/* Switch Routes
                    Product Listing Page
                    Product Description Page
                    Cart Page */}
            </Wrapper>
            
        )
    }
}

export default Layout