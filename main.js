/* 

CRUDS (Create, read, update, and delete)
Project Develop By Bashar Omar (https://incodey.com/)

In this Project, You Can manage products
You can give him the price, Taxes, Ads, and discount, he will automatically collect it

There are some things that are required for the project to work :
Like the 
Title, 
Price,
Category
(But of course, you can cancel it if you want or even add more).

*/

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
// console.log(title,price,taxes,ads,discount,total,count,category,submit);

// Get Total
function getTotal () {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#52796f"
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#84a98c"
    }
}

// Crate Product
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }; 
// If Mood = Create Then Create a New Product Else Then Update The Product
if (title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100) {
    if (mood === "create") {
        // Count - Crate 1K Product By OneClick
        if (newPro.count > 1) {
            for(let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        }else {
            dataPro.push(newPro);
        }
// Update
    }else {
        dataPro[tmp] = newPro;
        mood = "create";
        submit.innerHTML = "Crate"
        count.style.display = "block"
    };
    clearData ()
}
    // Save Local Storage
    localStorage.setItem('product', JSON.stringify(dataPro))
    // Clear Inputs

    showData ()
}

// Clear Inputs
function clearData () {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Read
function showData () {
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td class="outputs-res">${i+1}</td>
            <td class="outputs-res">${dataPro[i].title}</td>
            <td class="outputs-res">${dataPro[i].price}</td>
            <td class="outputs-res">${dataPro[i].taxes}</td>
            <td class="outputs-res">${dataPro[i].ads}</td>
            <td class="outputs-res">${dataPro[i].discount}</td>
            <td class="outputs-res">${dataPro[i].total}</td>
            <td class="outputs-res">${dataPro[i].category}</td>
            <td class="outputs-res"><button onclick="updateData(${i})" id="update">Update</button></td>
            <td class="outputs-res"><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML= table;
    let btnDelete = document.getElementById("delete-all");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()" class="searchBtn">Delete All (<div class="icon"><i class="gg-close-o"></i></div>${dataPro.length})</button>`
    }else {
        btnDelete.innerHTML = "";
    }
}showData ()

// Delete
function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData ()
};

// Delete All
function deleteAll () {
    localStorage.clear()
    dataPro.splice(0)
    showData ()
};
// Update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = "none"
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll ({
        top: 0,
        behavior: "smooth",
    });
};

// Search
let searchMood = 'title';
function getSearchMood (id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = "Search By " +searchMood
    search.focus();
    search.value = '';
    showData ()
}

function searchData (value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                    <td class="outputs-res">${i+1}</td>
                    <td class="outputs-res">${dataPro[i].title}</td>
                    <td class="outputs-res">${dataPro[i].price}</td>
                    <td class="outputs-res">${dataPro[i].taxes}</td>
                    <td class="outputs-res">${dataPro[i].ads}</td>
                    <td class="outputs-res">${dataPro[i].discount}</td>
                    <td class="outputs-res">${dataPro[i].total}</td>
                    <td class="outputs-res">${dataPro[i].category}</td>
                    <td class="outputs-res"><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td class="outputs-res"><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                    `
            }
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                    <td class="outputs-res">${i+1}</td>
                    <td class="outputs-res">${dataPro[i].title}</td>
                    <td class="outputs-res">${dataPro[i].price}</td>
                    <td class="outputs-res">${dataPro[i].taxes}</td>
                    <td class="outputs-res">${dataPro[i].ads}</td>
                    <td class="outputs-res">${dataPro[i].discount}</td>
                    <td class="outputs-res">${dataPro[i].total}</td>
                    <td class="outputs-res">${dataPro[i].category}</td>
                    <td class="outputs-res"><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td class="outputs-res"><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                    `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}