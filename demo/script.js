// Import webcimes-tooltip
import { WebcimesTooltip } from "../dist/js/webcimes-tooltip.esm.js";
// import { WebcimesTooltip } from "webcimes-tooltip";

// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    // Set basic tooltip
    new WebcimesTooltip().webcimesTooltip({
        placement: 'auto', // optional, default "auto"
        delay: 0, // optional, default 0
        duration: 600, // optional, default 600
        arrow: true, // optional, default true
    });

    // Set tooltip title
    new WebcimesTooltip().webcimesTooltipTitle({
        placement: 'top', // optional, default "top"
        delay: 400, // optional, default 400
        duration: 600, // optional, default 600
        arrow: true, // optional, default true
    });
});