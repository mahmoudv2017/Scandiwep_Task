const axios = require('axios')
const api = axios.create({
    baseURL:'http://localhost:4000/'
})

const get_category = async (category) => {
 const sometghin = await api
    .get(
      "graphql?query={category(input: {title:\""+category+"\"}){name,products{id,name,inStock,description,gallery,brand,attributes{id,name,type,items{id,value}},category,prices{amount,currency{symbol}}}}}"
    )
    return sometghin

}

const get_currencies = async () => {
    const sometghin = await api
       .get(
         "graphql?query={currencies{symbol , label}}"
       )
       return sometghin
   
   }

   const get_product = async (id) => {
    const sometghin = await api
       .get(
         "graphql?query={product(id:\""+id+"\"){id,name,gallery,description,inStock,category,prices{amount,currency{symbol}},brand,attributes{id,name,type,items{id,value}}}}"
       )
       return sometghin
   
   }

   const get_all_categories = async () => {
    const sometghin = await api
       .get(
         "graphql?query={categories{name}}"
       )
       return sometghin
   
   }



module.exports = {get_category , get_currencies , get_all_categories , get_product}
