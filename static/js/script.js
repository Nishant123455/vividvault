// some scripts


//handling cref error
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');


// jquery ready start
$(document).ready(function() {
	// jQuery code


    /* ///////////////////////////////////////

    THESE FOLLOWING SCRIPTS ONLY FOR BASIC USAGE,
    For sliders, interactions and other

    */ ///////////////////////////////////////


	//////////////////////// Prevent closing from click inside dropdown
    $(document).on('click', '.dropdown-menu', function (e) {
      e.stopPropagation();
    });


    $('.js-check :radio').change(function () {
        var check_attr_name = $(this).attr('name');
        if ($(this).is(':checked')) {
            $('input[name='+ check_attr_name +']').closest('.js-check').removeClass('active');
            $(this).closest('.js-check').addClass('active');
           // item.find('.radio').find('span').text('Add');

        } else {
            item.removeClass('active');
            // item.find('.radio').find('span').text('Unselect');
        }
    });


    $('.js-check :checkbox').change(function () {
        var check_attr_name = $(this).attr('name');
        if ($(this).is(':checked')) {
            $(this).closest('.js-check').addClass('active');
           // item.find('.radio').find('span').text('Add');
        } else {
            $(this).closest('.js-check').removeClass('active');
            // item.find('.radio').find('span').text('Unselect');
        }
    });



	//////////////////////// Bootstrap tooltip
	if($('[data-toggle="tooltip"]').length>0) {  // check if element exists
		$('[data-toggle="tooltip"]').tooltip()
	} // end if





});
// jquery end

setTimeout(function(){
  $('#message').fadeOut('slow')
}, 4000)

// AJax functionality of reload minus and plus 

$(document).ready(function () {

    function updateCart(cartItemId, action, btn) {

        // Prevent clicking plus on removed row
        if (!btn.closest('tr').length) return;

        $.ajax({
            url: "/cart/update-cart/",
            type: "POST",
            headers: {
                "X-CSRFToken": csrftoken
            },
            data: {
                cart_item_id: cartItemId,
                action: action
            },
            success: function (response) {

                const row = btn.closest('tr');

                // Item removed
                if (response.removed) {
                    row.fadeOut(300, function () {
                        $(this).remove();

                        // Disable any future clicks
                        btn.prop('disabled', true);

                        if ($('tbody tr').length === 0) {
                            location.reload();
                        }
                    });
                    return;
                }

                // Update quantity & subtotal
                row.find('.quantity-input').val(response.quantity);
                row.find('.pricee').text('$ ' + response.sub_total);

                // Update totals
                $('#cart-total').text(response.total);
                $('#cart-grand-total').text(response.grand_total);
            },
            error: function () {
                alert("Something went wrong. Please try again.");
            }
        });
    }

    $(document).on('click', '.btn-plus', function () {
        updateCart($(this).data('cart-id'), 'plus', $(this));
    });

    $(document).on('click', '.btn-minus', function () {
        updateCart($(this).data('cart-id'), 'minus', $(this));
    });

});
