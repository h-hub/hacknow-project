$(document).ready(function () {

    $('.bookmark-card-link').on('click', function (e) {
        e.preventDefault()
        $(".bookmark-card-link").removeClass("border border-primary")
        $(this).addClass('border border-primary');
        var link = $(this).find('a').attr('href');
        $('.bookmarks-content').find('iframe').attr('src', link);
    })

});

