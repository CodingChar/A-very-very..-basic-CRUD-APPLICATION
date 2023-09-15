


let actualData = {}
let nav_user = document.getElementById('nav_user')
let nav_scart = document.getElementById('nav_scart')
let sc_length = document.getElementById('sc_length')
let control_panel = document.getElementById('control_panel')
let loginNav = document.getElementById('login')

let loginBtn = document.getElementById('loginBtn')
let registerBtn = document.getElementById('registerBtn')
let logoutBtn = document.getElementById('logoutBtn')
let changeBtn = document.getElementById("changePasswordBtn")
let addProductBtn = document.getElementById('addProductBtn')
let clearAllBtn = document.getElementById('clearAllBtn')
let panel_addProductBtn = document.getElementById('panel_addProduct')
let productsCon = document.getElementById('products')
let AddToCart = document.getElementById('AddToCartBtn')
let details = document.getElementById('details')
let cleanCartBtn = document.getElementById('cleanCart')
let cartDiv = document.getElementById('shooping_cart_body')
let payBtn = document.getElementById('payBtn')

let productTitle = document.getElementById("actual_productTitle")
let productDesc = document.getElementById("actual_productDesc")
let productPrice = document.getElementById("actual_productPrice")


let actualProduct = {};

function renderCart() {
    let { shooping_cart } = actualData;

    let total = 0;

    cartDiv.innerHTML = ""
    shooping_cart.map(obj => {
        total += parseInt(obj.price);
        let cartElement = document.createElement("li")
        cartElement.className = "list-group-item align-items-center"
        cartElement.innerHTML = `
         <span>${obj.title}(${obj.price} DOP.)</span> <button role="button" class="btn btn-sm btn-danger text-end" onclick="deleteCartItem(${obj.id})">delete</button>
        `
        cartDiv.appendChild(cartElement)
    })
    cartDiv.innerHTML += `<li class="list-group-item text-end">TOTAL: ${total}</li>`


}
function deleteCartItem(id) {
    let itemIndex = actualData.shooping_cart.findIndex(product => product.id === id);
    actualData.shooping_cart.splice(itemIndex, 1)
    saveUser(actualData)
    renderAll()
}

function newProductId() {
    let current_id = actualData.products.length + 1
    return current_id;
}

function UpdateBadge() {
    let totalLength = actualData.shooping_cart.length;
    sc_length.innerText = totalLength;
}


function getProduct(id) {
    return actualData.products.find(obj => obj.id === id)
}

function renderProductModal(id) {

    actualProduct = getProduct(id)



    console.log(actualProduct)
    console.log(details);
    productTitle.innerText = actualProduct.title;
    details.innerHTML = `
    <p>Descripcion ${actualProduct.description}</p>
    <h2>PRICE: ${actualProduct.price}</h2>
    `

}

function renderAll() {

    /*

        <div class="col-12 col-md-3">
            <div class="card" style="width: 100%">
              <img src="plant.png" class="card-img-top" alt="...">
              <div class="card-body text-center">
                <h5 class="card-title">Planta</h5>
                <p class="card-text">Price: 0</p>
                <button type="button" class="btn btn-primary">See More</button>
              </div>
            </div>
        </div>


    */




    productsCon.innerHTML = "";
    actualData.products.map(obj => {
        let productCol = document.createElement("div")
        productCol.className = "col-12 col-md-3"
        productCol.innerHTML = `
        <div class="card" style="width: 100%">
            <img src="${obj.imageURL}" class="card-img-top" alt="productImage">
            <div class="card-body text-center">
                <h5 class="card-title">${obj.title}</h5>
                <p class="card-text">Price: ${obj.price} DOP.</p>
                <button type="button" class="btn btn-primary" onclick="renderProductModal(${obj.id})" data-bs-toggle="modal" data-bs-target="#productModal">See More</button>
                <button type="button" class="btn btn-danger" id="DeleteProductBtn" onclick="deleteProduct(${obj.id})">
                Delete
              </button>
            </div>
        </div>`
        productsCon.appendChild(productCol)
    })
    UpdateBadge()
    renderCart();
}

function addProduct(data) {
    console.log("Product Added ->", data)
    let { products } = actualData;
    products.push(data)
    saveUser(actualData)
}



function deleteProduct(id) {
    const productIndex = actualData.products.findIndex(product => product.id === id);
    const shoopingIndex = actualData.shooping_cart.findIndex(product => product.id === id);
    console.log(products)
    if (productIndex !== -1) {

        actualData.products.splice(productIndex, 1)
        actualData.shooping_cart.splice(shoopingIndex, 1)

        console.log(products)
        swal({
            title: "Product Successfully removed",
            icon: "success"
        })
    } else {
        swal({
            title: "Could not remove the product",
            icon: "warning"
        })
    }
    saveUser(actualData)
    renderAll()
}



function changePassword() {
    let password = prompt("Type a new password", "1234")
    actualData.password = password;
    saveUser(actualData)
}
function logout() {
    actualData.logged = false;
    saveUser(actualData)
    logged()
}
function logged() {
    let user = getUserData();
    console.log(user)
    actualData = user;
    if (!user.logged) {
        console.log("the user is not logged")
        nav_user.className += " disabled"
        nav_scart.className += " disabled"
        control_panel.style = "display:none;"
    } else {
        nav_user.className = "nav-link text-white dropdown-toggle"
        nav_scart.className = "nav-link text-white"
        control_panel.style = "display:flex;"
        UpdateBadge();
        renderAll()
    }
}
function cleanCart() {
    actualData.shooping_cart = []
}
function saveUser(data) {
    let text_data = JSON.stringify(data)
    console.log("Saved", data)
    localStorage.setItem("userData", text_data)
}
function getUserData() {
    let data = localStorage.getItem("userData");
    return (data != null) ? JSON.parse(data) : {
        username: null,
        password: null,
        shooping_cart: null,
        logged: null
    };
}


//Main

logged()
console.log(productsCon)
console.log(actualData)

loginBtn.addEventListener('click', e => {
    let username_input = document.getElementById('username_login')
    let password_input = document.getElementById('password_login')


    let data = getUserData()

    console.log("Login ->", {
        username_input,
        password_input
    })

    if (username_input.value != data.username || password_input.value != data.password) {
        swal({
            title: "Invalid Credentials",
            text: "Try again.",
            icon: "warning"
        })
    } else {
        swal({
            title: "You logged as " + data.username,
            text: "Welcome to Green Technology's Store;",
            icon: "success"
        })

        actualData.logged = true;
        saveUser(actualData)

        logged();
    }
})
registerBtn.addEventListener("click", e => {
    let username_input = document.getElementById('username_register')
    let password_input = document.getElementById('password_register')


    console.log("Register -> ", {
        username_input,
        password_input
    })

    let username_noSpaces = username_input.value.replace(/\s/g, '');
    if (username_noSpaces.length <= 0) {
        swal({
            title: "The Username must have letters.",
            icon: "warning"
        })
    } else {
        actualData = {
            username: username_input.value.trim(),
            password: password_input.value.trim(),
            shooping_cart: [],
            products: [],
            logged: false
        }

        saveUser(actualData)
        swal({
            title: `You were registered as ${actualData.username}`,
            text: "Go to the login page and use your credentials to have full access to the store.",
            icon: "success"
        })
    }

})
logoutBtn.addEventListener("click", e => {
    logout()
    location.reload()
})
changeBtn.addEventListener('click', e => {
    changePassword()
})

addProductBtn.addEventListener('click', e => {
    let title = document.getElementById('productTitle').value;
    let imageFILE = document.getElementById('productImage').files[0];
    let description = document.getElementById('productDescription').value;
    let price = document.getElementById('productPrice').value;

    if (imageFILE == undefined) {
        swal({
            title: "You need to insert an image.",
            icon: "warning"
        })
    } else {


        let reader = new FileReader()


        reader.onload = function (e) {


            let productObject = {
                title,
                imageURL: e.target.result,
                description,
                price,
                id: newProductId()
            }
            addProduct(productObject)
            swal({
                title: "Product added successfully.",
                text: `The current product ID is ${productObject.id}.`
                ,icon: "success"
            })
            renderAll()
        };

        reader.readAsDataURL(imageFILE)


    }


})
AddToCart.addEventListener('click', e => {

    let found = actualData.shooping_cart.find(obj => obj.id == actualProduct.id)
    if (found) {
        console.log(found)
        console.log("Found")
        swal({
            title: "The Product is Already in the shooping cart.",
            icon: "warning"
        })
    } else {
        console.log("Not found")
        actualData.shooping_cart.push(actualProduct);
        UpdateBadge()
        saveUser(actualData)
        swal({
            title: "Product added to the shooping cart successfully."
            , icon: "success"
        })

    }
})
clearAllBtn.addEventListener('click', e => {

    if (actualData.products.length <= 0) {

        swal({
            title: "The Store is already empty",
            icon: "warning"
        })

    } else {

        actualData.products = []
        saveUser(actualData)
        renderAll()

    }



})
panel_addProductBtn.addEventListener('click', e => {
    let current_idSpan = document.getElementById('idSpan')
    current_idSpan.innerText = `Current Product ID(ReadOnly): ${newProductId()}`;
})
cleanCartBtn.addEventListener('click', e => {
    cleanCart()
    renderAll()
})
nav_scart.addEventListener('click', e => {
    renderCart()
})
payBtn.addEventListener('click', e => {
    if (actualData.shooping_cart.length < 1) {
        swal({
            title: "Falided Operation",
            text: "The shooping_cart is empty.",
            icon: "warning"
        })
    } else {
        actualData.shooping_cart = []

        swal({
            title: "Succesfull operation",
            text: `Shooping cart items buyed`,
            icon: "success"
        })
        UpdateBadge()
        saveUser(actualData)

    }

})