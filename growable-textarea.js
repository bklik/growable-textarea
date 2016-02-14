/***********************************************************************
Growable Textarea Directive
Author: Brenton Klik

Prerequisites:
 - AngularJS
 - styleSheetFactory (https://github.com/bklik/styleSheetFactory)

Description:
Allows the height of the textarea to always match the height of
the content.
/**********************************************************************/
angular.module('growable-textarea-directive', ['style-sheet-factory'])

    .directive('growableTextarea', ['$log', 'styleSheetFactory', function($log, styleSheetFactory) {
        return {
            scope: {},
            restrict: 'A',
            link: function($scope, $element, $attrs) {
                if($element[0].nodeName !== 'TEXTAREA') {
                    $log.error('The growable-textarea attribute directive can only be used on a textarea element.');
                    return null;
                }

                // Get the border eight of the textarea element.
                var style = window.getComputedStyle($element[0], null);
                var borderOffset = parseInt(style['border-top-width']) + parseInt(style['border-bottom-width']);

                // Resize the textarea to be the height of its content, plus any border height.
                var changeHandler = function(event) {
                    $element[0].style.height = '0px';
                    var textHeight = $element[0].scrollHeight;
                    $element[0].style.height = textHeight + borderOffset + 'px';
                };

                // Reize the textarea on any event that may change the content.
                $element.bind('keydown', changeHandler);
                $element.bind('keyup', changeHandler);
                $element.bind('change', changeHandler);
                $element.bind('paste', changeHandler);

                // Default the hight of the textarea to one row.
                $element[0].rows = 1;

                // The document's stylesheet.
                var styleSheet = styleSheetFactory.getStyleSheet();

                // Add this directive's styles to the document's stylesheet.
                styleSheetFactory.addCSSRule(styleSheet, 'textarea[growable-textarea]',
                    'box-sizing: border-box;' +
                    'overflow: hidden;' + 
                    'resize: none;'
                );
            }
        }
    }]);
