// Import webcimes-tooltip
import { WebcimesTooltip } from "../dist/js/webcimes-tooltip.esm.js";

// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    // Set tooltip button
    const tooltipButton = new WebcimesTooltip({
        type: "button", // optional - default "button"
        element: document.querySelector("button"), // element (selector string or HTMLElement)
        placement: 'auto', // optional, default "auto"
        delay: 0, // optional, default 0
        duration: 600, // optional, default 600
        arrow: true, // optional, default true
        beforeShow: () => {console.log("before show");}, // callback before show modal
        afterShow: () => {console.log("after show");}, // callback after show modal
        beforeHide: () => {console.log("before hide");}, // callback before hide modal
        afterHide: () => {console.log("after hide");}, // callback after hide modal
    });

    // Set tooltip title
    document.querySelectorAll("[title]").forEach((el) => {
        const tooltipTitle = new WebcimesTooltip({
            type: "title", // optional - default "button"
            element: el, // element (selector string or HTMLElement)
            placement: 'top', // optional, default "top"
            delay: 400, // optional, default 400
            duration: 600, // optional, default 600
            arrow: true, // optional, default true
            beforeShow: () => {console.log("before show");}, // callback before show modal
            afterShow: () => {console.log("after show");}, // callback after show modal
            beforeHide: () => {console.log("before hide");}, // callback before hide modal
            afterHide: () => {console.log("after hide");}, // callback after hide modal
        });
        tooltipTitle.tooltipRef.addEventListener("beforeShow", ()=>{
            console.log("before show with addEventListener");
        })
    });

});