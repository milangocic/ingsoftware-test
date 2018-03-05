
//import {productsCall} from './apiCall';
import * as apiFunctions from './apiCall';
var counter = 0

$(document).ready(function(){

    //Load boxes
    showProducts();
    showRelated();
    detailsBox();
    
    //Category - Filter
    $('.filter_categories a').on('click', function(){
        let a = $(this);
        let catSelect = '';
        let boxArea = $('.products_view').find('.boxes_area');

        boxArea.html('');
        $('.products_load_btn').hide();
        $('.filters a').removeClass('active_item');
        a.addClass('active_item');

        catSelect = a.text().toLowerCase().split(' ');
        (catSelect.length > 1) ? catSelect = destructArr(catSelect) : catSelect = catSelect[0].toString();

        if (a.hasClass('selected_cat')){
            showProducts();
            $('.filter_categories a').removeAttr('class');
            $('.products_load_btn').show();
            apiFunctions.scrollTop();
            return;
        }

        if (catSelect != ""){
            apiFunctions.categoryCall(catSelect).then(thumbs => {
                if (thumbs != undefined) {
                    boxArea.html(thumbs);
                    a.addClass('selected_cat');
                    apiFunctions.scrollTop();
                } else {
                    boxArea.html("<h1 class='no_data'>No Products for this category!</h1>");
                    a.addClass('selected_cat');
                    apiFunctions.scrollTop();
                }
            });
        } else {
            console.log("Please select category!")
        }
    });

    //Sizes - Filter
    $('.filter_sizes a').on('click', function(){
        let a = $(this);
        let sizeSelect = '';
        let boxArea = $('.products_view').find('.boxes_area');

        boxArea.html('');
        $('.products_load_btn').hide();
        $('.filters a').removeClass('selected_box');
        $('.filters a').removeClass('active_item');
        a.addClass('selected_box');
        a.addClass('active_item');
        
        sizeSelect = a.text().toLocaleLowerCase().split(' ');
        (sizeSelect.length > 1) ? sizeSelect = destructArr(sizeSelect) : sizeSelect = sizeSelect[0].toString();

        if (a.hasClass('selected_cat')){
            showProducts();
            $('.filter_sizes a').removeAttr('class');
            $('.products_load_btn').show();
            apiFunctions.scrollTop();
            return;
        }
   
        if (sizeSelect != ""){
            apiFunctions.sizesCall(sizeSelect).then(thumbs => {
                if (thumbs != undefined){
                    boxArea.html(thumbs);
                    a.addClass('selected_cat');
                    apiFunctions.scrollTop();
                } else {
                    boxArea.html("<h1 class='no_data'>No Products for this size!</h1>");
                    a.addClass('selected_cat');
                    apiFunctions.scrollTop();
                }
            });
        } else {
            console.log("Please select size!")
        }
    });

    //Brands - Filter
    $('.filter_brands a',).on('click', function(){
        let a = $(this);
        let brandSelect = '';
        let boxArea = $('.products_view').find('.boxes_area');

        boxArea.html('');
        $('.products_load_btn').hide();
        $('.filters a').removeClass('selected_box');
        $('.filters a').removeClass('active_item');
        a.addClass('selected_box');
        a.addClass('active_item');

        brandSelect = $(this).text().toLocaleLowerCase().split(' ');
        (brandSelect.length > 1) ? brandSelect = destructArr(brandSelect) : brandSelect = brandSelect[0].toString();

        if (a.hasClass('selected_cat')){
            showProducts();
            $('.filter_brands a').removeAttr('class');
            $('.products_load_btn').show();
            apiFunctions.scrollTop();
            return;
        }
        if (brandSelect != ""){
            apiFunctions.brandsCall(brandSelect).then(thumbs => {
                if (thumbs != undefined){
                    boxArea.html(thumbs);
                    a.addClass('selected_cat');
                    apiFunctions.scrollTop();
                } else {
                    boxArea.html("<h1 class='no_data'>No Products for this brand!!</h1>");
                    a.addClass('selected_cat');
                    apiFunctions.scrollTop();
                }
            });
        } else {
            console.log("Please select size!")
        }
    });

    //Price Slider and filter
    priceRange();

    //Sticky menu
    $(window).scroll(function() {
        var winTop = $(window).scrollTop();
        if (winTop >= 100) {
            $("body").addClass("sticky-header");
        } else {
            $("body").removeClass("sticky-header");
        }
    })

    //menu
    $('.menu_icon').on('click', function(){
        let ulist = $('.big_header nav').find('ul.bh_menu_links');
        ulist.toggleClass('open');
        if (ulist.hasClass('open')){
            $(this).css('background','');
            $(this).css('background','url(/src/imgs/big_header/menu_icon_x.png) no-repeat'); 
        } else {
            $(this).css('background','');
            $(this).css('background','url(/src/imgs/big_header/menu_icon.png) no-repeat;'); 
        }
    });
    $(window).resize(function(){
        let windowWidth = $(window).width();
        if (windowWidth > 768){
            $('.big_header nav').find('ul.bh_menu_links').removeClass('open');
        } 
    });

    //Filters show/hide
    $('#filters_btn').on('click', function(){
        let filtersMenu = $('.filters');
        let filtersMenuWidth = filtersMenu.width();
        let position = filtersMenu.position();

        if (position.left < 0){
            filtersMenu.animate({
                'left':'0px',
                'opacity':'0.95'
            },500);
        } else {
            filtersMenu.animate({
                "left": "-" + ( filtersMenuWidth) + "px",
                'opacity':'0'
            },1000);
        }
    });
    $(window).resize(function(){
        let windowWidth = $(window).width();
        //if (windowWidth >= 1218){
        if (windowWidth >= 1218){
            $('.main_content').find('.filters').css({'left':'0','opacity':'0.95'});
        } 
    });

    //Load more btn
    $('#load_more').on('click', function(){
        let boxArea = $('.products_view').find('.boxes_area');
        $('.products_load_btn').hide();
        if (counter < 3){
            counter++;
            apiFunctions.loadMore().then(thumbs =>{
                if (thumbs != undefined) {
                    boxArea.append(thumbs);
                    $('.products_load_btn').show();
                } 
            })
        } else {
            boxArea.append("<h1 class='no_products'>No More Products!</h1>");
            counter = 0;
        }
    });

    //Details change img
    $(document).on('click','.detail_content .pd_small_thumb', function(){
        let smallImgPath = $(this).find('.pd_small_img').attr('src');
        $(this).closest('.pd_img_area').find('.pd_main_img').attr('src',smallImgPath);
    });

    //Details select size
    $(document).on('click','.pd_sizes_no', function(){
        $('.pd_sizes_no').removeClass('selected');
        $(this).addClass('selected');
        let sizeVal = $(this).text();
        $(this).parent().find('#pd_choosen_size').val(sizeVal);
    });

    //Details quantity
    $(document).on('click','.pd_quantity_btn', function(){
        let button = $(this);
        let input = button.parent().find('.pd_quantity_amount');
        let oldVal = input.val();
        let newVal = 0;

        if(button.text() == '+'){
            newVal = parseInt(oldVal) + 1;
        } else {
            if (oldVal > 0){
                newVal = parseInt(oldVal) - 1;
            } else {
                newVal = 0;
            }
        }
        input.val(newVal);
    });

    //JoinUs News Letter btn - Modal
    $('.join_btn').on('click', function(){
        let emailField = $(this).prevAll().find('.emailField');
        let myEmail = emailField.val();
        if (validateEmail(myEmail)){
            if (myEmail != ""){
                let dataForSend = {};
                dataForSend.email = myEmail
                dataForSend = JSON.stringify(dataForSend);
                apiFunctions.sentEmail(dataForSend).then(resp => {
                    let {email} = resp;
                    $('#newsLetterModal').find('.modalEmail').html(email);
                    $('#newsLetterModal').modal('toggle');
                    emailField.val("");
                })
            } else {
                console.log('email is not correct!');
            }
        }
        else {
            alert(`Email is not valid!`);
        }
    });

    //Order Now btn - Modal
    $(document).on('click','#pd_order_btn', function(){
        let button = $(this);
        let thumb = button.closest('.pd_detail_box');
        let quantity = thumb.find('#pd_quantity_amount').val();
        quantity = parseInt(quantity);
        let size = thumb.find('#pd_choosen_size').val();

        if (quantity <= 0){
            thumb.find('#pd_quantity_amount').tooltip('show');
            return;
        };
        if (size == ""){
            thumb.find('.pd_sizes_list').tooltip('show');
            return;
        }

        let orderData = {};
        orderData.id = thumb.data('id');
        orderData.name = thumb.find('.pd_full_name').html();
        orderData.kit = thumb.find('.pd_kit').html();
        orderData.description = thumb.find('.pd_description').html();
        orderData.size = size;
        orderData.quantity = quantity
        orderData.price = thumb.find('.pd_total_price').html();

        let dataForSend = JSON.stringify(orderData);

        if (dataForSend != ""){
            apiFunctions.sentOrder(dataForSend).then(resp =>{
                console.log(resp);
                resp = JSON.stringify(resp);
                $('#orderNowModal').find('.modalOrderData').html(resp);
                $('#orderNowModal').modal('toggle');
            })
        } else {
           let error = 'Please check data for sent!'
            $('#orderNowModal').find('.modalOrderData').html(error);
            $('#orderNowModal').modal('toggle');
        }
    })
});

function priceRange(){
    let startValue = 100;
    let endValue = 1000;
    let minValue = 1;
    let maxValue = 2000;

    $("#slider-container").slider({
        range: true,
        min: minValue,
        max: maxValue,
        step: 50,
        values: [startValue, endValue],
        create: function(){
            $("#amount-from").val(startValue);
            $("#amount-to").val(endValue);
        },
        slide: function(event, ui){
            let boxArea = $('.products_view').find('.boxes_area');
            boxArea.html('');
            $('.products_load_btn').hide();

            if(ui.values[0] > 300 || ui.values[1] > 1200){
                apiFunctions.priceCall().then(thumbs => {
                    if (thumbs != undefined) {
                        $('.products_view').find('.boxes_area').html(thumbs);
                        apiFunctions.scrollTop();
                    } else {
                        boxArea.html("<h1 style='height:1300px;'>No Products for this size!</h1>");
                        apiFunctions.scrollTop();
                    }
                })
            }
            $("#amount-from").val(ui.values[0]);
            $("#amount-to").val(ui.values[1]);
        }
    });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function destructArr (arr){
    let singleStr = '';
    if (arr.length > 1){
        let [a,b] = arr;
        singleStr = a + b; 
    } else {
        let [a] = arr;
        singleStr = a;
    };
    return singleStr;
};

function showProducts(){
    apiFunctions.allProducts().then(thumbs => {
        if (thumbs != undefined){
            $('.products_view').find('.boxes_area').html(thumbs);
        } else {
            console.log('Error with thumbs!')
        }
    });
};

function showRelated(){
    apiFunctions.relatedProducts().then(thumbs => {
        if (thumbs != undefined) {
            $('.related_products').find('.rp_content').html(thumbs);
        } else {
            console.log('Error with thumbs!') 
        }
    });
};

function detailsBox(){
    apiFunctions.detailsProduct().then(res => {
        if (res != undefined) {
            $('.detail_content').find('.product_detail_area').html(res);
        } else {
            console.log('Error with details box!') 
        }
    })
}

