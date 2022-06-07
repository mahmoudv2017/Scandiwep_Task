import { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Wrapper from "../hoc/wrapper";
import Nav from "../nav/nav";
import axios from "../../Axios";
import PLP from "../pages/containers/PLP/PLP";
import PDP from "../pages/containers/PDP/PDP";
import CartPage from "../pages/containers/CartPage/CartPage";

class Layout extends Component {
  state = {
    shirts: 5,
    currency: 2,
    currency_selector: ["$", "£", "A$", "¥", "₽"],
    category_selector: 0,
    currencies: null,
    prices: false,
    products: [],
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
            res.data.data.categories[this.state.category_selector].products,
          allProducts: res.data.data.categories,
        });
      });
  }

  incrementer = (index) => {
    let props = this.state
    let number = props.cart[index].count + 1
    props.cart[index].count = number
    props.cart[index].current_price = Math.round(( props.cart[index].prices[props.currency].amount * props.cart[index].count * 10))/10
    this.setState({cart : props.cart})
}

decremnter = (index) => {

    let props = this.state
    console.log({index : props.cart})
    let number = props.cart[index].count - 1
    
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
    this.setState({ products: this.state.allProducts[index].products });
  };

  ProductAdder = (id) => {
    let arr = this.state.cart;
    let jk = '"' + id + '"';
    if (
      this.state.cart.find((item) => {
        return item.id === id;
      })
    ) {
      return;
    }
    axios
      .get(
        "/graphql?query={product(id:" +
          jk +
          "){id,name,gallery,description,category,prices{amount,currency{symbol}},brand,attributes{id,name,type,items{id,value}}}}"
      )
      .then((res) => {
        res.data.data.product.count = 1;
        arr.push(res.data.data.product);
        this.setState({ cart: arr });
      });
  };

  curency_changer = (index) => {
    this.setState({ currency: index });
  };

  render() {
    return (
      <Wrapper>
        <BrowserRouter>


          <Nav
            categories_changer={this.categories_changer}
            currencies={this.state.currencies}
            backdrop={this.state.backdrop}
            currency={this.state.currency}
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
                  currency_selector={this.state.currency_selector}
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
                  cart={this.state.cart}
                  selected_currency={this.state.currency}
                />
              }
            />
          </Routes>
        </BrowserRouter>

      </Wrapper>
    );
  }
}

export default Layout;
