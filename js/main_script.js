let basketItems = new Map();

function changeBasketImage(id) {
    let element = document.getElementById("icon_basket_on_card_" + id);
    
    if (element.getAttribute("src") == "images/icon_basket_card_default.png") {
        document.getElementById("icon_basket_on_card_" + id).src = "images/icon_basket_card.png";
        return true;
    }
    else {
        document.getElementById("icon_basket_on_card_" + id).src = "images/icon_basket_card_default.png";
        return false;
    }
}

function addToBasket(id) {
    let addItem = (id % 2 != 0 ? "wax500g":"wax100g");
    
    if (changeBasketImage(id)) {
        if (basketItems.has(addItem)) {
            basketItems.set(addItem, basketItems.get(addItem) + 1);
        }
        else {
            basketItems.set(addItem, 1);
        }
    }
    else {
        if (basketItems.has(addItem)) {
            basketItems.set(addItem, basketItems.get(addItem) - 1);
            if (basketItems.get(addItem) == 0) { 
                basketItems.delete(addItem);
            }
        }
    }

    document.getElementById("basket_count").innerHTML = basketItems.size;
    updateBasket();
}

function updateBasket() {
    let container = document.getElementById("basket_container");
    let newObject = document.createElement("div");
    newObject.className = "basket_item";
    
    for (const [key, value] of basketItems) {
        if (key == "wax500g") {
            newObject.innerHTML = wax500gHTML;
            //container.appendChild(newObject);
        }
        else {
            newObject.innerHTML = wax100gHTML;
            //container.appendChild(newObject);
        }
    }
}

/*
let slideshow = document.getElementById("slideshow");

function changeImage(arg) {
    slideshow.style.animation = "initial;";
    
    switch(arg) {
        case 1:
            console.log(slideshow.style);
            slideshow.style.backgroundImage = "url(images/index_food4.png);";
            console.log(slideshow.style);
            break;

        case 2:
             slideshow.style.backgroundImage = "url(images/index_food2.png);";
            break;

        case 3:
             slideshow.style.backgroundImage = "url(images/index_food3.png);";
            break;

        case 4:
             slideshow.style.backgroundImage = "url(images/index_food4.png});";
            break;
    }

    slideshow.style.animation = "animation: animate 40s infinite;"
}
let wax500gHTML = `
            <figure>
                <img src="/ukrtrade/images/card_paraffin.png" alt="">
            </figure>
            <div class="basket_item_text">
                <p>Мікрокристалічний віск</p>
                <p style="font-size: 14px;">500 г</p>
            </div>
            <div style="width: 16%; margin-right: 10.27%;">
                <button class="minusOne" onclick="minusOne()" style="margin-right: 6.8%;"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="4" viewBox="0 0 23 4" fill="none">
                    <path d="M2 2H21" stroke="#202B46" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </button>
                <p id="count" style="display: inline-block; margin-right: 6.7%; color: #202B46; font-size: 24px;">2</p>
                <button class="plusOne" onclick="plusOne()">
                    <svg width="4" height="23" viewBox="0 0 4 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="4" height="23" fill="#F5F5F5"/>
                        <rect width="1280" height="1318" transform="translate(-802 -414)" fill="white"/>
                        <rect x="-751.25" y="-73.25" width="1176.5" height="158.5" rx="19.25" fill="#FEFDFD"/>
                        <circle cx="1.5" cy="11.5" r="23" stroke="#D9D9D9" stroke-width="3"/>
                        <path d="M-8 12H11" stroke="#202B46" stroke-width="3" stroke-linecap="round"/>
                        <path d="M2 21L2 2" stroke="#202B46" stroke-width="3" stroke-linecap="round"/>
                        <rect x="-751.25" y="-73.25" width="1176.5" height="158.5" rx="19.25" stroke="#D9D9D9" stroke-width="1.5"/>
                        </svg>
                </button>
            </div>
            <div style="font-size: 28px; font-weight: 700;">300 грн</div>
            <div class="close_grey"><img src="/ukrtrade/images/close_grey.png" alt=""></div>`;

let wax100gHTML = `
            <figure>
                <img src="/ukrtrade/images/card_paraffin.png" alt="">
            </figure>
            <div class="basket_item_text">
                <p>Мікрокристалічний віск</p>
                <p style="font-size: 14px;">100 г</p>
            </div>
            <div style="width: 16%; margin-right: 10.27%;">
                <button class="minusOne" onclick="minusOne()" style="margin-right: 6.8%;"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="4" viewBox="0 0 23 4" fill="none">
                    <path d="M2 2H21" stroke="#202B46" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </button>
                <p id="count" style="display: inline-block; margin-right: 6.7%; color: #202B46; font-size: 24px;">1</p>
                <button class="plusOne" onclick="plusOne()">
                    <svg width="4" height="23" viewBox="0 0 4 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="4" height="23" fill="#F5F5F5"/>
                        <rect width="1280" height="1318" transform="translate(-802 -414)" fill="white"/>
                        <rect x="-751.25" y="-73.25" width="1176.5" height="158.5" rx="19.25" fill="#FEFDFD"/>
                        <circle cx="1.5" cy="11.5" r="23" stroke="#D9D9D9" stroke-width="3"/>
                        <path d="M-8 12H11" stroke="#202B46" stroke-width="3" stroke-linecap="round"/>
                        <path d="M2 21L2 2" stroke="#202B46" stroke-width="3" stroke-linecap="round"/>
                        <rect x="-751.25" y="-73.25" width="1176.5" height="158.5" rx="19.25" stroke="#D9D9D9" stroke-width="1.5"/>
                        </svg>
                </button>
            </div>
            <div style="font-size: 28px; font-weight: 700;">50 грн</div>
            <div class="close_grey"><img src="/ukrtrade/images/close_grey.png" alt=""></div>`;
class Item {
    name;
    source;
    imageSource;
    weight;
    price;
    id;

    constructor(name, source, imageSource, weight, price, id) {
        this.name = name;
        this.source = source;
        this.imageSource = imageSource;
        this.weight = weight;
        this.price = price;
        this.id = id;
    }
}
*/