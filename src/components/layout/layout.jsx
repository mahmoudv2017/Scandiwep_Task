import { Component  } from 'react';
import { Route , Routes , BrowserRouter } from 'react-router-dom'
import Wrapper from '../hoc/wrapper';
import Nav from '../nav/nav';
import axios from '../../Axios'
import PLP from '../pages/containers/PLP/PLP';
import PDP from '../pages/containers/PDP/PDP';
import CartPage from '../pages/containers/CartPage/CartPage';


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


  
componentDidMount(){
  axios.get("/graphql?query={categories{name,products{id,name,inStock,description,gallery,category,,prices{amount,currency{symbol}}}}}")
  .then(res => {
     
      this.setState({products : res.data.data.categories[0].products})

    
  })
}
 


    ProductAdder = (id) => {
        let arr = this.state.cart
        let jk = "\"" +id+ "\""

        axios.get("/graphql?query={product(id:"+jk+"){id,name,gallery,description,category,prices{amount,currency{symbol}},brand,attributes{id,name,type}}}")
        .then(res => {
 
            res.data.data.product.count = 1
            arr.push(res.data.data.product)
            this.setState({cart : arr})
        })
    }


    curency_changer = (index) => {
      this.setState({currency : index})
    }
    
    
    render(){




        return(

        

            <Wrapper>

          
                 <Nav 
                 currencies={this.state.currencies} 
                 backdrop={this.state.backdrop} 
                 currency={this.state.currency} 
                 cart={this.state.cart}
                 curency_changer={this.curency_changer}
                 
                 />

                 <BrowserRouter>
                 
                  <Routes>
                      <Route path='/' element={
                            <PLP 
                            products={this.state.products} 
                            currency={this.state.currency} 
                            currency_selector={this.state.currency_selector}
                            cart={this.state.cart} 
                            ProductAdder={this.ProductAdder}
                          />
                      } />
                      
     

                      <Route path=':id' element={
                        <PDP  products={this.state.products} currency={this.state.currency}  />
                      } />

                      <Route path='/cart/:id' element={
                        <CartPage />
                      } />
         
                  </Routes>
                 </BrowserRouter>
                 
                 
                 
           
               

                {/* Switch Routes
                    Product Listing Page
                    Product Description Page
                    Cart Page */}
            </Wrapper>
            
        )
    }
}

export default Layout