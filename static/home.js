
$(document).ready(function () {

    var link = "";

    $('.modal').modal('handleUpdate')

    $('.modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        link = button.data('link')
        var title = button.data('title')
        var modal = $(this)
        modal.find('iframe').attr('src', link)
        modal.find('#ModalLongTitle').text(title)
    })

    $('.modal').on('hide.bs.modal', function (event) {
        var modal = $(this)
        modal.find('iframe').attr('src', '')
    })

    $('#newtab-btn').click(function () {
        var win = window.open($('#blog-post-link').attr('src'), '_blank');
        if (win) {
            win.focus();
        } else {
            alert('Please allow popups for this website');
        }
    });

    $("#bookmark-btn").click(function () {
        $.ajax({
            url: '/ajax/bookmark',
            data: {
                'link': link
            },
            dataType: 'json',
            success: function (data) {
                if (data.is_taken) {
                    alert("A user with this username already exists.");
                }
            }
        });

    });

});