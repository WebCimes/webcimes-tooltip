// Import webcimes-tooltip
import { CreateWebcimesTooltip } from "../dist/js/webcimes-tooltip.esm.js";

// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    // Set tooltip button
    const tooltipButton = CreateWebcimesTooltip({
        type: "button", // Type (button tooltip or title tooltip), default "button"
        element: document.querySelector("button"), // Element (selector string or HTMLElement) for the tooltip
        content: null, // Content element (selector string or HTMLElement) for the content of the tooltip, default null
        setId: null, // set a specific class on the tooltip, default "null"
        setClass: null, // set a specific id on the tooltip. default "null"
        placement: "bottom", // Choose tooltip placement, default "bottom" for type "button" and "top" for type "title"
        delay: 0, // Delay before show the tooltip, default 0
        duration: 600, // Duration of animation for show the tooltip, default 600
        arrow: true, // Generate an arrow for the tooltip, default true
        style: null, // add extra css style to tooltip, default null
        beforeShow: () => {console.log("before show");}, // callback before show tooltip
        afterShow: () => {console.log("after show");}, // callback after show tooltip
        beforeHide: () => {console.log("before hide");}, // callback before hide tooltip
        afterHide: () => {console.log("after hide");}, // callback after hide tooltip
    });

    // Set tooltip title
    document.querySelectorAll("[title]").forEach((el) => {
        const tooltipTitle = CreateWebcimesTooltip({
            type: "title", // Type (button tooltip or title tooltip), default "button"
            element: el, // Element (selector string or HTMLElement) for the tooltip
            content: null, // Content element (selector string or HTMLElement) for the content of the tooltip, default null
            setId: null, // set a specific class on the tooltip, default "null"
            setClass: null, // set a specific id on the tooltip. default "null"
            placement: 'top', // Choose tooltip placement, default "bottom" for type "button" and "top" for type "title"
            delay: 400, // Delay before show the tooltip, default 0
            duration: 600, // Duration of animation for show the tooltip, default 600
            arrow: true, // Generate an arrow for the tooltip, default true
            style: null, // add extra css style to tooltip, default null
            hideOnHover: true, // Hide the tooltip when the mouse hover the tooltip (only for type "title"), default true
            beforeShow: () => {console.log("before show");}, // callback before show tooltip
            afterShow: () => {console.log("after show");}, // callback after show tooltip
            beforeHide: () => {console.log("before hide");}, // callback before hide tooltip
            afterHide: () => {console.log("after hide");}, // callback after hide tooltip
        });
        tooltipTitle.tooltipRef.addEventListener("beforeShow", ()=>{
            console.log("before show with addEventListener");
        })
    });

});