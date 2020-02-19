$(document).ready(function () {

    $('.bookmark-card-link').on('click', function (e) {
        e.preventDefault()
        $(".bookmark-card-link").removeClass("border border-primary")
        $(this).addClass('border border-primary');
        var link = $(this).find('a').attr('href');
        $('.bookmarks-content').find('iframe').attr('src', link);
    })

    $(".bookmarks").on("click", ".bookmark-btn", function () {

        $('.bookmark-link-loading').removeAttr('hidden');
        var bookmarkBtn = $(this);
        bookmarkBtn.prop('disabled', true);
        var link = bookmarkBtn.data('post-link');

        $.ajax({
            url: '/ajax/bookmark',
            data: {
                'link': link
            },
            dataType: 'json',
            success: function (data) {
                if (!data.is_saved) {
                    bookmarkBtn.text('Removed');
                } else {
                    bookmarkBtn.removeAttr('disabled');
                    alert("Server not responding.");
                }
                $('.bookmark-link-loading').prop('hidden', true);
            }
        });
    });

});

