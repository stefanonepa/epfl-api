﻿'use strict';
$(function () {    
    $('.copy-key').on('click', function (e) {
        var el = $(this).parent().parent().children().eq(1);
        clip(el[0].value);
        //document.execCommand('copy');
        console.log("copy done!");
    });
    
    function clip(text) {
        var copyElement = document.createElement('input');
        copyElement.setAttribute('type', 'text');
        copyElement.setAttribute('value', text);
        copyElement = document.body.appendChild(copyElement);
        copyElement.select();
        try {
            document.execCommand('copy');
        } catch (e) {
            copyElement.remove();
            console.log("document.execCommand('copy'); is not supported");
            prompt('Copy the text below. (ctrl c, enter)', text);
        } finally {
            if (typeof e == 'undefined') {
                copyElement.remove();
            }
        }
    }
});