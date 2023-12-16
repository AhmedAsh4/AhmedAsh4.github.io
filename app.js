import {
    createClient
} from 'https://jspm.dev/@supabase/supabase-js'


const supabase = createClient('https://hzjepxrrysvvvqmthdyq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6amVweHJyeXN2dnZxbXRoZHlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTk3MDMyNCwiZXhwIjoyMDE3NTQ2MzI0fQ.0R2S9kfbCjpm8G4r7k55d5QULMrVjvawQrt-dW3WKLk')

function showSliderItem(index) {
    const sliderWrapper = document.querySelector('.sliderWrapper');
    const sliderItems = document.querySelectorAll('.sliderItem');

    const itemWidth = sliderItems[0].offsetWidth;

    const distanceToMove = -itemWidth * (index - 1);

    sliderWrapper.style.transform = `translateX(${distanceToMove}px)`;
}
window.showSliderItem = showSliderItem;
export {
    showSliderItem
};

function changeTitle(title) {
    var showcaseTitle = document.querySelector('.showcaseTitle');
    showcaseTitle.textContent = title;
}
window.changeTitle = changeTitle;
export {
    changeTitle
};

function initializeShoppingCart() {
    var shoppingCart = {
        cart: [],

        addItemToCart: function (name, price, count) {
            var found = false;

            for (var i in this.cart) {
                if (this.cart[i].name === name) {
                    this.cart[i].count++;
                    found = true;
                    break;
                }
            }
            if (!found) {
                var item = {
                    name: name,
                    price: price,
                    count: count
                };
                this.cart.push(item);
            }
            localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
            this.displayCart();
            const button = document.querySelector('.buyButton2');
            const addedText = document.querySelector('.addedText');

            button.style.display = 'none';
            addedText.style.display = 'block';
        },
        removeItemFromCart: function (name) {
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].name === name) {
                    if (this.cart[i].count > 1) {
                        this.cart[i].count--;
                    } else {
                        this.cart.splice(i, 1);
                    }
                    break;
                }
            }
            localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
            this.displayCart();
        },

        loadCart: function () {
            var storedCart = localStorage.getItem('shoppingCart');
            if (storedCart !== null) {
                this.cart = JSON.parse(storedCart);
            }
            this.displayCart();
        },

        displayCart: function () {
            var cartDisplay = document.querySelector('.cart-display');
            var totalPriceDisplay = document.querySelector('.total-price');
            var checkoutBtn = document.querySelector('.checkout-btn');

            cartDisplay.innerHTML = '';
            totalPriceDisplay.textContent = '';

            if (this.cart.length === 0) {
                totalPriceDisplay.textContent = 'Your cart is empty.';
                checkoutBtn.style.display = 'none';
                return;
            }

            var total = 0;

            this.cart.forEach(function (item) {
                var cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');

                var itemInfo = document.createElement('div');
                itemInfo.classList.add('item-info');

                var itemName = document.createElement('div');
                itemName.textContent = item.name;
                itemName.classList.add('item-name');
                itemInfo.appendChild(itemName);

                var itemPrice = document.createElement('div');
                itemPrice.textContent = 'Price: ' + (item.price * item.count).toLocaleString();
                itemPrice.classList.add('item-price');
                itemInfo.appendChild(itemPrice);

                var itemCount = document.createElement('div');
                itemCount.textContent = 'Quantity: ' + item.count;
                itemCount.classList.add('item-count');
                itemInfo.appendChild(itemCount);

                var addQuantityButton = document.createElement('button');
                addQuantityButton.textContent = '+';
                addQuantityButton.setAttribute('data-name', item.name);
                addQuantityButton.classList.add('add-quantity');
                cartItem.appendChild(itemInfo);
                cartItem.appendChild(addQuantityButton);

                var removeButton = document.createElement('button');
                removeButton.textContent = '-';
                removeButton.setAttribute('data-name', item.name);
                removeButton.classList.add('remove-item');
                cartItem.appendChild(removeButton);

                cartDisplay.appendChild(cartItem);

                total += item.price * item.count;
            });

            totalPriceDisplay.textContent = 'Total Price: ' + total.toLocaleString();

            var removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    var itemName = this.getAttribute('data-name');
                    shoppingCart.removeItemFromCart(itemName);
                    shoppingCart.displayCart();
                });
            });

            var addQuantityButtons = document.querySelectorAll('.add-quantity');
            addQuantityButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    var itemName = this.getAttribute('data-name');
                    var item = shoppingCart.cart.find(cartItem => cartItem.name === itemName);
                    if (item) {
                        shoppingCart.addItemToCart(itemName, item.price, 1);
                        shoppingCart.displayCart();
                    }
                });
            });
            checkoutBtn.style.display = 'block';
        }
    };


    $('.buyButton2').click(function (event) {
        event.preventDefault();
        var name = $(this).data('name');
        var price = Number($(this).data('price'));
        shoppingCart.addItemToCart(name, price, 1);
    });


    $('.cartIcon').click(function (event) {
        event.preventDefault();
        $('.cart-overlay').css('display', 'flex');
        shoppingCart.displayCart();
    });

    $('.close-cart').click(function () {
        $('.cart-overlay').css('display', 'none');
    });

    $('.checkout-btn').click(function () {
        window.location.href = 'checkout.html';
    });

    shoppingCart.loadCart();
}

$(document).ready(function () {
    initializeShoppingCart();
});


function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const carttotal = document.getElementById('cartTotal');
    cartItemsContainer.innerHTML = '';
    var total = 0;

    cartItems.forEach(item => {

        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `Product: ${item.name}<br> Quantity: ${item.count}<br> Price: ${(item.price * item.count).toLocaleString()}`;
        cartItemsContainer.appendChild(cartItemDiv);
        total += item.price * item.count;
    })
    carttotal.textContent = 'Total Price: ' + total.toLocaleString();;
}
$(document).ready(function () {
    displayCartItems();
});


async function trackOrder(event) {
    event.preventDefault();

    const orderNumber = document.querySelector('.boxInput').value.trim();

    const {
        data,
        error
    } = await supabase
        .from('orders')
        .select('orderStatus')
        .eq('id', orderNumber)
        .single();

    const trackMessage = document.querySelector('.trackText');

    if (data && data.orderStatus) {
        trackMessage.innerHTML = `Order status: ${data.orderStatus}`;
    } else {
        trackMessage.innerHTML = 'Order not found';
    }

    trackMessage.style.display = 'block';
}

window.trackOrder = trackOrder;
export {
    trackOrder
};

async function addNewsletter(event) {
    event.preventDefault();

    var emailInput = document.getElementById('emailInput');
    var subText = document.getElementById('submissonText');
    var pattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    if (!pattern.test(emailInput.value)) {
        subText.textContent = 'Please enter a valid email address';
        subText.style.color = 'red';
        return false;
    } else {
        const {
            data: existingUser,
            error: userError
        } = await supabase
            .from('newsletter')
            .select('*')
            .eq('email', emailInput.value)
            .single();

        if (existingUser) {
            subText.textContent = 'You are already registered!';
            subText.style.color = 'red';
        } else {
            subText.textContent = 'Registered Successfully';
            subText.style.color = '#D6AD60';

            const {
                data,
                error
            } = await supabase
                .from('newsletter')
                .insert([{
                    email: emailInput.value,
                }, ]);

            emailInput.value = '';
        }
    }
}

window.addNewsletter = addNewsletter;
export {
    addNewsletter
};

async function addCustom(event) {
    event.preventDefault();

    var email = document.getElementById('emailcustom');
    var fullname = document.getElementById('fullnamecustom');
    var phonenum = document.getElementById('phonenumcustom');
    var idea = document.getElementById('ideacustom');
    var subText = document.querySelector('.subTextcustom');
    var pattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    if (!pattern.test(email.value)) {
        subText.textContent = 'Please enter a valid email address';
        subText.style.color = 'red';
        subText.style.display = 'block';
        return false;
    } else {
        const {
            data,
            error
        } = await supabase
            .from('customreqs')
            .insert([{
                name: fullname.value,
                email: email.value,
                phonenum: phonenum.value,
                idea: idea.value
            }, ]);

        const form = document.querySelector('.customDesignForm');
        const thankYouText = document.querySelector('.thankYouText');

        form.style.display = 'none';
        thankYouText.style.display = 'block';
        subText.style.display = 'none';
    }
}
window.addCustom = addCustom;
export {
    addCustom
};

async function confirmorder(event) {
    event.preventDefault();

    var fullName = document.getElementById('full-name').value;
    var email = document.getElementById('email').value;
    var phonenum = document.getElementById('phonenumber').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var zip = document.getElementById('zip').value;
    var cardHolderName = document.getElementById('card-holder-name').value;
    var cardNumber = document.getElementById('card-number').value;
    var expMonth = document.getElementById('exp-month').value;
    var expYear = document.getElementById('exp-year').value;
    var cvv = document.getElementById('cvv').value;
    var errormessage = document.getElementById('errormessagepayment');

    if (zip.length !== 5) {
        errormessage.textContent = 'Make sure Zip code is 5 digits';
        errormessage.style.display = 'block';
        return;
    }
    if (cardNumber.length !== 16) {
        errormessage.textContent = 'Incorrect Card Number';
        errormessage.style.display = 'block';
        return;
    }
    if (expMonth.length !== 2 || expMonth > 12 || expMonth < 0) {
        errormessage.textContent = 'Incorrect Expiration Month';
        errormessage.style.display = 'block';
        return;
    }
    if (expYear.length !== 4) {
        errormessage.textContent = 'Incorrect Expiration Year';
        errormessage.style.display = 'block';
        return;
    }
    if (cvv.length < 3 || cvv.length > 4) {
        errormessage.textContent = 'Incorrect CVV';
        errormessage.style.display = 'block';
        return;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    if (
        parseInt(expYear, 10) < currentYear ||
        (parseInt(expYear, 10) === currentYear && parseInt(expMonth, 10) < currentMonth)
    ) {
        errormessage.textContent = 'Card has expired.';
        errormessage.style.display = 'block';
        return;
    }

    const parsedData = JSON.parse(localStorage.getItem('shoppingCart'));
    console.log(parsedData);

    var total = 0;

    parsedData.forEach(item => {
        total += item.price * item.count;
    });
    console.log(total);

    try {
        const {
            data,
            error
        } = await supabase
            .from('orders')
            .insert({
                name: fullName,
                email: email,
                phonenum: phonenum,
                address: address,
                city: city,
                state: state,
                zip: zip,
                noc: cardHolderName,
                cardNumber: cardNumber,
                expMonth: expMonth,
                expYear: expYear,
                cvv: cvv,
                order: parsedData,
                totalPrice: total,
                orderStatus: 'pending'
            });

        if (error) {
            throw error;
        }
        errormessage.style.display = 'none';

        const { data: id,
                error: userError } = await supabase
        .from('orders')
        .select("id")
        .order('id', { ascending: false })
        .limit(1)
        console.log('Data:', id);
        console.log('Error:', userError);

        const orderId = id[0].id;
        var thanksText = document.getElementById('orderSuccessful');
        var boxofinputs =  document.getElementById('boxofinputs');
        boxofinputs.style.display = 'none';
        thanksText.innerHTML = `Thank you for your Order<br>Your order ID is: ${orderId}`;
        thanksText.style.display = 'block';
        thanksText.style.fontSize = '80px';
        thanksText.style.margin = '20px';
        thanksText.style.marginBottom = '120px'
        localStorage.clear();

    } catch (error) {
        console.error('Error placing order:', error.message);
    }
}

window.confirmorder = confirmorder;
export {
    confirmorder
};
