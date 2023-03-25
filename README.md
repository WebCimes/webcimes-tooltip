# webcimes-tooltip

Create and animate tooltips simply, for dropdowns tooltips and titles tooltips. It works with vanilla javascript + html + css and with popper dependency.

After `webcimes-tooltip` javascript set, we can just create html we need for tooltips, and all tooltips will be automatically created, even after dom change.

Popper is needed for intelligy placement of tooltips.


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
                "webcimes-tooltip": "./node_modules/webcimes-tooltip/webcimes-tooltip.js"
            }
        }
        </script>
	</head>
		...
```

## Usage

### Import stylesheet:
```html
<link rel="stylesheet" href="./node_modules/webcimes-tooltip/webcimes-tooltip.css">
```

### Import javascript module:
```javascript
import { webcimesTooltip, webcimesTooltipTitle } from "webcimes-tooltip";
```

### Call `webcimesTooltip` (for basic tooltips):
```javascript
// Wait for dom content loaded or call webcimesTooltip before the end of body
document.addEventListener("DOMContentLoaded", function()
{
	// Set basic tooltip
	webcimesTooltip({
		placement: 'auto', // optional, default "auto"
		delay: 0, // optional, default 0
		duration: 600, // optional, default 600
		arrow: true, // optional, default true
	});
});
```

### Call `webcimesTooltipTitle` (for tooltip the titles):
```javascript
// Wait for dom content loaded or call webcimesTooltipTitle before the end of body
document.addEventListener("DOMContentLoaded", function()
{
	// Set tooltip title
	webcimesTooltipTitle({
		placement: 'top', // optional, default "top"
		delay: 400, // optional, default 400
		duration: 600, // optional, default 600
		arrow: true, // optional, default true
	});
});
```

The `placement`, `delay`, `duration` and `arrow` attributes define the default attributes that will apply to all tooltips.

### Then all the basic tooltips and tooltip titles will be made automatically with just some html:

#### With webcimesTooltip

##### Basic tooltip example:
```html
<button class="webcimesTooltipButton">My button</button>
<div class="webcimesTooltip" data-tooltip-placement="auto" data-tooltip-delay="0" data-tooltip-duration="600"  data-tooltip-arrow="true">
	My content<br>
	<div style='color:red;'>red</div>
	<div style='color:blue;'>blue</div>
</div>
```

#### With webcimesTooltipTitle

#### Basic title example:
```html
<span title="My title" data-tooltip-placement="top" data-tooltip-delay="400" data-tooltip-duration="600"  data-tooltip-arrow="true">My content</span>
```

#### Basic title example without title default attribute:
```html
<span data-tooltip-title="My title" data-tooltip-placement="top" data-tooltip-delay="400" data-tooltip-duration="600" data-tooltip-arrow="true">My content</span>
```

#### Basic title example with html:
```html
<span title="My <span style='color:red;'>red</span> title<br>With some <i>html</i>" data-tooltip-placement="top" data-tooltip-delay="400" data-tooltip-duration="600" data-tooltip-arrow="true">My content</span>
```

The attribute `data-tooltip-placement`, `data-tooltip-delay`, `data-tooltip-duration` and `data-tooltip-arrow` are optionnals, and it permit to set individual options for each tooltips created.

### Style tooltips:
You can style basic tooltips or tooltip titles with `--tooltip-color`, `--tooltip-background` and `--tooltip-border-color`.

#### Style basic tooltips:
```css
.webcimesTooltip
{
	--tooltip-color: #fff;
	--tooltip-background: #222;
	--tooltip-border-color: #888;
}
```
#### Style tooltip titles:
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