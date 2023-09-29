# webcimes-tooltip

Create and animate tooltips simply, for dropdowns tooltips and titles tooltips. It works with vanilla javascript + html + css and with popper dependency.

Popper is needed for intelligy placement of tooltips.

Once the `webcimes-tooltip` javascript is defined, we can simply call the WebcimesTooltip class with the desired options.

## Installation

Use the package manager npm to install webcimes-tooltip.

```bash
npm install webcimes-tooltip
```

### ESM
Compared to JS bundlers (like Webpack), using ESM in the browser requires you to use the full path and filename instead of the module name.
You can use an importmap to resolve the arbitrary module names to complete paths (not needed if you use JS bundlers):
```html
<html>
    <head>
		...
        <script type="importmap">
        {
            "imports": {
                "@popperjs/core": "./node_modules/@popperjs/core/dist/esm/index.js",
                "webcimes-tooltip": "./node_modules/webcimes-tooltip/dist/js/webcimes-tooltip.esm.js"
            }
        }
        </script>
	</head>
	...
```

Then import javascript module:
```javascript
import { WebcimesTooltip } from "webcimes-tooltip";
```

Or you can also set the full path directly in the import:
```html
<html>
    <head>
		...
		<script type="module">
			// Import webcimes-tooltip
			import { WebcimesTooltip } from "./node_modules/webcimes-tooltip/dist/js/webcimes-tooltip.esm.js";
			...
		</script>
	</head>
	...
```

Or with JS bundlers (like Webpack) you can call directly the module :
```javascript
import { WebcimesTooltip } from "webcimes-tooltip";
```

### UDM
You can directly load the udm module in the script tag:
```html
<html>
    <head>
		...
        <script src="./node_modules/webcimes-tooltip/dist/js/webcimes-tooltip.udm.js" type="text/javascript"></script>
	</head>
	...
```

### Import stylesheet:
```html
<link rel="stylesheet" href="./node_modules/webcimes-tooltip/dist/css/webcimes-tooltip.css">
```

## Usage

### Call `WebcimesTooltip` for create tooltip:
```javascript
// Wait for dom content loaded or call webcimesTooltip before the end of body
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
    });
});
```

### Type of tooltip:
The `type` option can be set to `button` or `title`:
- if set to `button` it will be used as drop-down tooltip, also immediately after the button we need to set the drop-down tooltip that will be used by the button:
```html
<button data-tooltip-placement="auto" data-tooltip-delay="0" data-tooltip-duration="600" data-tooltip-arrow="true">My button</button>
<div>
	My tooltip content
</div>
```
- If set to `title`, the module will automatically replace the `title` attribute with `data-tooltip-title`.
```html
<span title="My title" data-tooltip-placement="top" data-tooltip-delay="400" data-tooltip-duration="600" data-tooltip-arrow="true">My content</span>
```

### Other options:
The `placement`, `delay`, `duration` and `arrow` attributes define the default attributes that will apply to all tooltips.

### HTML data attribute options:
The attribute `data-tooltip-placement`, `data-tooltip-delay`, `data-tooltip-duration` and `data-tooltip-arrow` are optionnals, and it permit to set individual options for each tooltips created. Or you can also define this option directly from the js instance `WebcimesTooltip`.

### Get dom element
You can get the dom element of the current tooltip like this:

```javascript
// Get the instance
const myTooltip = new WebcimesTooltip(...);

// Things

// Then get the dom element of the current tooltip
myTooltip.tooltip;
```

Or you can get the reference element of the tooltip (used on `element` option):

```javascript
// Get the instance
const myTooltip = new WebcimesTooltip(...);

// Things

// Then get the dom reference element of the current tooltip
myTooltip.tooltipRef;
```

But with the option `type` set to `title` only `myTooltip.tooltipRef` will work (because the `tooltip` title is created on mouse-in and destroyed on mouse-out).

### Events:
Multiple events exist, which allow to interact with the tooltip at each step. You can use all events below: 

```javascript
const tooltip = new WebcimesTooltip({
	beforeShow: () => {console.log("before show");}, // callback before show modal
	afterShow: () => {console.log("after show");}, // callback after show modal
	beforeHide: () => {console.log("before hide");}, // callback before hide modal
	afterHide: () => {console.log("after hide");}, // callback after hide modal
});
```

You can also use `addEventListener` for get the events from the instance like this:

```javascript
// Get the instance
const myTooltip = new WebcimesTooltip(...);

// Create an event on the current tooltip
myTooltip.tooltipRef.addEventListener("afterHide", () => {
	console.log("after hide");
});
// Create an event on the current tooltip
myTooltip.tooltip.addEventListener("afterHide", () => {
	console.log("after hide");
});
```
You can use `myTooltip.tooltipRef` or `myTooltip.tooltip` to attach it to `addEventListener`, both will have the same effect.
But with the option `type` set to `title` only `myTooltip.tooltipRef` will work to attach it to `addEventListener` (because the `tooltip` title is created on mouse-in and destroyed on mouse-out).

### Style tooltips:
You can style tooltips with `--tooltip-color`, `--tooltip-background` and `--tooltip-border-color`.

#### Style all tooltips:
```css
.webcimesTooltip
{
	--tooltip-color: #fff;
	--tooltip-background: #222;
	--tooltip-border-color: #888;
}
```

#### Style only tooltip button:
```css
.webcimesTooltip.title
{
	--tooltip-color: #fff;
	--tooltip-background: #222;
	--tooltip-border-color: #888;
}
```

#### Style only tooltip title:
```css
.webcimesTooltip.title
{
	--tooltip-color: #fff;
	--tooltip-background: #222;
	--tooltip-border-color: #888;
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)