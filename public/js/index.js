// /**
//  * Created by nobikun1412 on 24-Mar-17.
//  */
var isHover = false;
var slideIndex = 0;
var sliderDetail;
var sliderDetailTotal;
var oldIndexOverview;
var conveyor = $(".content-conveyor", $("#sliderContent"));
var item = $(".item", $("#sliderContent"));
var thumbnailScroll = $('#bx-pager');
var li_thumbnail = $('ul.thumbnail-list-img li');

           
       
        
        //set length of conveyor
        conveyor.css("width", item.length * parseInt(item.css("width")));
        thumbnailScroll.css("width", li_thumbnail.length * parseInt(li_thumbnail.css("width")) + 24);
var drag = $("#draggable");
var widthBody = parseInt($('body').css("width"));
var widthSliderContent = parseInt($('#sliderContent').css("width"));
var posLeftConveyor = (widthBody - widthSliderContent)/2;
var widthConveyor = parseInt(conveyor.css("width"));
var widthThumbnailScroll = li_thumbnail.length * parseInt(li_thumbnail.css("width"));
var posXInit = (widthBody - parseInt($('.thumbnail-slider').css("width")))/2 + 8;
var startX;
           //create slider
           $(function() {

         conveyor.draggable({
           axis: 'x',
           scroll: false,
           containment: [-widthConveyor + posLeftConveyor + widthSliderContent, 0, posLeftConveyor, 0],
           start: function() {
           startX = drag.position().left;
            console.log('start: ' + startX);
      },
           drag: function() {
            var indexThumb = 0;
            var posXSlider = $(this).position().left;
            var posXDrag = drag.position().left;
            var moveXThumb = (posXSlider) * (widthThumbnailScroll/widthConveyor);
            drag.css("left",  -moveXThumb + "px");
           
            console.log('IS: ' + posXDrag);

            if (posXDrag < 45) {
                indexThumb = 0;
            }
            else {
                var tmp = Math.floor((posXDrag + 40 - parseInt(li_thumbnail.css("width")))/(parseInt(li_thumbnail.css("width"))/2));
                 indexThumb = Math.floor(tmp/2) + 1;
            }
            if (startX < posXDrag) {
                var liSelected = 'li-img-' + indexThumb;
                var $this = $('li.' + liSelected);
                $this.find('.img-drop-active').addClass('img-visiting');

                var preIndexThumb = indexThumb - 1;
                var li_Prev = 'li-img-' + preIndexThumb;
                var prev_li_selected = $('li.' + li_Prev);
                prev_li_selected.find('.img-drop-active').removeClass('img-visiting');
            }

            else {
                var liSelected = 'li-img-' + indexThumb;
                var $this = $('li.' + liSelected);
                $this.find('.img-drop-active').addClass('img-visiting');
                var preIndexThumb = indexThumb + 1;
                var li_Prev = 'li-img-' + preIndexThumb;
                var prev_li_selected = $('li.' + li_Prev);
                prev_li_selected.find('.img-drop-active').removeClass('img-visiting');
            }
           },
           stop: function() {
         var posXSlider = $(this).position().left;
      }
         });
         });

          $(function() {
         $("#draggable").draggable({
           axis: 'x',
           scroll: false,
           containment: [posXInit, 0, posLeftConveyor + 10 + (li_thumbnail.length - 1) * parseInt(li_thumbnail.css("width")), 0],
           // scrollSpeed: 500,
           drag: function(e, ui) {
               posXDrag = $(this).position().left;
            var moveXSlider = (posXDrag) * (widthConveyor/(widthThumbnailScroll));
     conveyor.css("left", "-" + moveXSlider + "px");
           }
         });
         });
         
           $(".img-drop-active").droppable({
         accept: '#draggable',
         axis: 'x',
         containment: '#bx-pager',
         over: function(event, ui) {      
           slideIndex = $(this).parent().attr('data-slide-index');
           var liSelected = 'li-img-' + slideIndex;
                var $this = $('li.' + liSelected);
                $this.find('.img-drop-active').addClass('img-visiting'); 
         },
         out: function(event, ui) {
           $(this).removeClass('img-visiting');
         },
         drop: function() {
         
         }
         });

$('.row.first-row').hover(function(event) {
    if (isHover == false) {
        isHover = true;
    } else if (isHover == true) {
        $(this).addClass('hovered');
        return;
    }
});

$('.frame-slider-cover').click(function() {
    $(this).parent().addClass('hovered');
    $(this).hide();
});


$('ul.thumbnail-list-img li').click(function() {
    var oldIndex = $(".img-visiting").parent().attr('data-slide-index');
    chooseThumbnailImage($(this), oldIndex);
});

function chooseThumbnailImage($this, oldIndex) {
    var classTmp = 'img-thumbnail-' + oldIndex;
    $this.find('.img-drop-active').addClass('img-visiting');
    $('img.' + classTmp).parents('.img-drop-active').removeClass('img-visiting');
     var currentIndex = $(".img-visiting").parent().attr('data-slide-index');
    var posX = $this.position().left;
    var posY = $('#draggable').position().top;
    if (currentIndex != 0) {
        posX = posX - 12;
    } else posX = posX - 12;
    $('#draggable').animate({
        'top': posY + 'px',
        'left': posX + 'px'
    }, 100, function() {

    });
         var newY = conveyor.position().top;
         var newX = currentIndex*960;
          conveyor.animate({
        'left': "-" + newX + 'px'
    }, 100, function() {

    });
}


$('#sliderContent div.item .btn-zoom').click(function() {
    var slideOffset = $(this).data('slide-offset');
    oldIndexOverview =  $(this).parents('.item').data('slide-index');
    sliderDetail = $('.bxslider.slider-detail').bxSlider({
        startSlide: slideOffset,
        slideMargin: 50,
        controls: false,
        speed: 500,
        pagerType: 'short',
        onSlideAfter: function($slideElement, oldIndex, newIndex) {
            sliderDetailTotal = sliderDetail.getSlideCount();
            updateIndexSlider(newIndex, sliderDetailTotal);
        },
    });
    $('.row.first-row').hide();
    $('.row.second-row').show();
    sliderDetailTotal = sliderDetail.getSlideCount();
    updateIndexSlider(slideOffset, sliderDetailTotal);
    sliderDetail.reloadSlider();
});

$('ul.bxslider.slider-detail li .btn-exit').click(function() {
    slideIndex = $(this).data('slide-index');
    sliderDetail.destroySlider();
    $('.row.first-row').show();
    $('.row.second-row').hide();
    var liSelected = 'li-img-' + slideIndex;
    var $this = $('li.' + liSelected)
    chooseThumbnailImage($this, oldIndexOverview);
});

function updateIndexSlider(newIndex, totalIndex) {
    newIndex = newIndex + 1;
    $('.box-slide-current').html(newIndex + '/' + totalIndex);
    if (newIndex == 1) {
        $('#slider-prev').addClass('deactive');
        $('#slider-next').removeClass('deactive');
    } else if (newIndex == totalIndex) {
        $('#slider-next').addClass('deactive');
        $('#slider-prev').removeClass('deactive');
    } else {
        $('#slider-prev').removeClass('deactive');
        $('#slider-next').removeClass('deactive');
    }
}

$('.next-btn').click(function() {
    var currentDetail = sliderDetail.getCurrentSlide();
    if (currentDetail != sliderDetailTotal) {
        sliderDetail.goToNextSlide();
        updateIndexSlider(currentDetail + 1, sliderDetailTotal);
    }
});

$('.prev-btn').click(function() {
    var currentDetail = sliderDetail.getCurrentSlide();
    if (currentDetail != 0) {
        sliderDetail.goToPrevSlide();
        updateIndexSlider(currentDetail - 1, sliderDetailTotal);
    }
});

