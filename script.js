const search = document.getElementById("search");
const displayCategory = document.getElementById('data');
const productList = document.getElementById('container');
const btnPrice = document.getElementById('price');

let categoryArray = [];
let sortByPrice = false;
let selectedCategory = '';

const getdata = async () => {
  const searchbar = document.getElementById("searchbar");

  const response = await fetch("product.json")
    .then((res) => res.json())
    .then((res) => {
      let searchValue = searchbar.value.toLowerCase();
      const filteredProducts = res.products.filter((res) => {
        return res.title.toLowerCase().includes(searchValue);
      });
      res.products.forEach((res) => {
        if (!categoryArray.includes(res.category)) {
          categoryArray.push(res.category);
        }
      });
      return filteredProducts;
    });

  const data = response;
  selectedCategory = categoryArray[0]

  const retuElemnt = (data) => {
    return data.map((res) => {
      return `
        <div class="card">  
          <img src="${res.thumbnail}" class="card-image" alt="${res.title}" />
          <h5 class="card-title">${res.title} </h5>
          <p class="card-description">${res.description} </p>
          <p class="card-price">₹ ${res.price}</p> 
        </div>`;
    });
  };

  const getFilteredData = () => {
    let filteredData = data.filter((res) => {
      return (
        res.title.toLowerCase().includes(searchbar.value.toLowerCase()) &&
        (selectedCategory === '' || res.category === selectedCategory)
      );
    });

    if (sortByPrice) {
      filteredData.sort((a, b) => a.price - b.price);
    } else {
      filteredData.sort((a, b) => b.price - a.price);
    }

    const result = retuElemnt(filteredData);
    displayCategory.innerHTML = result.join(" ");
  };

  const categoryFilter = document.getElementById('category-filter');
  categoryArray.forEach((category) => {
    const categoryOption = document.createElement('option');
    categoryOption.value = category;
    categoryOption.textContent = category;
    categoryFilter.appendChild(categoryOption);
  });

  categoryFilter.addEventListener('change', () => {
    selectedCategory = categoryFilter.value;
    getFilteredData();
  });
  
  
  btnPrice.addEventListener('click', () => {
    sortByPrice = !sortByPrice;
    getFilteredData();
  });

  getFilteredData();
};

document.getElementById("searchbar").addEventListener("input", getdata);
getdata();

