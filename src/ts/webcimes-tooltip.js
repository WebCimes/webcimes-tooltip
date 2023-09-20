/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */

// Popper
import { createPopper } from '@popperjs/core';

/**
 * Get a unique ID, related to the prefix
 * @param {String} prefix 
 * @returns 
 */
const getUniqueID = prefix => {
	do
	{
		prefix += Math.floor(Math.random()*10000);
	} while (document.getElementById(prefix));
	return prefix;
};

/**
 * Show the tooltip
 * @param {HTMLElement} thisTooltipRef 
 * @param {HTMLElement} thisTooltip 
 */
function tooltipShow(thisTooltipRef, thisTooltip)
{
	if(thisTooltip)
	{
		// Clear tooltipHideTimeout
		clearTimeout(thisTooltip.tooltipHideTimeout);

		// Create tooltipShowtimeout
		thisTooltip.tooltipShowTimeout = setTimeout(() => {

			// Show the tooltip
			thisTooltip.classList.add('show');

			// Set that the tooltip as already show one time
			thisTooltip.tooltipAlreadyShow = true;

		}, (thisTooltip.tooltipAlreadyShow?0:thisTooltip.tooltipDelay));
		
		// Create popper on the tooltip if doesn't exist
		if(typeof thisTooltip.popper === "undefined")
		{
			thisTooltip.popper = createPopper(thisTooltipRef, thisTooltip, {
				placement: thisTooltip.tooltipPlacement,
				strategy: 'absolute',
				modifiers:
				[
					{
						name: 'offset',
						options:
						{
							offset: [0, 10],
						},
					},
				],
			});
		}
	}
}

/**
 * Hide the tooltip
 * @param {HTMLElement} thisTooltip
 * @param {Function} callback
 */
function tooltipHide(thisTooltip, callback)
{
	if(thisTooltip)
	{
		// Clear tooltipShowTimeout
		clearTimeout(thisTooltip.tooltipShowTimeout);

		// Hide the tooltip
		thisTooltip.classList.remove('show');

		// Create tooltipHideTimeout
		thisTooltip.tooltipHideTimeout = setTimeout(() => {

			// Destroy popper if exist
			if(typeof thisTooltip.popper !== "undefined")
			{
				thisTooltip.popper.destroy();
				delete thisTooltip.popper;
			}

			// Delete variables of the tooltip element
			delete thisTooltip.tooltipPlacement;
			delete thisTooltip.tooltipDelay;
			delete thisTooltip.tooltipDuration;
			delete thisTooltip.tooltipArrow;
			delete thisTooltip.tooltipAlreadyShow;
			delete thisTooltip.tooltipShowTimeout;
			delete thisTooltip.tooltipHideTimeout;
			
			// Callback
			if(typeof callback === 'function')
			{
				callback();	
			}

		}, thisTooltip.tooltipDuration);
	}
}

/**
 * Create automatically tooltip
 * @param {Object} options
 * @param {String} options.placement
 * @param {Number} options.delay
 * @param {Number} options.duration
 * @param {Boolean} options.arrow
 */
export function webcimesTooltip(options)
{
	let defaults = {
		placement: "auto",
		delay: 0,
		duration: 600,
		arrow: true,
	}
	options = {...defaults, ...options};
	
	// Tooltip button (show)
	document.addEventListener("click", (e) => {
		/** @type {HTMLElement} */
		const thisTooltipRef = e.target.closest(".webcimesTooltipButton");
		if(thisTooltipRef)
		{
			const thisTooltip = thisTooltipRef.nextElementSibling;
			thisTooltip.tooltipPlacement = (thisTooltip.getAttribute('data-tooltip-placement') || options.placement);
			thisTooltip.tooltipDelay = (thisTooltip.getAttribute('data-tooltip-delay') || options.delay);
			thisTooltip.tooltipDuration = (thisTooltip.getAttribute('data-tooltip-duration') || options.duration);
			thisTooltip.tooltipArrow = JSON.parse(thisTooltip.getAttribute('data-tooltip-arrow') || options.arrow);
			thisTooltip.style.setProperty("--tooltip-duration", thisTooltip.tooltipDuration+"ms");
			if(thisTooltip.tooltipArrow)
			{
				if(!thisTooltip.querySelector(".arrow"))
				{
					thisTooltip.insertAdjacentHTML("beforeend", '<div class="arrow" data-popper-arrow></div>');
				}
			}
	
			// Show the tooltip
			tooltipShow(thisTooltipRef, thisTooltip);
		}
	});

	// Tooltip click outside (hide)
	document.addEventListener("click", () => {
		document.querySelectorAll(".webcimesTooltip.show:not(.title)").forEach(thisTooltip => {
			// Hide the tooltip
			tooltipHide(thisTooltip);
		});
	});
}

/**
 * Create automatically tooltip title
 * @param {Object} options
 * @param {String} options.placement
 * @param {Number} options.delay
 * @param {Number} options.duration
 * @param {Boolean} options.arrow
 */
export function webcimesTooltipTitle(options)
{
	let defaults = {
		placement: 'top',
		delay: 400,
		duration: 600,
		arrow: true,
	}
	options = {...defaults, ...options};

	// Create data-tooltip-title attribute, and remove title attribute
	document.querySelectorAll("[title]").forEach(element => {
		element.setAttribute("data-tooltip-title", element.getAttribute("title"));
		element.removeAttribute("title");
	});

	// On mouseenter / click, create tooltip title
	document.addEventListener("mouseenter", (e) => {
		if(e.target.matches && e.target.matches("[data-tooltip-title]"))
		{
			/** @type {HTMLElement} */
			const thisTooltipRef = e.target;
			
			// If the tooltip already exist then get it, also create a new one with unique ID
			let thisTooltip = null;
			if(document.querySelector(".webcimesTooltip.title#"+thisTooltipRef.getAttribute("data-tooltip-target")))
			{
				thisTooltip = document.querySelector(".webcimesTooltip.title#"+thisTooltipRef.getAttribute("data-tooltip-target"));
			}
			else
			{
				const uniqueID = getUniqueID("tooltipTitle");
				thisTooltipRef.setAttribute("data-tooltip-target", uniqueID);
				document.body.insertAdjacentHTML("beforeend", '<div class="webcimesTooltip title" id="'+uniqueID+'">'+thisTooltipRef.getAttribute("data-tooltip-title")+'</div>');
				thisTooltip = document.body.lastElementChild;
				thisTooltip.tooltipPlacement = (thisTooltipRef.getAttribute('data-tooltip-placement') || options.placement);
				thisTooltip.tooltipDelay = (thisTooltipRef.getAttribute('data-tooltip-delay') || options.delay);
				thisTooltip.tooltipDuration = (thisTooltipRef.getAttribute('data-tooltip-duration') || options.duration);
				thisTooltip.tooltipArrow = JSON.parse(thisTooltipRef.getAttribute('data-tooltip-arrow') || options.arrow);
				thisTooltip.style.setProperty("--tooltip-duration", thisTooltip.tooltipDuration+"ms");
				if(thisTooltip.tooltipArrow)
				{
					if(!thisTooltip.querySelector(".arrow"))
					{
						thisTooltip.insertAdjacentHTML("beforeend", '<div class="arrow" data-popper-arrow></div>');
					}
				}
1			}

			// Show the tooltip
			tooltipShow(thisTooltipRef, thisTooltip);
		}
	}, true);

	// On mouseleave, hide, remove and destroy tooltip title
	document.addEventListener("mouseleave", (e) => {
		if(e.target.matches && e.target.matches("[data-tooltip-title]"))
		{
			/** @type {HTMLElement} */
			const thisTooltipRef = e.target;

			// Get the tooltip
			const thisTooltip = document.querySelector(".webcimesTooltip.title#"+thisTooltipRef.getAttribute("data-tooltip-target"));
			
			// Hide the tooltip
			tooltipHide(thisTooltip, function()
			{
				// Remove tooltip target attribute
				thisTooltipRef.removeAttribute("data-tooltip-target");

				// Remove the tooltip
				thisTooltip.remove();
			});
		}
	}, true);
}