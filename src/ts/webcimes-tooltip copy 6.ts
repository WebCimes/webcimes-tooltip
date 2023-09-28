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
	element: string | HTMLElement | null;
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
	 * Create tooltip
	 */
	constructor(options: Options)
	{
		// Defaults
		const defaults: Options = {
			element: null,
			placement: "auto",
			delay: 400,
			duration: 600,
			arrow: true,
		}
		this.options = {...defaults, ...options};
	}

	/** Get the dom element of the tooltip ref */
	public tooltipRef: HTMLElement | null;

	/** Get the dom element of the tooltip */
	public tooltip: ThisTooltipOrNull;

	/** Options of the current tooltip */
	private options: Options;

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
	 * Convert elements entry to an array of HTMLElement
	 */
	private getHtmlElements = (element: string | HTMLElement | NodeList | null) => {
		// Convert options.element to an array of HTMLElement
		let htmlElements: HTMLElement[] = [];
		if(element instanceof NodeList)
		{
			htmlElements = [...Array.from(element) as HTMLElement[]];
		}
		if(element instanceof HTMLElement)
		{
			htmlElements = [...[element]];
		}
		if(typeof element === "string")
		{
			htmlElements = [...Array.from(document.querySelectorAll(element)) as HTMLElement[]];
		}
		return htmlElements;
	};


	/**
	 * Convert element entry to an HTMLElement
	 */
	private getHtmlElement = (element: string | HTMLElement | null) => {
		// Convert options.element to an array of HTMLElement
		let htmlElement: HTMLElement | null = null;
		if(element instanceof HTMLElement)
		{
			htmlElement = element;
		}
		if(typeof element === "string")
		{
			htmlElement = document.querySelector(element) as HTMLElement | null;
		}
		return htmlElement;
	};

	/**
	 * Show the tooltip
	 */
	private show()
	{
		if(this.tooltipRef && this.tooltip)
		{
			// Init the tooltip with the options
			this.tooltip.tooltipPlacement = (this.tooltipRef.getAttribute('data-tooltip-placement') || this.options.placement) as Placement;
			this.tooltip.tooltipDelay = (this.tooltipRef.getAttribute('data-tooltip-delay') || this.options.delay) as number;
			this.tooltip.tooltipDuration = (this.tooltipRef.getAttribute('data-tooltip-duration') || this.options.duration) as number;
			this.tooltip.tooltipArrow = (JSON.parse((this.tooltipRef.getAttribute('data-tooltip-arrow') || this.options.arrow) as string)) as boolean;
			this.tooltip.style.setProperty("--tooltip-duration", this.tooltip.tooltipDuration+"ms");
			if(this.tooltip.tooltipArrow)
			{
				if(!this.tooltip.querySelector(".arrow"))
				{
					this.tooltip.insertAdjacentHTML("beforeend", '<div class="arrow" data-popper-arrow></div>');
				}
			}

			// Clear tooltipHideTimeout
			clearTimeout(this.tooltip.tooltipHideTimeout);

			// Create tooltipShowtimeout
			this.tooltip.tooltipShowTimeout = setTimeout(() => {

				// Show the tooltip
				this.tooltip!.classList.add('show');

				// Set that the tooltip as already show one time
				this.tooltip!.tooltipAlreadyShow = true;

			}, (this.tooltip.tooltipAlreadyShow?0:this.tooltip.tooltipDelay));
			
			// Create popper on the tooltip if doesn't exist
			if(typeof this.tooltip.popper === "undefined")
			{
				this.tooltip.popper = createPopper(this.tooltipRef, this.tooltip, {
					placement: this.tooltip.tooltipPlacement,
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
	public hide(callback?: () => void)
	{
		if(this.tooltip)
		{
			// Clear tooltipShowTimeout
			clearTimeout(this.tooltip.tooltipShowTimeout);

			// Hide the tooltip
			this.tooltip.classList.remove('show');

			// Create tooltipHideTimeout
			this.tooltip.tooltipHideTimeout = setTimeout(() => {

				// Destroy popper if exist
				if(typeof this.tooltip?.popper !== "undefined")
				{
					this.tooltip.popper.destroy();
					delete this.tooltip.popper;
				}

				// Delete variables of the tooltip element
				delete this.tooltip?.tooltipPlacement;
				delete this.tooltip?.tooltipDelay;
				delete this.tooltip?.tooltipDuration;
				delete this.tooltip?.tooltipArrow;
				delete this.tooltip?.tooltipAlreadyShow;
				delete this.tooltip?.tooltipShowTimeout;
				delete this.tooltip?.tooltipHideTimeout;
				
				// Callback
				if(typeof callback === 'function')
				{
					callback();
				}

			}, this.tooltip.tooltipDuration);
		}
	}

	/**
	 * Create automatically tooltip for button
	 */
	public tooltipForButton()
	{
		this.tooltipRef = this.getHtmlElement(this.options.element);
		this.tooltip = this.tooltipRef?.nextElementSibling as HTMLElement | null;
		if(this.tooltipRef && this.tooltip)
		{
			// add class webcimesToolTip
			this.tooltip.classList.add("webcimesTooltip");

			// Tooltip button (show)
			this.tooltipRef.addEventListener("click", (e) => {
				// Show the tooltip
				this.show();
			});

			// Tooltip click outside (hide)
			document.addEventListener("click", (e) => {
				if(e.target != this.tooltipRef && (e.target as HTMLElement).closest(".webcimesTooltip") != this.tooltip)
				{
					// Hide the tooltip
					this.hide();
				}
			});
		}
	}

	/**
	 * Create automatically tooltip for title
	 */
	public tooltipForTitle()
	{
		const element = this.getHtmlElement(this.options.element);
		if(element)
		{
			// Create data-tooltip-title attribute, and remove title attribute
			element.setAttribute("data-tooltip-title", element.getAttribute("title")!);
			element.removeAttribute("title");

			// On mouseenter / click, create tooltip title
			document.addEventListener("mouseenter", (e) => {
				this.tooltipRef = null;
				if((e.target as HTMLElement).matches("[data-tooltip-title]") && e.target == element)
				{
					this.tooltipRef = e.target as HTMLElement;
				}
				else if((e.target as HTMLElement).closest(".webcimesTooltip") && (e.target as HTMLElement).id == element.getAttribute("data-tooltip-target"))
				{
					this.tooltipRef = document.querySelector("[data-tooltip-target='"+(e.target as HTMLElement).id+"']");
				}
				if(this.tooltipRef)
				{
					// If the tooltip already exist then get it, also create a new one with unique ID
					if(document.querySelector(".webcimesTooltip.title#"+this.tooltipRef.getAttribute("data-tooltip-target")))
					{
						this.tooltip = document.querySelector(".webcimesTooltip.title#"+this.tooltipRef.getAttribute("data-tooltip-target"));
					}
					else
					{
						const uniqueID = this.getUniqueID("tooltipTitle");
						this.tooltipRef.setAttribute("data-tooltip-target", uniqueID);
						document.body.insertAdjacentHTML("beforeend", '<div class="webcimesTooltip title" id="'+uniqueID+'">'+this.tooltipRef.getAttribute("data-tooltip-title")+'</div>');
						this.tooltip = document.body.lastElementChild as ThisTooltipOrNull;
					}

					// Show the tooltip
					this.show();
				}
			}, true);

			// On mouseleave, hide, remove and destroy tooltip title
			document.addEventListener("mouseleave", (e) => {
				this.tooltipRef = null;
				if((e.target as HTMLElement).matches("[data-tooltip-title]") && e.target == element)
				{
					this.tooltipRef = e.target as HTMLElement;
				}
				else if((e.target as HTMLElement).closest(".webcimesTooltip") && (e.target as HTMLElement).id == element.getAttribute("data-tooltip-target"))
				{
					this.tooltipRef = document.querySelector("[data-tooltip-target='"+(e.target as HTMLElement).id+"']");
				}
				if(this.tooltipRef)
				{
					// Get the tooltip
					this.tooltip = document.querySelector(".webcimesTooltip.title#"+this.tooltipRef.getAttribute("data-tooltip-target"));
					
					// Hide the tooltip
					this.hide(() =>
					{
						// Remove tooltip target attribute
						this.tooltipRef?.removeAttribute("data-tooltip-target");

						// Remove the tooltip
						this.tooltip?.remove();
					});
				}
			}, true);
		}
	}
}