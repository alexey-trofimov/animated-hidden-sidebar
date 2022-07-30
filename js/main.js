/*
Main js file
main.js v1.0
*/

( function( $ ) {
	'use strict';
	$( document ).ready( function() {

		var $html = $( 'html' ),
			$body = $( 'body' );


		/*
		Function: Show/hide sidebar
		----------------------------------------------------
		*/

		function showHideSidebar() {

			var viewportHasVerticalScrollbar = function() {
				return $html[0].scrollHeight > $html[0].clientHeight; // true or false
			};

			var $showSidebar = $( '.mw-show-hidden-sidebar' ),
				$hideSidebar = $( '.mw-hide-sidebar' ),
				sidebarVisibleCssClass = 'mw-hidden-sidebar-shown',
				scrollbarWidth = getScrollbarWidth();

			// show sidebar
			$showSidebar.on( 'click', function() {
				if ( ! $body.hasClass( sidebarVisibleCssClass ) ) {
					// add the "mw-hidden-sidebar-shown" class to the body element to show the sidebar
					$body.addClass( sidebarVisibleCssClass );
					// hide the scrollbar if it exists on the page
					if ( viewportHasVerticalScrollbar() ) {
						// additional styles for the body element:
						$body.css( {
							'overflow-y': 'hidden', // remove scrollbar
							'margin-right': scrollbarWidth, // add an extra offset to smooth out the content animation
						} );
						// additional styles for the "Show Sidebar" panel:
						$showSidebar.css( {
							'margin-right': scrollbarWidth, // add an extra offset to smooth out the sidebar opening animation
						} );
					}
				}
			} );

			// function: hide sidebar
			var hideVisibleSidebar = function() {
				// remove the "mw-hidden-sidebar-shown" class from the body element to hide the sidebar
				$body.removeClass( sidebarVisibleCssClass );
				// remove additional styles after animation is complete (300 milliseconds)
				if ( viewportHasVerticalScrollbar() ) {
					setTimeout( function() {
						// additional styles for the body element:
						$body.css( {
							'overflow-y': 'auto', // show scrollbar
							'margin-right': 0,
						} );
						// additional styles for the "Show Sidebar" panel:
						$showSidebar.css( {
							'margin-right': 0,
						} );
					}, 300 );
				}
			};

			// hide sidebar (clicking on the Close button and on the Gray Overlay)
			$hideSidebar.on( 'click', function() {
				if ( $body.hasClass( sidebarVisibleCssClass ) ) {
					hideVisibleSidebar();
				}
			} );

			// hide sidebar (pressing the Escape key)
			$( document ).on( 'keyup', function( e ) {
				if ( 'Escape' === e.key && $body.hasClass( sidebarVisibleCssClass ) ) {
					hideVisibleSidebar();
				}
			} );

		}

		showHideSidebar();


		/*
		Function: Get scrollbar width

		Description:
		We create two blocks with different sizes. Then we place the second block inside the first one.
		After that, we calculate the inner width of the first block without a scrollbar and with a scrollbar.
		The difference between the two different widths of the first block will be equal to the width of the scrollbar.
		The temporary blocks are then removed.
		----------------------------------------------------
		*/

		function getScrollbarWidth() {

			var block1 = $( '<div>' ).css( { 'width': '50px', 'height': '50px' } ),
				block2 = $( '<div>' ).css( { 'height': '200px' } ),
				width1,
				width2,
				result;

			// scrollbar width calculation
			$body.append( block1.append( block2 ) );
			width1 = $( 'div', block1 ).innerWidth();
			block1.css( 'overflow-y', 'scroll' );
			width2 = $( 'div', block1 ).innerWidth();
			$( block1 ).remove();
			result = width1 - width2; // scrollbar width

			// return result
			return result;

		}

		// Display the value of the scrollbar width in the console
		// console.log( 'Scrollbar Width = ' + getScrollbarWidth() );

	} );
} )( jQuery );
