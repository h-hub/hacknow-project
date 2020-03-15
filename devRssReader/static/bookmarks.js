$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });


    $('.bookmark-card-link').on('click', function (e) {
        e.preventDefault()
        $(".bookmark-card-link").removeClass("clicked")
        $(this).addClass('clicked');
        var link = $(this).find('a').attr('href');
        $('.bookmarks-content').find('iframe').attr('src', link);
    })

    var bookmarkLink = "";
    var bookmarkLinkCard = "";

    $(".bookmarks").on("click", ".remove-bookmark-btn", function () {

        $('#delete-confirm-modal').modal('show');
        var bookmarkBtn = $(this);
        bookmarkLinkCard = bookmarkBtn.parent().parent();
        bookmarkLink = bookmarkBtn.data('post-link');
        
    });

    $("#confirm-delete-btn").on("click", function () { 

        $('#delete-confirm-modal').modal('hide');
        $('.bookmark-link-loading').prop('hidden', false);

        $.ajax({
            url: '/ajax/remove_bookmark',
            data: {
                'link': bookmarkLink
            },
            dataType: 'json',
            success: function (data) {
                if (data.is_saved) {
                    bookmarkLinkCard.remove();
                } else {
                    alert("Server not responding.");
                }
                $('.bookmark-link-loading').prop('hidden', true);
            }
        });

    });

    


});
