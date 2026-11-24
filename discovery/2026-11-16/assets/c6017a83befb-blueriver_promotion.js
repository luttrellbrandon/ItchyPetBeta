/**
 * Blue River Promotions.
 *
 * @author Lifelearn
 */
 /* global Waypoint */
 /* global imagesLoaded */
 /* global nectar_theme_info */

jQuery(document).ready(function($) {

  "use strict";
  /*-------------------------------------------------------------------------*/
  /*	1.	Blue River Promotion Element
  /*-------------------------------------------------------------------------*/
    jQuery('.promotion-widget-carousel').owlCarousel({
        loop:true,
        nav:false,
        dots: true,
        margin:10,
        autoHeight: true,
        responsiveClass:true,
        onInitialized: setOwlStageHeight,
        onResized: setOwlStageHeight,
        onTranslated: setOwlStageHeight,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:1,
                nav:false
            },
            1000:{
                items:2,
                nav:true,
                loop:false
            }
        }
    });

    function setOwlStageHeight(event) {
        //console.log(event.target);
        var maxHeight = 0;
        $('.promotion-widget-carousel .owl-item.active').each(function () { // LOOP THROUGH ACTIVE ITEMS
            var thisHeight = parseInt( $(this).height());
            maxHeight=(maxHeight>=thisHeight?maxHeight:thisHeight);
        });
        $('.promotion-widget-carousel').css('min-height', maxHeight + 35 );
        $('.promotion-widget-carousel .owl-stage-outer').css('min-height', maxHeight + 35 ); // CORRECT DRAG-AREA SO BUTTONS ARE CLICKABLE
    }


});
