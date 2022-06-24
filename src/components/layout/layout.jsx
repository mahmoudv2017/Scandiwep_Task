import { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Wrapper from "../hoc/wrapper";
import Nav from "../nav/nav";
import axios from "../../Axios";
import PLP from "../pages/containers/PLP/PLP";
import PDP from "../pages/containers/PDP/PDP";
import CartPage from "../pages/containers/CartPage/CartPage";
import './style.module.css'

class Layout extends Component {
  state = {

    currency: 0,
    category_selector: 'all',
    prices: false,
    products: [],
    selectedAttr:[],
    allProducts: [],
    cart_toggler: false,
    backdrop: false,
    cart: [],
  };

  componentDidMount() {
    axios
      .get(
        "/graphql?query={categories{name,products{id,name,inStock,description,gallery,brand,attributes{id,name,type,items{id,value}},category,prices{amount,currency{symbol}}}}}"
      )
      .then((res) => {
        this.setState({
          products:
            res.data.data.categories[0].products,
          allProducts: res.data.data.categories,
        });
      });
  }

  incrementer = (index) => {
    const props = this.state
    const number = props.cart[index].count + 1
    props.cart[index].count = number
    props.cart[index].current_price = Math.round(( props.cart[index].prices[props.currency].amount * props.cart[index].count * 10))/10
    this.setState({cart : props.cart})
}

decremnter = (index) => {

    const props = this.state
    console.log({index : props.cart})
    const number = props.cart[index].count - 1
    
     if(number === 0){
         props.cart.splice(index,1)
         this.setState({cart : props.cart})
         return
        }
    props.cart[index].count = number
    props.cart[index].current_price = Math.round(( props.cart[index].prices[props.currency].amount * props.cart[index].count * 10))/10
    
    this.setState({cart : props.cart})
}

  categories_changer = (index) => {
    this.setState({ products: this.state.allProducts[index].products , category_selector : this.state.allProducts[index].name });
  };

  ProductAdder = (product ) => {

    const arr = this.state.cart
    const selected = arr.findIndex( procut => procut.id === product.id )
      if(selected !== -1){
        
        product.count = 1
        arr[selected] = product
        this.setState({cart : arr})
        return
      
      
      }


      if(product.selectedAttr.length === 0){
        const attribues = []
        product.selectedAttr.forEach( attr => {
          const x = {
            id : attr.id , value : 0
          }
          attribues.push(x)
        } )

        product.selectedAttr = attribues
      }
    
    product.count = 1
   

    arr.push(product)

    this.setState({cart : arr})

  };

  set_attr = (attr) => {
    this.setState({selectedAttr : attr})
  }
  curency_changer = (index) => {
    this.setState({ currency: index });
  };

  set_order = (products) => {
    this.setState({cart : []})
  }

  render() {
    return (
      <Wrapper>
        <BrowserRouter>


          <Nav
            categories_changer={this.categories_changer}
            backdrop={this.state.backdrop}
            allcategs={this.state.allProducts}
            currency={this.state.currency}
            ProductAdder={this.ProductAdder}
            set_order={this.set_order}
            cart={this.state.cart}
            incrementer={this.incrementer}
            decremnter={this.decremnter}
            curency_changer={this.curency_changer}
          />


          <Routes>
            <Route
              path="/"
              element={
                <PLP
                  products={this.state.products}
                  currency={this.state.currency}
                  category_selector={this.state.category_selector}
          
                  cart={this.state.cart}
                  ProductAdder={this.ProductAdder}
                />
              }
            />

            <Route
              path=":id"
              element={
                <PDP
                  products={this.state.products}
                  currency={this.state.currency}
                  ProductAdder={this.ProductAdder}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <CartPage
                incrementer={this.incrementer}
                decremnter={this.decremnter}
                set_order={this.set_order}
                  cart={this.state.cart}
                  selected_currency={this.state.currency}
                />
              }
            />


            <Route element={() => { <h1>Page Not Found</h1> }} />
          </Routes>
        </BrowserRouter>

      </Wrapper>
    );
  }
}

export default Layout;
