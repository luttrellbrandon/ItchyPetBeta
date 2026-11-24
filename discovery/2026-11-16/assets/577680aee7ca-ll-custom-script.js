(function ($) {
    /****************************************************************
     PET HEALTH ARTICLES - Resize images based on width attribute
     **************************************************************** */
    $(function () {
        // Get pet health images
        var petHealthContainer = $('#pethealth-wrap');
        var petHealthImages = petHealthContainer.find('img[width]');

        // Resize images to appropriate width
        petHealthImages.each(function () {
            var image = $(this);
            var imageWidth = image.attr('width');
            if (imageWidth > 0) {
                image.width(imageWidth);
            }
        });
    });

    /****************************************************************
     PET ARTICLE SEARCH - UI actions
     **************************************************************** */
    $(function () {
        function clearButtonState() {
            let active = false;
            $('.top-search-bar .hwrapper select').each(function() {
                if($(this).val()!=="0") {
                    $("#btn-clear-article-search-filters").addClass("active");
                    active = true;
                }
            });
            if(!active)  $("#btn-clear-article-search-filters").removeClass("active");
        }
        clearButtonState();
        // Drop down actions
        $('.top-search-bar .hwrapper select').change(function() {
            let link = $(this).attr('data-mainlink') + $(this).val();
            window.location = link;
            clearButtonState();
        });
        // Clear filter button
        $("#btn-clear-article-search-filters").click(function() {
            $(this).removeClass('active');
            //just clear UX
            $('.top-search-bar .hwrapper select').each(function() {
                //rewrite the mainlink data for each select without filter values
                $(this).attr('data-mainlink',$(this).data('mainlink').substring(0,$(this).data('mainlink').indexOf('?')+1));
            });
            if($('#btn-dog-breeds').length) {
                $('#btn-dog-breeds').attr('data-mainlink', $("#btn-dog-breeds").data('mainlink').substring(0, $("#btn-dog-breeds").data('mainlink').indexOf('&') + 1));
            }
            //revert selector indexes and reset classes
            $('#btn-dog-breeds').removeClass('active');
            $('.top-search-bar .hwrapper select').prop('selectedIndex',0).removeClass('selected');
            $('.top-search-bar .hwrapper select').find('.option').removeClass('selected');
            //set input values to 0
            $('input[name="ps"],input[name="pb"],input[name="pt"],input[name="pl"],input[name="ul"]').val("0");
            //...or reload page
            //let link = $(this).data('link');
            //window.location = link;
        });
        //dog breeds button
        $("#btn-dog-breeds").click(function() {
            let link = $(this).attr("data-mainlink");
            let keyword = encodeURIComponent($('input[name="pk"]').val());
            if(keyword!=="") link+="&amp;pk="+keyword;
            console.debug("DB link: " + link);
            window.location = link;
        })
    });
     /****************************************************************
     ASYMMETRIC ELEMENT
     **************************************************************** */
    $(function () {
        var asymmetricElements = $('.lifelearn-asymmetric-element');

        $(window).on('load', function () {
            initializeElements(500);
        });

        $(window).on('resize', function () {
            initializeElements(0);
        });

        function initializeElements(animationSpeed) {
            $.each(asymmetricElements, function () {
                var element = $(this);
                var imageOnTop = element.hasClass('image-top-left') || element.hasClass('image-top-right');
                var image = element.find('.lifelearn-asymmetric-image');
                var content = element.find('.lifelearn-asymmetric-content');

                // Calculate content offset
                var contentTopOffset = 0;
                if (content.outerHeight() < (image.height() / 3) + 16) {
                    contentTopOffset = (image.height() / 3 * 2) + ((image.height() / 3) - content.outerHeight() + 16);
                } else {
                    contentTopOffset = image.height() / 3 * 2;
                }

                // Calculate element height with content offset
                var elementHeight = image.height() + (content.outerHeight() - (image.height() - contentTopOffset));

                // Animate element changes
                content.animate({
                    width: image.width(),
                    opacity: 1
                }, animationSpeed);

                if (imageOnTop) {
                    element.animate({
                        paddingBottom: elementHeight - image.height()
                    }, animationSpeed);
                    content.animate({
                        top: contentTopOffset
                    }, animationSpeed);
                } else {
                    element.animate({
                        paddingTop: elementHeight - image.height()
                    }, animationSpeed);
                    content.animate({
                        bottom: contentTopOffset
                    }, animationSpeed);
                }
            })
        }
    });

    /****************************************************************
     POPOVER LINK
     **************************************************************** */
    $(function () {
        // Initialize popover links
        var links = $('[data-toggle="lifelearn-link-popover"]');
        links.popover({
            container: '#ajax-content-wrap',
            content: function () {
                return $($(this).data('content-target')).html();
            },
            delay: {
                show: 400,
                hide: 600
            },
            html: true,
            placement: function (node, link) {
                var header = $('#header-outer');
                var domRect = $(link)[0].getBoundingClientRect();
                return domRect.top > 256 + header.outerHeight() ? 'top' : 'bottom';
            },
            template: '<div class="popover" role="tooltip"><div class="popover-content"></div></div>',
            trigger: 'hover'
        });

        // Disable popover from appearing on click
        links.on('click', function () {
            var link = $(this);
            link.popover('hide');
        })
    });

    /****************************************************************
     VC SINGLE IMAGE
     **************************************************************** */
    $(function () {
        var singleImageWraps = $(
            '.img-with-aniamtion-wrap[data-lifelearn-hover-style="3"], ' +
            '.img-with-aniamtion-wrap[data-lifelearn-hover-style="5"]'
        );
        $.each(singleImageWraps, function () {
            var singleImageWrap = $(this);

            var singleImageContainer = singleImageWrap.closest('.vc_column-inner');

            // Trigger hover effects when column link present
            var columnLink = singleImageContainer.siblings('a.column-link');
            columnLink.on('mouseenter', function () {
                var link = $(this);
                var imageWrap = link.siblings('.vc_column-inner').find('.img-with-aniamtion-wrap');
                imageWrap.addClass('lifelearn-hover-active');
            });
            columnLink.on('mouseleave', function () {
                var link = $(this);
                var imageWrap = link.siblings('.vc_column-inner').find('.img-with-aniamtion-wrap');
                imageWrap.removeClass('lifelearn-hover-active');
            });

            // Move 'overflow: hidden' style from element to containing row
            // when image max width is greater than 100%
            var imageMaxWidth = parseInt(singleImageWrap.data('max-width'));
            if (imageMaxWidth > 100) {
                var imageOverlay = singleImageWrap.find('.lifelearn-image-hover-overlay');
                imageOverlay.closest('.inner').css('position', 'relative');
                imageOverlay.next('.img-with-animation').css('paddingRight', '0');
                singleImageWrap.css('overflow', 'visible');
                singleImageWrap.closest('.col.span_12').css('overflow', 'hidden');
            }
        });
    });

    /****************************************************************
     VC COLUMN - Adjust image size if necessary
     **************************************************************** */
    $(function () {
        var columns = $('.wpb_column[data-lifelearn-hover-style]');
        $.each(columns, function () {
            var column = $(this);
            var columnImage = column.find('.lifelearn-column-image');
            if (columnImage.length > 0) {
                updateColumnImageClass(column, columnImage);

                $(window).on('resize', function () {
                    updateColumnImageClass(column, columnImage);
                })
            }
        });

        /**
         * Update column image class depending on column aspect ratio
         *
         * @param column
         * @param columnImage
         */
        function updateColumnImageClass(column, columnImage) {
            if (calculateAspectRatio(column) > calculateAspectRatio(columnImage)) {
                updateColumnImageClassToTall(columnImage);
            } else {
                updateColumnImageClassToWide(columnImage);
            }
        }

        /**
         * Update column image class so that it fills its containing column's width
         *
         * @param columnImage
         */
        function updateColumnImageClassToTall(columnImage) {
            columnImage.addClass('lifelearn-column-image-tall');
            columnImage.removeClass('lifelearn-column-image-wide');
        }

        /**
         * Update column image class so that it fills its containing column's height
         *
         * @param columnImage
         */
        function updateColumnImageClassToWide(columnImage) {
            columnImage.addClass('lifelearn-column-image-wide');
            columnImage.removeClass('lifelearn-column-image-tall');
        }

        /**
         * Returns the aspect ratio of the specified element
         *
         * @param element
         * @returns {number}
         */
        function calculateAspectRatio(element) {
            return element.outerWidth() / element.outerHeight();
        }
    });

    /****************************************************************
     LAYOUT COMPONENTS
     **************************************************************** */
    $(function () {
        var ajaxContentWrap = $('#ajax-content-wrap');

        var headerComponent = $('#lifelearn-layout-header-container');
        if (headerComponent.length > 0) {
            // Remove negative top margin from header component
            removeTopMarginFromFirstSection(headerComponent);

            // Move header component below page header or first slider
            var pageHeader = $('#page-header-wrap');
            var firstSlider = $(
                '.wpb_row.full-width-content .nectar-slider-wrap, ' +
                '.wpb_row.full-width-section .nectar-slider-wrap, ' +
                '.wpb_row.full-width-content .col.span_12 .wpb_revslider_element, ' +
                '.wpb_row.full-width-section .col.span_12 .wpb_revslider_element'
            ).first();
            if (pageHeader.length > 0) {
                headerComponent.insertAfter(pageHeader);
            } else if (firstSlider.length > 0) {
                var sliderRow = firstSlider.closest('.wpb_row');
                headerComponent.insertAfter(sliderRow);
            }

            var nextContainerWrap = headerComponent.next('.container-wrap, .page-header-no-bg');
            ajaxContentWrap.css('background-color', nextContainerWrap.css('background-color'));

            // Remove negative top margin from following content container or page header (w/o bg)
            var cwMarginTop = parseInt(nextContainerWrap.css('margin-top'));
            if (cwMarginTop < 0) {
                nextContainerWrap.css('margin-top', '0');
            }

            // Add top padding to content container
            var cwPaddingTop = parseInt(nextContainerWrap.css('padding-top'));
            if (cwPaddingTop === 0 && !firstContainerRowIsFullWidth(nextContainerWrap)) {
                nextContainerWrap.css('padding-top', '');
            }
        }

        var footerComponent = $('#lifelearn-layout-footer-container');
        if (footerComponent.length > 0) {
            // Remove negative top margin from footer component
            removeTopMarginFromFirstSection(footerComponent);

            var prevContainerWrap = footerComponent.prev('.container-wrap');
            ajaxContentWrap.css('background-color', prevContainerWrap.css('background-color'));

            // Add bottom padding to content container
            var cwPaddingBottom = parseInt(prevContainerWrap.css('padding-bottom'));
            if (cwPaddingBottom === 0 && !lastContainerRowIsFullWidth(prevContainerWrap)) {
                prevContainerWrap.css('padding-bottom', '');
            }
        }

        /**
         * Check if first section in first row is full width
         *
         * @param container
         */
        function firstContainerRowIsFullWidth(container) {
            var firstSection = container.find('.container.main-content > .row:first-child > .wpb_row:first-child');
            return firstSection.is('.full-width-content') || firstSection.is('.full-width-section');
        }

        /**
         * Check if last section in last row is full width
         *
         * @param container
         */
        function lastContainerRowIsFullWidth(container) {
            var lastSection = container.find('.container.main-content > .row:last-child > .wpb_row:last-child');
            return lastSection.is('.full-width-content') || lastSection.is('.full-width-section');
        }

        /**
         * Remove the negative top margin in the first section in a header or
         * footer layout component
         *
         * @param component
         */
        function removeTopMarginFromFirstSection(component) {
            var firstSection = component.find('.row > .first-section');
            var marginTop = parseInt(firstSection.css('margin-top'));
            if (marginTop < 0) {
                firstSection.css('margin-top', '');
            }
        }
    });

    /* ****************************************************************
     * VC COLUMN - Sticky column feature
     * **************************************************************** */
    $(function () {
        // Loop through columns with sticky option enabled
        var stickyColumns = $('[data-lifelearn-sticky="true"]');
        stickyColumns.each(function (index) {
            var stickyColumn = $(this);

            // Reposition sticky column on page load if page has scrolled and if on desktop
            if ($(window).scrollTop() > 0 && $(window).width() >= 1000) {
                repositionStickyColumn(stickyColumn);
            }

            // Reposition sticky column on page scroll/resize, or remove sticky if on mobile
            $(window).on('scroll resize', function () {
                if ($(window).width() >= 1000) {
                    repositionStickyColumn(stickyColumn);
                } else {
                    removeStickyFromColumn(stickyColumn);
                }
            });
        });

        /**
         * Reposition sticky column (or remove sticky from column) depending on several calculated factors
         *
         * @param stickyColumn
         */
        function repositionStickyColumn(stickyColumn) {
            // Get sticky column height
            var stickyColumnHeight = stickyColumn.outerHeight();

            // Determine positions where column should be sticky
            var stickyColumnContainer = stickyColumn.parent('.col.span_12');
            var stickyColumnStartPosition = stickyColumnContainer.offset().top;
            var stickyColumnEndPosition = stickyColumnStartPosition + stickyColumnContainer.outerHeight();

            // Calculate site header height
            var headerHeight = $('#header-secondary-outer').outerHeight()
                + $('#header-outer').outerHeight()
                + $('.sticky-wrapper > .page-submenu').outerHeight();

            // Calculate how much page has scrolled down
            var wpAdminBar = $('#wpadminbar');
            var wpAdminBarHeight = wpAdminBar.outerHeight();
            var scrollOffset = $(window).scrollTop() + wpAdminBarHeight;

            // Position column or remove sticky feature based on calculated factors above
            if (headerHeight + scrollOffset + stickyColumnHeight > stickyColumnEndPosition) {
                // Stick to bottom
                addStickyToColumn(stickyColumn, {
                    position: 'absolute',
                    top: '',
                    bottom: '0'
                });
            } else if (headerHeight + scrollOffset >= stickyColumnStartPosition) {
                // Stick to top
                addStickyToColumn(stickyColumn, {
                    position: 'fixed',
                    top: headerHeight + wpAdminBarHeight,
                    bottom: ''
                });
            } else {
                // Remove sticky
                removeStickyFromColumn(stickyColumn);
            }
        }

        /**
         * Add sticky feature to specified column.
         *
         * @param stickyColumn
         * @param css
         */
        function addStickyToColumn(stickyColumn, css) {
            // Add sticky column placeholder
            var stickyColumnPlaceholder = stickyColumn.prev('.lifelearn-sticky-column-placeholder');
            if (stickyColumnPlaceholder.length === 0) {
                stickyColumnPlaceholder = addStickyColumnPlaceholder(stickyColumn);
            }

            // Calculate column left position
            css.left = css.position === 'fixed' ?
                stickyColumnPlaceholder.offset().left - parseFloat(stickyColumnPlaceholder.css('margin-left')) :
                stickyColumnPlaceholder.position().left;

            // Add sticky CSS to column
            stickyColumn.css('width', stickyColumnPlaceholder[0].getBoundingClientRect().width);
            stickyColumn.css('position', css.position);
            stickyColumn.css('top', css.top);
            stickyColumn.css('bottom', css.bottom);
            stickyColumn.css('left', css.left);
            setColumnMargin(stickyColumn, getColumnMargin(stickyColumnPlaceholder));
            setColumnPadding(stickyColumn, getColumnPadding(stickyColumnPlaceholder));

            // Fix CSS on sticky column container
            stickyColumn.parent('.flip-in-vertical-wrap').css('perspective', 'none');
            stickyColumn.parent('.flip-in-vertical-wrap').css('-webkit-perspective', 'none');
        }

        /**
         * Removes sticky feature from specified column.
         *
         * @param stickyColumn
         */
        function removeStickyFromColumn(stickyColumn) {
            // Remove sticky column placeholder
            var stickyColumnPlaceholder = stickyColumn.prev('.lifelearn-sticky-column-placeholder');
            if (stickyColumnPlaceholder.length > 0) {
                stickyColumnPlaceholder.remove();
            }

            // Remove sticky CSS from column
            stickyColumn.css('width', '');
            stickyColumn.css('position', '');
            stickyColumn.css('top', '');
            stickyColumn.css('bottom', '');
            stickyColumn.css('left', '');
            stickyColumn.css('margin', '');
            stickyColumn.css('padding', '');

            // Add CSS to sticky column container
            stickyColumn.parent('.flip-in-vertical-wrap').css('perspective', '');
            stickyColumn.parent('.flip-in-vertical-wrap').css('-webkit-perspective', '');
        }

        /**
         * Add placeholder column to take original position of sticky column. This is
         * to prevent the layout from breaking when the sticky column position changes.
         *
         * @param stickyColumn
         */
        function addStickyColumnPlaceholder(stickyColumn) {
            // Add placeholder column immediately before sticky column
            stickyColumn.before('<div class="lifelearn-sticky-column-placeholder"></div>');

            // Add the same classes from the sticky column to the placeholder column
            var stickyColumnPlaceholder = stickyColumn.prev('.lifelearn-sticky-column-placeholder');
            stickyColumnPlaceholder.addClass(stickyColumn[0].className);

            return stickyColumnPlaceholder;
        }

        /**
         * Get margin from specified column
         *
         * @param column
         * @returns {{top, left, right, bottom}}
         */
        function getColumnMargin(column) {
            return {
                top: column.css('margin-top'),
                left: column.css('margin-left'),
                right: column.css('margin-right'),
                bottom: column.css('margin-bottom')
            }
        }

        /**
         * Set margin on specified column
         *
         * @param columnsetColumnMargin
         * @param margin
         */
        function setColumnMargin(column, margin) {
            column.css('margin-top', margin.top);
            column.css('margin-left', margin.left);
            column.css('margin-right', margin.right);
            column.css('margin-bottom', margin.bottom);
        }

        /**
         * Get padding from specified column
         *
         * @param column
         * @returns {{top, left, right, bottom}}
         */
        function getColumnPadding(column) {
            return {
                top: column.css('padding-top'),
                left: column.css('padding-left'),
                right: column.css('padding-right'),
                bottom: column.css('padding-bottom')
            }
        }

        /**
         * Set padding on specified column
         *
         * @param column
         * @param padding
         */
        function setColumnPadding(column, padding) {
            column.css('padding-top', padding.top);
            column.css('padding-left', padding.left);
            column.css('padding-right', padding.right);
            column.css('padding-bottom', padding.bottom);
        }
    });

    /* ****************************************************************
     * VC PAGE SUBMENU
     * **************************************************************** */
    $(function () {
        // Fix top position CSS if necessary
        var wpAdminBar = $('#wpadminbar');
        var secondaryHeader = $('#header-secondary-outer');
        var primaryHeader = $('#header-outer');

        var pageSubmenu = $('.page-submenu').first();

        if (pageSubmenu.length > 0) {
            $(window).on('load scroll', function () {
                // Calculate header height
                var headerHeight = wpAdminBar.outerHeight() +
                    secondaryHeader.outerHeight() +
                    primaryHeader.outerHeight();

                // Get Page Submenu top position
                var pageSubmenuOffset = pageSubmenu.position().top;

                // Adjust top CSS rule if necessary
                if (pageSubmenuOffset > headerHeight) {
                    pageSubmenu.css('top', headerHeight + 'px');
                }
            });


            // Link hover CSS must be applied using JS to overwrite !important rule
            var hoverColor = pageSubmenu.data('link-hover-color');
            if (hoverColor && hoverColor !== 'inherit') {
                var links = pageSubmenu.find('ul li a');

                // Change link color on hover
                links.on('mouseenter', function () {
                    $(this).attr('style', 'color: ' + hoverColor + ' !important;');
                });
                links.on('mouseleave', function () {
                    $(this).css('color', '');
                });
            }


            // Set link separator color from data attribute
            var separatorColor = pageSubmenu.data('separator-color');
            pageSubmenu.find('li').css('border-color', separatorColor);
        }
    });

    /* WOS-734: Added some javascript to control where the logo goes when on centered logo theme */
    function centerLogoBetweenMenu(){
        //Get the breakpoint for mobile
        var breakpoint = $('body').attr('data-header-breakpoint');

        //Calc where to put the logo by getting the number of menu items dividing by two, rounding down and subtracting 1.
        var menuItem = Math.floor($('header nav .sf-menu > .menu-item').length/2) - 1;

        //Get the middle menu item, this is where the theme puts the logo space
        var element = $('#header-outer[data-format="centered-logo-between-menu"] nav >ul.sf-menu > li:eq('+menuItem+')');

        //Get the position of the middle menu item from the left side
        var position = element.position().left;

        //Get the value of the right margin of the middle menu item as an int
        var margin = parseInt(element.css('margin-right'));

        //Get the width of the logo image
        var widthImage = $('a#logo img').width();

        //Calculate the offset by subtracting the image width from the margin and dividing by two
        var offset = (margin - widthImage)/2;

        //Get the width of the middle menu item
        var widthMenu = element.width();

        //Check to see if the window is smaller than the mobile breakpoint
        if ($(window).width() > breakpoint){
            //If it isn't and the menu is in desktop mode add the position to the width and a 7.5px
            //gutter so the logo is between the middle and next menu item
            $('#header-outer[data-format="centered-logo-between-menu"] a#logo').parent().css('left', position + widthMenu + offset);
        } else {
            //If it isn't and the menu is in mobile mode, place the logo at the left side
            $('#header-outer[data-format="centered-logo-between-menu"] a#logo').parent().css('left', 0);
        }
    }

    /*Salient 10.5 comes with responsive feature to handle the logo itself. this method call is commented by Prince in orded to fix WDVM-385 copy current issue url WEB7- Logo is not in center*/
    /*$(window).on('load resize', function () {
        if($('#header-outer').attr('data-format') === 'centered-logo-between-menu'){
            centerLogoBetweenMenu();
        }
    });*/


})(jQuery);
