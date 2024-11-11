// Import webcimes-tooltip
import { WebcimesTooltip } from "../dist/js/webcimes-tooltip.esm.js";

// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    // Basic title example + Basic title example with html
    document.querySelectorAll("[title]").forEach((el) => {
        const tooltipTitle1 = new WebcimesTooltip({
            type: "title", 
            element: el,
            style: "background:red; color:blue;",
        });
    });

    // Basic title with content element
    const tooltipTitle2 = new WebcimesTooltip({
        type: "title",
        element: document.querySelector("#titleWithContentEl"),
        contentElement: document.querySelector("#myContent1"),
    });

    // Basic tooltip example
    const tooltipButton1 = new WebcimesTooltip({
        type: "button",
        element: document.querySelector("#myButton"),
        setId: "IDButton",
        style: "background:red; color:blue;",
        ariaLabel: "My aria label", 
        afterShow: function() {
            this.element.remove();
        },
    });

    // Basic tooltip example with content element
    const tooltipButton2 = new WebcimesTooltip({
        type: "button",
        element: document.querySelector("#myButtonWithContentEl"),
        contentElement: document.querySelector("#myContent2"),
    });

});