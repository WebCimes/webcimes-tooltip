/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */

// Popper
import { createPopper, Placement, Instance } from '@popperjs/core';

/**
 * Options
 */
interface Options {
	/** Element (selector sting or HTMLElement) */
	element: string | HTMLElement | NodeList | null;
	/** Choose tooltip placement */
	placement: Placement;
	/** Delay before show the tooltip */
	delay: number;
	/** Duration of animation for show the tooltip */
	duration: number;
	/** Generate an arrow for the tooltip*/
	arrow: boolean;
}

/**
 * ThisTooltip
 */
interface ThisTooltip extends HTMLElement {
	/** tooltip show timeout */
	tooltipShowTimeout?: NodeJS.Timeout;
	/** tooltip hide timeout */
	tooltipHideTimeout?: NodeJS.Timeout;
	/** tooltip delay */
	tooltipDelay?: number;
	/** tooltip duration */
	tooltipDuration?: number;
	/** tooltip already show */
	tooltipAlreadyShow?: boolean;
	/** tooltip placement */
	tooltipPlacement?: Placement;
	/** tooltip arrow */
	tooltipArrow?: boolean;
	/** popper instance */
	popper?: Instance;
}
type ThisTooltipOrNull = ThisTooltip | null;

/**
 * Class WebcimesModal
 */
export class WebcimesTooltip
{
	/**
	 * Get a unique ID, related to the prefix
	 */
	private getUniqueID = (prefix: string) => {
		do
		{
			prefix += Math.floor(Math.random()*10000);
		} while (document.getElementById(prefix));
		return prefix;
	};

	/**
	 * Convert options.element to an array of HTMLElement
	 */
	private getHtmlElements = (element: Options["element"]) => {
		// Convert options.element to an array of HTMLElement
		let elements: HTMLElement[] = [];
		if(element instanceof NodeList)
		{
			elements = [...Array.from(element) as HTMLElement[]];
		}
		if(element instanceof HTMLElement)
		{
			elements = [...[element]];
		}
		if(typeof element === "string")
		{
			elements = [...Array.from(document.querySelectorAll(element)) as HTMLElement[]];
		}
		return elements;
	};

	/**
	 * Show the tooltip
	 */
	private show(thisTooltipRef: HTMLElement, thisTooltip: ThisTooltipOrNull, options: Options)
	{
		if(thisTooltip)
		{
			// Init the tooltip with the options
			thisTooltip.tooltipPlacement = (thisTooltipRef.getAttribute('data-tooltip-placement') || options.placement) as Placement;
			thisTooltip.tooltipDelay = (thisTooltipRef.getAttribute('data-tooltip-delay') || options.delay) as number;
			thisTooltip.tooltipDuration = (thisTooltipRef.getAttribute('data-tooltip-duration') || options.duration) as number;
			thisTooltip.tooltipArrow = (JSON.parse((thisTooltipRef.getAttribute('data-tooltip-arrow') || options.arrow) as string)) as boolean;
			thisTooltip.style.setProperty("--tooltip-duration", thisTooltip.tooltipDuration+"ms");
			if(thisTooltip.tooltipArrow)
			{
				if(!thisTooltip.querySelector(".arrow"))
				{
					thisTooltip.insertAdjacentHTML("beforeend", '<div class="arrow" data-popper-arrow></div>');
				}
			}

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
	 */
	private hide(thisTooltip: ThisTooltipOrNull, callback?: () => void)
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
	 * Create automatically tooltip for button
	 */
	public tooltipForButton(options: Options)
	{
		const defaults: Options = {
			element: null,
			placement: "auto",
			delay: 0,
			duration: 600,
			arrow: true,
		}
		options = {...defaults, ...options};
		
		// Convert options.element to an array of HTMLElement
		const elements = this.getHtmlElements(options.element);
		
		// For all elements
		elements.forEach((el) => {
			const thisTooltipRef = el;
			const thisTooltip: ThisTooltipOrNull = thisTooltipRef.nextElementSibling as HTMLElement | null;
			if(thisTooltip)
			{
				// add class webcimesToolTip
				thisTooltip.classList.add("webcimesTooltip");

				// Tooltip button (show)
				el.addEventListener("click", (e) => {
					// Show the tooltip
					this.show(thisTooltipRef, thisTooltip, options);
				});

				// Tooltip click outside (hide)
				document.addEventListener("click", (e) => {
					if(e.target != thisTooltipRef && (e.target as HTMLElement).closest(".webcimesTooltip") != thisTooltip)
					{
						// Hide the tooltip
						this.hide(thisTooltip);
					}
				});
			}
		});
	}

	/**
	 * Create automatically tooltip for title
	 */
	public tooltipForTitle(options: Options)
	{
		const defaults: Options = {
			element: null,
			placement: 'top',
			delay: 400,
			duration: 600,
			arrow: true,
		}
		options = {...defaults, ...options};

		// Convert options.element to an array of HTMLElement
		const elements = this.getHtmlElements(options.element);
		
		// For all elements
		elements.forEach((el) => {
			// Create data-tooltip-title attribute, and remove title attribute
			el.setAttribute("data-tooltip-title", el.getAttribute("title")!);
			el.removeAttribute("title");

			// On mouseenter / click, create tooltip title
			document.addEventListener("mouseenter", (e) => {
				let thisTooltipRef: HTMLElement | null = null;
				if(e.target == el && (e.target as HTMLElement).matches("[data-tooltip-title]"))
				{
					thisTooltipRef = e.target as HTMLElement;
				}
				else if((e.target as HTMLElement).closest(".webcimesTooltip") && (e.target as HTMLElement).id == el.getAttribute("data-tooltip-target"))
				{
					thisTooltipRef = document.querySelector("[data-tooltip-target='"+(e.target as HTMLElement).id+"']");
				}
				if(thisTooltipRef)
				{
					// If the tooltip already exist then get it, also create a new one with unique ID
					let thisTooltip: ThisTooltipOrNull = null;
					if(document.querySelector(".webcimesTooltip.title#"+thisTooltipRef.getAttribute("data-tooltip-target")))
					{
						thisTooltip = document.querySelector(".webcimesTooltip.title#"+thisTooltipRef.getAttribute("data-tooltip-target"));
					}
					else
					{
						const uniqueID = this.getUniqueID("tooltipTitle");
						thisTooltipRef.setAttribute("data-tooltip-target", uniqueID);
						document.body.insertAdjacentHTML("beforeend", '<div class="webcimesTooltip title" id="'+uniqueID+'">'+thisTooltipRef.getAttribute("data-tooltip-title")+'</div>');
						thisTooltip = document.body.lastElementChild as ThisTooltip;
					}

					// Show the tooltip
					this.show(thisTooltipRef, thisTooltip, options);
				}
			}, true);

			// On mouseleave, hide, remove and destroy tooltip title
			document.addEventListener("mouseleave", (e) => {
				let thisTooltipRef: HTMLElement | null = null;
				if((e.target as HTMLElement).matches("[data-tooltip-title]") && e.target == el)
				{
					thisTooltipRef = e.target as HTMLElement;
				}
				else if((e.target as HTMLElement).closest(".webcimesTooltip") && (e.target as HTMLElement).id == el.getAttribute("data-tooltip-target"))
				{
					thisTooltipRef = document.querySelector("[data-tooltip-target='"+(e.target as HTMLElement).id+"']");
				}
				if(thisTooltipRef)
				{
					// Get the tooltip
					const thisTooltip: ThisTooltipOrNull = document.querySelector(".webcimesTooltip.title#"+thisTooltipRef.getAttribute("data-tooltip-target"));
					
					// Hide the tooltip
					this.hide(thisTooltip, function()
					{
						// Remove tooltip target attribute
						thisTooltipRef!.removeAttribute("data-tooltip-target");

						// Remove the tooltip
						thisTooltip?.remove();
					});
				}
			}, true);
		});
	}
}