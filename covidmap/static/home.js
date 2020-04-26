
$(document).ready(function () {

    var link = "";

    $('.modal').modal('handleUpdate')

    $('.modal').on('show.bs.modal', function (event) {

        $('.modal-title-menu-loading').show();
        $('.modal-title-menu').find('.bookmark-btn').remove();

        var button = $(event.relatedTarget) // Button that triggered the modal
        link = button.data('link')
        var title = button.data('title')
        var content = button.data('content')
        var modal = $(this)
        modal.find('iframe').attr('src', link)
        modal.find('#ModalLongTitle').text(title)

        $.ajax({
            url: '/ajax/is_bookmark',
            data: {
                'link': link
            },
            dataType: 'json',
            success: function (data) {
                if (!data.is_bookmark) {
                    $('.modal-title-menu').append("<button type='button' class='btn btn-outline-primary btn-sm bookmark-btn id='add-bookmark-btn'><i class='far fa-bookmark'></i> Bookmark</button>");

                } else {
                    $('.modal-title-menu').append("<button type='button' class='btn btn-outline-primary btn-sm bookmark-btn' id='remove-bookmark-btn'><i class='fas fa-bookmark text-warning'></i> Bookmarked</button>");
                }
                $('.modal-title-menu-loading').hide();
            }
        });
    })

    $('#newtab-btn').click(function () {
        var win = window.open($('#blog-post-link').attr('src'), '_blank');
        if (win) {
            win.focus();
        } else {
            alert('Please allow popups for this website');
        }
    });

    $(".modal-title-menu").on("click", "#add-bookmark-btn", function () {
        $('.modal-title-menu-loading').show();
        $('.modal-title-menu').find('.bookmark-btn').remove();

        $.ajax({
            url: '/ajax/add_bookmark',
            data: {
                'link': link
            },
            dataType: 'json',
            success: function (data) {
                if (data.is_saved) {
                    $('.modal-title-menu').append("<button type='button' class='btn btn-outline-primary btn-sm bookmark-btn' id='remove-bookmark-btn'><i class='fas fa-bookmark text-warning'></i> Bookmarked</button>");
                } else {
                    $('.modal-title-menu').append("<button type='button' class='btn btn-outline-primary btn-sm bookmark-btn' id='add-bookmark-btn'><i class='far fa-bookmark'></i> Bookmark</button>");
                }
                $('.modal-title-menu-loading').hide();
            }
        });
    });

    $(".modal-title-menu").on("click", "#remove-bookmark-btn", function () {
        $('.modal-title-menu-loading').show();
        $('.modal-title-menu').find('.bookmark-btn').remove();

        $.ajax({
            url: '/ajax/remove_bookmark',
            data: {
                'link': link
            },
            dataType: 'json',
            success: function (data) {
                if (data.is_saved) {
                    $('.modal-title-menu').append("<button type='button' class='btn btn-outline-primary btn-sm bookmark-btn' id='add-bookmark-btn'><i class='far fa-bookmark'></i> Bookmark</button>");
                } else {
                    $('.modal-title-menu').append("<button type='button' class='btn btn-outline-primary btn-sm bookmark-btn' id='remove-bookmark-btn'><i class='fas fa-bookmark text-warning'></i> Bookmarked</button>");
                }
                $('.modal-title-menu-loading').hide();
            }
        });
    });

    $('.author-name-links').click(function () {
        $(this).css("border-left", "5px solid #06BEE1");
        $(this).css("border-right", "5px solid #06BEE1");
    });

    $('.bookmark-icon').each(function (i, obj) {
        var bookmarkIcon = $(this);
        var feedLink = bookmarkIcon.data('link');
        console.log(feedLink);

        $.ajax({
            url: '/ajax/is_bookmark',
            data: {
                'link': feedLink
            },
            dataType: 'json',
            success: function (data) {
                if (data.is_bookmark) {
                    bookmarkIcon.addClass("text-warning");
                }
            }
        });

    });


});