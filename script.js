const search = document.getElementById("search");
const displayCategory = document.getElementById('data');
const productList = document.getElementById('container');
const categoryEle = document.getElementsByName("")

let categoryArray = []
const getdata = async () => {

  const searchbar = document.getElementById("searchbar");
   
      const response =  await fetch("product.json").then((res) => res.json()).then((res) => {
      
        let searchValue = searchbar.value.toLowerCase();
        const filteredProducts = res.products.filter(res => {
         return res.title.toLowerCase().includes(searchValue)
        })
        res.products.forEach((res) => {
          if(!categoryArray.includes(res.category)) {
            categoryArray.push(res.category)
          }
        })
     return filteredProducts
      })
      const data = response
     
      
      
   const retuElemnt = (data) => {
    return data.map((res) => { return `
    <div class="card">  
    <img src="${res.thumbnail}" class="card-image" alt="${res.title}" />
    <h5 class="card-title">${res.title} </h5>
    <p class="card-description">${res.description} </p>
    <p class="card-price">₹ ${res.price}</p> 
    </div>`})
   }
   const result = retuElemnt(data)
   console.log(result)

    



      displayCategory.innerHTML = result.join(" ")


 

       
    
}

document.getElementById("searchbar").addEventListener("input", getdata)
getdata()
