(function ($) {
    // Remove visible top padding from .container-wrap (above iFrame)
    $(document).ready(function () {
        // Check that iframe exists
        var iframe = $('.pet-insurance-info-iframe');
        if (iframe.length === 0) {
            return;
        }

        // Check if required elements exists
        var header = $('#header-outer');
        var containerWrap = $('.page-template-template-pet-insurance-info .container-wrap');
        if (header.length === 0 || containerWrap.length === 0) {
            return;
        }

        var containerWrapTopOffset = containerWrap.offset().top;
        var containerWrapTopPadding = parseInt(containerWrap.css('padding-top'));
        var headerOuterBottomOffset = header.offset().top + header.outerHeight();
        var iframeTopOffset = containerWrapTopOffset + containerWrapTopPadding;

        if (iframeTopOffset > headerOuterBottomOffset) {
            var newContainerWrapTopPadding = (iframeTopOffset - headerOuterBottomOffset) + 'px';
            containerWrap.css('padding-top', newContainerWrapTopPadding);
        }
    });

    // Trigger iFrame Resizer
    $(document).ready(function () {
        var iframe = $('.pet-insurance-info-iframe');
        
        iframe.load(function () {
            iframe.iFrameResize();
            iframe[0].iFrameResizer.sendMessage(
                '{ "url": "' + location.href + '", "site_name": "' + (pii !== undefined ? pii.site_name : '') + '" }',
                iframe.attr('src')
            );
        });
    });
})(jQuery);
