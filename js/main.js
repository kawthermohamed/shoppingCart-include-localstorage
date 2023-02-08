//
//check local storage in the begining
let productsfromlocalstorage = localStorage.getItem("productName"); //string then will use split
console.log(productsfromlocalstorage);
let allProducts = document.querySelectorAll(".pro");
let selProducts = document.querySelector(".selected-products");

//if empty do nothing
if (productsfromlocalstorage == null) {
} else {
  prosArray = productsfromlocalstorage.split(",");
  for (i = 0; i < prosArray.length; i++) {
    allProducts.forEach((ele) => {
      if (ele.classList.contains(prosArray[i])) {
        ele.classList.add("selected");
        addselectedproductstocart();

        //remove class selected from all to never repeat again when choosing 2 or more products
        removeselectedclass();
      }
    });
  }
}
//#########################################
// when clicked add to cart
let orderbtns = document.querySelectorAll(".pro-price .add-cart ");
let productPrice = document.querySelectorAll(".pro-price .price");
let clickedproducts = [];

orderbtns.forEach((btn) => {
  btn.onclick = function () {
    let productName = btn.dataset.no;

    if (localStorage.getItem("productName") !== null) {
      if (
        localStorage.getItem("productName").split(",").includes(productName)
      ) {
      } else {
        let kk = [];
        kk.push(localStorage.getItem("productName").split(","));

        clickedproducts = kk;
        console.log(clickedproducts);
        afterclickedaddtocart();
        updatePrice();
      }
    } else {
      afterclickedaddtocart();
      updatePrice();
    }
    function afterclickedaddtocart() {
      clickedproducts.push(productName);
      localStorage.setItem("productName", clickedproducts);
      allProducts.forEach((pro) => {
        if (pro.classList.contains(productName)) {
          pro.classList.add("selected");
        }
      });
      addselectedproductstocart();
      //remove class selected from all to never repeat again when choosing 2 or more products
      removeselectedclass();
    }
  };
});
//#########################################

function addselectedproductstocart() {
  let selectedProducts = document.querySelector(".selected");
  let neededclass = selectedProducts.className.split(" ")[1];
  console.log(neededclass);
  let eleCont = document.createElement("div");
  let eleImg = document.createElement("img");
  let eleInfo = document.createElement("div");
  let eleTitle = document.createElement("div");
  let elePrice = document.createElement("span");
  let eleQuantity = document.createElement("input");
  let eleremove = document.createElement("i");

  //imgcont
  let selecterProImg = document.querySelector(".selected img").src;
  eleImg.src = selecterProImg;
  console.log(eleImg.src);
  //titlecont
  let selecterProTitle = document.querySelector(
    ".selected .pro-title"
  ).innerHTML;
  eleTitle.innerHTML = selecterProTitle;

  //pricecont
  let selecterProprice = document.querySelector(
    ".selected .pro-price .price"
  ).innerHTML;
  elePrice.innerHTML = selecterProprice;

  //elequantity
  eleQuantity.setAttribute("type", "number");
  eleQuantity.setAttribute("value", "1");

  //eleremovecont
  eleremove.setAttribute("class", "fa-solid fa-trash-can");
  eleremove.classList.add("eleremove");
  eleremove.style.cursor = "Pointer";
  //append info to eleinfo
  eleInfo.appendChild(eleTitle);
  eleInfo.appendChild(elePrice);
  eleInfo.appendChild(eleQuantity);
  eleInfo.className = "eleInfo";

  //appen all to elecont
  eleCont.appendChild(eleImg);
  eleCont.appendChild(eleInfo);
  eleCont.appendChild(eleremove);

  //add class to elecont
  eleCont.className = "elecont";
  eleCont.classList.add(neededclass);
  selProducts.appendChild(eleCont);
}

// remove selected class from the product after adding it to cart
function removeselectedclass() {
  allProducts.forEach((sPro) => {
    if (sPro.classList.contains("selected")) {
      sPro.classList.remove("selected");
    }
  });
}
//#########################################

//remove product from cart

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("eleremove")) {
    // console.log(e.target.parentElement);
    let removedclass = e.target.parentElement.className.split(" ")[1];
    console.log(removedclass);
    e.target.parentElement.remove();
    updatePrice();

    //local storage
    let storageArray = localStorage.getItem("productName").split(",");
    let needtoremove = storageArray.indexOf(removedclass);
    let removedproduct = storageArray.splice(needtoremove, 1);
    let rmaininlocal = storageArray.join(",");
    localStorage.setItem("productName", rmaininlocal);
  }
});

//#########################################

//cart

let cartIcon = document.querySelector(".nav .cart ");
let cartWindow = document.querySelector(".cart-sec");
let closeIcon = document.querySelector(".cart-sec .close");

cartIcon.onclick = function () {
  cartWindow.classList.add("active");
};

closeIcon.onclick = function () {
  cartWindow.classList.remove("active");
};

//if there is no selected product
let orderbtn = document.querySelector(".cart-sec button");
let pricsSpan = document.querySelector(".pr");
console.log(selProducts);
orderbtn.onclick = function () {
  if (selProducts.innerHTML == "") {
    let warningWindow = document.createElement("div");
    warningWindow.className = "warn";
    let warnText = document.createTextNode(
      "there is no order to place yet, please select your needed products"
    );
    let warnok = document.createElement("span");
    warnok.className = "ok";
    let warnoktex = document.createTextNode("OK");
    warnok.appendChild(warnoktex);
    warningWindow.appendChild(warnText);
    warningWindow.appendChild(warnok);
    document.body.appendChild(warningWindow);
  }
};

//declare warnwindo && ok btn
let warnwindow = document.querySelector(".warn");
let okbtn = document.querySelector(".warn .ok");

document.addEventListener("click", function (e) {
  if (e.target.className == "ok") {
    e.target.parentElement.remove();
  }
});

//######################################################
// now is the function of total price when changing quantity
let totalPrice = document.querySelector(".total .pr");

let prototal = 0;
// to change product quantity

let allInputs = document.querySelectorAll(".eleInfo input");
allInputs.forEach((inp) => {
  let totalPrice = document.querySelector(".total .pr");
  inp.addEventListener("change", function () {
    let provalue = inp.value;
    if (isNaN(provalue) || provalue <= 0) {
      provalue = 1;
      inp.value = 1;
    }
    updatePrice();
  });
});

updatePrice();

// now is the function of total price
function updatePrice() {
  let totalPrice = document.querySelector(".total .pr");

  let prototal = 0;
  if (selProducts.innerHTML == "") {
    totalPrice.innerHTML = 0.0;
  } else {
    let cartProducts = document.querySelectorAll(".elecont");

    console.log(cartProducts);
    cartProducts.forEach((e) => {
      let proprice = e.children[1].children[1].innerHTML.slice(1);
      console.log(proprice);
      let provalue = e.children[1].children[2].value;
      let totalproprice = proprice * provalue;
      prototal += totalproprice;
      totalPrice.innerHTML = prototal;
    });
  }
}
