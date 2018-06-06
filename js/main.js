

/*  TABLE OF CONTENTS
    ---------------------------
    1. Loading / Opening
    2. Parallax Mouse
    3. Action Buttons
    4. Scroll plugins
    5. Newsletter
    6. PhotoSwipe Gallery Init
*/

/* ------------------------------------- */
/* 1. Loading / Opening ................ */
/* ------------------------------------- */

$(window).load(function(){
    "use strict";

    setTimeout(function(){
        $('#preloader').velocity({

            opacity: "0",

            complete: function(){
                $("#loading").velocity("transition.shrinkOut", {
                    duration: 1000,
                    easing: [0.7,0,0.3,1],
                }); 
            }
        });

    },0);

    setTimeout(function(){
        $('#home-wrap').velocity("transition.fadeIn", {

            opacity : "1",

            complete: function(){

            setTimeout(function() {
                $('.text-intro').each(function(i) {
                    (function(self) {
                        setTimeout(function() {
                            $(self).addClass('animated-middle fadeInUp').removeClass('opacity-0');
                        },(i*150)+150);
                        })(this);
                    });
                }, 1200);
            }

        },

        {
            duration: 1000,
            easing: [0.7,0,0.3,1],
        });
        
    },0);

});

$(document).ready(function(){
    "use strict";

    /* ------------------------------------- */
    /* 2. Parallax Mouse ................... */
    /* ------------------------------------- */

    // var mouseX, mouseY;
    // var traX, traY;

    // $(document).mousemove(function(e){
    //     mouseX = e.pageX;
    //     mouseY = e.pageY;

    //     traX = (e.pageX * -1 / 20);
    //     traY = (e.pageY * -1 / 20);

    //     console.log(traX);

    //     $(".overlay").css({
    //         '-webkit-transform': 'translate3d(' + traX + 'px,' + traY + 'px, 0) scale(1)',
    //         '-moz-transform': 'translate3d(' + traX + 'px,' + traY + 'px, 0) scale(1)',
    //         '-ms-transform': 'translate3d(' + traX + 'px,' + traY + 'px, 0) scale(1)',
    //         '-o-transform': 'translate3d(' + traX + 'px,' + traY + 'px, 0) scale(1)',
    //         'transform': 'translate3d(' + traX + 'px,' + traY + 'px, 0) scale(1)'
    //     });
    // });

    /* ------------------------------------- */
    /* 3. Action Buttons ................... */
    /* ------------------------------------- */

    // Actions when user clicks on More Informations


    


    /* ------------------------------------- */
    /* 4. Scroll plugins ................... */
    /* ------------------------------------- */

    $(function() {
        $('body').bind('mousewheel', function(event) {
          event.preventDefault();
          var scrollTop = this.scrollTop;
          this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
          //console.log(event.deltaY, event.deltaFactor, event.originalEvent.deltaMode, event.originalEvent.wheelDelta);
        });
    });

    var ifTouchDevices = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);

    // ScrollBar on Desktop, not on Touch devices for a perfect ergonomy
    function scrollbar(){

        if (ifTouchDevices){
            $('body').addClass('scroll-touch');

            $('a#open-more-info').on( "click", function() {
                event.preventDefault();
                var target = "#" + this.getAttribute('data-target');
                $('body').animate({
                    scrollTop: $(target).offset().top
                }, 500);
            });
        } 

        else {
            $('body').mCustomScrollbar({
                scrollInertia: 150,
                axis            :"y",

                callbacks:{
                    whileScrolling:function(){
                        var pos=this.mcs.top;
                        if(pos<=-200){
                            $('.to-scroll').addClass('hide-scroll');
                        }else{
                            $('.to-scroll').removeClass('hide-scroll');
                        }
                    }
                }
        
            });  
        }
    }
  
    scrollbar();

    // Tooltips
    if (window.matchMedia("(min-width: 1025px)").matches) { 
            
        $(function () { $("[data-toggle='tooltip']").tooltip(); });

    }
});