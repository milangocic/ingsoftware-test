
let boxTemplate = require('./boxes.hbs');
let detailsTemplate = require('./detailsBox.hbs');

export let allProducts = function(){
    let url = `http://jsonstub.com/ing/products`;
    showLoader();
    return getFetch(url)
        .then(resp => resp.json())
        .then(data => {
            hideLoader();
            let take = 9;

            if (data.length > take){
                data.length = take
            }

            let thumbs = createThumb(data);
            return thumbs;
        })
        .catch(error => console.log(error));
};

export let relatedProducts = function(){
    let url = `http://jsonstub.com/ing/products/related`;
     showLoader();
     return getFetch(url)
        .then(resp => resp.json())
        .then(data => {
            hideLoader();
            let take = 4;
            if (data.length > take) {
                data.sort(() => 0.5 - Math.random());
                data.length = take;

                let thumbs = createThumb(data);
                return thumbs;
            }
        })
        .catch(error => console.log(error));
};

export let detailsProduct = function(){
    let url = `http://jsonstub.com/ing/order/detail`;
    showLoader();
    return getFetch(url)
        .then(resp => resp.json())
        .then(data => {
            hideLoader();
            let details = createDetailsBox(data);
            return details;
        })
        .catch(error => console.log(error));
};

export let loadMore = function(){
    let url = `http://jsonstub.com/ing/products/loadmore`;
    showLoader();
    return getFetch(url)
    .then(resp => resp.json())
    .then(data => {
        hideLoader();
        let take = 3;
        if (data.length > take) {
            data.sort(() => 0.5 - Math.random());
            data.length = take;
            let thumbs = createThumb(data);
            return thumbs;
        }
    })
    .catch(error => console.log(error));
};

export let categoryCall = function(cat){
    if (cat != "" && cat != undefined){
        let url = `http://jsonstub.com/ing/products?cat=${cat}`;
        showLoader();
        return getFetch(url)        
        .then(resp => resp.json())
        .then(data => {
            hideLoader();
            if (data.length > 0){
                if(data.length >= 9) $('.products_load_btn').show();
                let thumbs = createThumb(data);
                return thumbs;
            } else {
                console.log("No categories data!");
            }
        })
        .catch(error => console.log(error))
    } else {
        alert("Please select category!");
    }
};

export let priceCall = function(){
    let url = `http://jsonstub.com/ing/products?price`;
    showLoader();
    return getFetch(url)
    .then(resp => resp.json())
    .then(data => {
        if(data.length > 0){
            hideLoader();
            if(data.length >= 9) $('.products_load_btn').show();
            let thumbs = createThumb(data);
            return thumbs;
        } else {
            console.log("No prices data!");
        }
    })
};

export let sizesCall = function(size){
    if (size != "" && size != undefined){
        let url = `http://jsonstub.com/ing/products?sizes=${size}`;
        showLoader();
        return getFetch(url)
        .then(resp => resp.json())
        .then(data => {
            hideLoader();
            if (data.length > 0){
                if(data.length >= 9) $('.products_load_btn').show();
                let thumbs = createThumb(data);
                return thumbs;
            } else {
                console.log("No sizes data!");
            }
        })
        .catch(error => console.log(error));
    } else {
        alert("Please select size!")
    }
};

export let brandsCall = function(brand){
    if (brand != "" && brand != undefined){
        let url = `http://jsonstub.com/ing/products?brands=${brand}`;
        showLoader();
        return getFetch(url)
        .then(resp => resp.json())
        .then(data => {
            hideLoader();
            if (data.length > 0){
                if(data.length >= 9) $('.products_load_btn').show();
                let thumbs = createThumb(data);
                return thumbs;
            } else {
                console.log("No brands data!");
            }
        })
        .catch(error => console.log(error));
    } else {
        alert("Please select size!")
    }
};

//Details - Order now - POST -
export let sentOrder = function(order){
    let url = `http://jsonstub.com/ing/products/order`;
    showLoader();
    return postFetch(url,order)
    .then(resp => resp.json())
    .then(data => {
        hideLoader();
        return data;
    })
    .catch(error => console.log(error));
};

//NewsLetter - POST -
export let sentEmail = function(email){
    let url = `http://jsonstub.com/ing/products/newsletter`;
    showLoader();
    return postFetch(url,email)
    .then(resp => resp.json())
    .then(data => {
        if (data != ""){
            hideLoader();
            return data;
        } else {
            console.log('No data!');
        }
    })
    .catch(error => console.log(error));
};

export let scrollTop = function(){
    $('html, body').animate({ scrollTop: 0 }, 500);
};

export function showLoader(){
    $('.loader').fadeIn('fast');
};

export function hideLoader(){
    $('.loader').fadeOut('fast');
};

function getFetch(url){
    return fetch(url,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "JsonStub-User-Key":"4ca8e7ac-b236-471f-a65b-28ecc1089a80",
            "JsonStub-Project-Key":"ff8c388d-2d0a-49ba-aa26-6ab066c3b92b"
        }
    })
}

function postFetch(url,data){
    return fetch(url,{
        method:'POST',
        body:data,
        headers: {
            "Content-Type": "application/json",
            "JsonStub-User-Key":"4ca8e7ac-b236-471f-a65b-28ecc1089a80",
            "JsonStub-Project-Key":"ff8c388d-2d0a-49ba-aa26-6ab066c3b92b"
        }            
    })
}

function createThumb(apiData){
    return boxTemplate(apiData);
}

function createDetailsBox(apiData){
    return detailsTemplate(apiData);
}

