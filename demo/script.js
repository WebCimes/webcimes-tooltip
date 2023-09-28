// Import webcimes-tooltip
import { WebcimesTooltip } from "../dist/js/webcimes-tooltip.esm.js";
// import { WebcimesTooltip } from "webcimes-tooltip";

// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    // Set basic tooltip
    let test = new WebcimesTooltip({
        type: "button",
        element: document.querySelector("button"),
        placement: 'auto', // optional, default "auto"
        delay: 0, // optional, default 0
        duration: 600, // optional, default 600
        arrow: true, // optional, default true
    });

    // Set tooltip title
    document.querySelectorAll("[title]").forEach((el) => {
        let yop = new WebcimesTooltip({
            type: "title",
            element: el,
            placement: 'top', // optional, default "top"
            delay: 400, // optional, default 400
            duration: 600, // optional, default 600
            arrow: true, // optional, default true
            beforeShow: () => {
                console.log("before show");
            }
        });
        // console.log(yop.tooltipRef);
        document.addEventListener("click", ()=>{
            // test.hide();
            yop.hide();
        })
    });

});