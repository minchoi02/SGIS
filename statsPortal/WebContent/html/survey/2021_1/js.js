$(document).ready(function() {
  var getProductHeight = $('.product.active').height();

  $('.m_cont').css({
    height: getProductHeight
  });

  if($('.product').attr('product-id') === '1'){
      $('#prev').hide();
    } else {
      $('#prev').show();
    }


  function calcProductHeight() {
    getProductHeight = $('.product.active').height();

    $('.m_cont').css({
      height: getProductHeight
    });
  }

  var productItem = $('.product'),
    productCurrentItem = productItem.filter('.active');

  $('#next').on('click', function(e) {
    e.preventDefault();

    var nextItem = productCurrentItem.next();

    productCurrentItem.removeClass('active');

    if (nextItem.length) {
      productCurrentItem = nextItem.addClass('active');
    } else {
      productCurrentItem = productItem.first().addClass('active');
    }
    if(productCurrentItem.attr('product-id') === '1'){
      $('#prev').hide();
    } else {
      $('#prev').show();
    }
    if(productCurrentItem.attr('product-id') === '16'){
      $('#next').hide();
    } else {
      $('#next').show();
    }

    calcProductHeight();
    //animateContentColor();
  });


  $('#prev').on('click', function(e) {
    e.preventDefault();

    var prevItem = productCurrentItem.prev();

    productCurrentItem.removeClass('active');

    if (prevItem.length) {
      productCurrentItem = prevItem.addClass('active');
    } else {
      productCurrentItem = productItem.last().addClass('active');
    }
    if(productCurrentItem.attr('product-id') === '1'){
      $('#prev').hide();
    } else {
      $('#prev').show();
    }
    if(productCurrentItem.attr('product-id') === '16'){
      $('#next').hide();
    } else {
      $('#next').show();
    }

    calcProductHeight();

  });

});
