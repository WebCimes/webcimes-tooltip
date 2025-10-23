// Import webcimes-tooltip
import { createWebcimesTooltip } from '../dist/js/webcimes-tooltip.esm.js';

// Wait for dom content loaded
document.addEventListener('DOMContentLoaded', function () {
    // Basic title example + Basic title example with html
    document.querySelectorAll('[title]').forEach((el) => {
        const tooltipTitle1 = createWebcimesTooltip({
            type: 'title',
            element: el,
            style: 'background:red; color:blue;',
        });
    });

    // Basic title with content element
    document.querySelector('#myContent1 .red').addEventListener('click', function () {
        console.log('Red button clicked');
    });
    const tooltipTitle2 = createWebcimesTooltip({
        type: 'title',
        element: document.querySelector('#titleWithContentEl'),
        contentElement: document.querySelector('#myContent1'),
    });

    // Basic tooltip example
    const tooltipButton1 = createWebcimesTooltip({
        type: 'button',
        element: document.querySelector('#myButton'),
        setId: 'IDButton',
        style: 'background:red; color:blue;',
        ariaLabel: 'My aria label',
        afterShow: function () {
            // document.querySelector("#testRemove").remove();
        },
    });

    document.querySelector('.destroy')?.addEventListener('click', function () {
        tooltipButton1.destroy();
    });

    // Basic tooltip example with content element
    const tooltipButton2 = createWebcimesTooltip({
        type: 'button',
        element: document.querySelector('#myButtonWithContentEl'),
        contentElement: document.querySelector('#myContent2'),
    });
});
