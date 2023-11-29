/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */

// Popper
import { createPopper, Placement, Instance } from '@popperjs/core';

/**
 * Global
 */
declare global {
	/** Events */
	interface GlobalEventHandlersEventMap {
		beforeShow: CustomEvent;
		afterShow: CustomEvent;
		beforeHide: CustomEvent;
		afterHide: CustomEvent;
	}
}

/**
 * Options
 */
interface Options {
	/** Type (button tooltip or title tooltip) */
	type: "button" | "title";
	/** Element (selector string or HTMLElement) */
	element: string | HTMLElement | null;
	/** Choose tooltip placement */
	placement: Placement;
	/** Delay before show the tooltip */
	delay: number;
	/** Duration of animation for show the tooltip */
	duration: number;
	/** Generate an arrow for the tooltip*/
	arrow: boolean;
	/** callback before show tooltip */
	beforeShow: () => void;
	/** callback after show tooltip */
	afterShow: () => void;
	/** callback before destroy tooltip */
	beforeHide: () => void;
	/** callback after destroy tooltip */
	afterHide: () => void;
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
// type ThisTooltipOrNull = ThisTooltip | null;

/**
 * Class WebcimesTooltip
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
			type: "button",
			element: null,
			placement: "auto",
			delay: 400,
			duration: 600,
			arrow: true,
			beforeShow: () => {},
			afterShow: () => {},
			beforeHide: () => {},
			afterHide: () => {},
		}
		this.options = {...defaults, ...options};

		// Call init method
		this.init();
	}

	/** Get the dom element of the tooltip ref */
	public tooltipRef: HTMLElement | null;

	/** Get the dom element of the tooltip */
	public tooltip: ThisTooltip;

	/** Options of the current tooltip */
	private options: Options;

	/** Event tooltip opacity transition end on show class */
	private eventTransitionEndOnShow: (e: TransitionEvent) => void = (e) => {
		if(this.tooltip.classList.contains("webcimes-tooltip--show") && e.propertyName == "opacity")
		{
			// Callback after show tooltip
			this.tooltipRef!.dispatchEvent(new CustomEvent("afterShow"));
			this.tooltip.dispatchEvent(new CustomEvent("afterShow"));
			if(typeof this.options.afterShow === 'function')
			{
				this.options.afterShow();
			}
		}
	};

	/**
	 * Get a unique ID, related to the prefix
	 */
	private getUniqueID = (prefix: string) => {
		do
		{
			prefix += Math.floor(Math.random()*10000);
		} while (document.querySelector("[data-tooltip-target='"+prefix+"']"));
		
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
	public show()
	{
		if(this.tooltipRef && this.tooltip)
		{
			// For the type "title", if the tooltip doesn't already exist then add a new one on the dom
			if(this.options.type == "title" && !document.querySelector(".webcimes-tooltip--title#"+this.tooltipRef!.getAttribute("data-tooltip-target")))
			{
				document.body.insertAdjacentHTML("beforeend", this.tooltip!.outerHTML);
				this.tooltip = document.body.lastElementChild as ThisTooltip;
			}

			// Init the tooltip with the options
			this.tooltip.tooltipPlacement = (this.tooltipRef.getAttribute('data-tooltip-placement') || this.options.placement) as Placement;
			this.tooltip.tooltipDelay = (this.tooltipRef.getAttribute('data-tooltip-delay') || this.options.delay) as number;
			this.tooltip.tooltipDuration = (this.tooltipRef.getAttribute('data-tooltip-duration') || this.options.duration) as number;
			this.tooltip.tooltipArrow = (JSON.parse((this.tooltipRef.getAttribute('data-tooltip-arrow') || this.options.arrow) as string)) as boolean;
			this.tooltip.style.setProperty("--tooltip-duration", this.tooltip.tooltipDuration+"ms");
			if(this.tooltip.tooltipArrow)
			{
				if(!this.tooltip.querySelector(".webcimes-tooltip__arrow"))
				{
					this.tooltip.insertAdjacentHTML("beforeend", '<div class="webcimes-tooltip__arrow" data-popper-arrow></div>');
				}
			}

			// Clear tooltipHideTimeout
			clearTimeout(this.tooltip.tooltipHideTimeout);

			// Create tooltipShowtimeout
			this.tooltip.tooltipShowTimeout = setTimeout(() => {
				// Callback before show tooltip (set a timeout of zero, to wait for some dom to load)
				if(!this.tooltip.tooltipAlreadyShow)
				{
					setTimeout(() => {
						this.tooltipRef!.dispatchEvent(new CustomEvent("beforeShow"));
						this.tooltip.dispatchEvent(new CustomEvent("beforeShow"));
						if(typeof this.options.beforeShow === 'function')
						{
							this.options.beforeShow();
						}
					}, 0);
				}

				// Show the tooltip
				this.tooltip!.classList.add('webcimes-tooltip--show');

				// Set that the tooltip as already show one time
				this.tooltip!.tooltipAlreadyShow = true;

			}, (this.tooltip.tooltipAlreadyShow?0:this.tooltip.tooltipDelay));

			// Callback after show tooltip
			this.tooltip.addEventListener("transitionend", this.eventTransitionEndOnShow);

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
			// Callback before hide tooltip
			this.tooltipRef!.dispatchEvent(new CustomEvent("beforeHide"));
			this.tooltip.dispatchEvent(new CustomEvent("beforeHide"));
			if(typeof this.options.beforeHide === 'function')
			{
				this.options.beforeHide();
			}

			// Clear tooltipShowTimeout
			clearTimeout(this.tooltip.tooltipShowTimeout);

			// Hide the tooltip
			this.tooltip.classList.remove('webcimes-tooltip--show');
			
			// Destroy all events
			this.tooltip.removeEventListener("transitionend", this.eventTransitionEndOnShow);

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

				// Callback after hide tooltip
				this.tooltipRef!.dispatchEvent(new CustomEvent("afterHide"));
				this.tooltip.dispatchEvent(new CustomEvent("afterHide"));
				if(typeof this.options.afterHide === 'function')
				{
					this.options.afterHide();
				}
				
				// Callback
				if(typeof callback === 'function')
				{
					callback();
				}

			}, this.tooltip.tooltipDuration);
		}
	}

	/**
	 * Initialization of the current tooltip
	 */
    private init()
	{
		// Define tooltipRef
		this.tooltipRef = this.getHtmlElement(this.options.element);

		// Init type button
		if(this.options.type == "button")
		{
			this.tooltipForButton();
		}
		// Init type title
		else if(this.options.type == "title")
		{
			this.tooltipForTitle();
		}
	};

	/**
	 * Create automatically tooltip for button
	 */
	private tooltipForButton()
	{
		if(this.tooltipRef)
		{
			this.tooltip = this.tooltipRef.nextElementSibling as HTMLElement;
			if(this.tooltipRef && this.tooltip)
			{
				// add class webcimes-tooltip
				this.tooltip.classList.add("webcimes-tooltip", "webcimes-tooltip--button");

				// Tooltip button (show)
				this.tooltipRef.addEventListener("click", (e) => {
					// Show the tooltip
					this.show();
				});

				// Tooltip click outside (hide)
				document.addEventListener("click", (e) => {
					if(e.target != this.tooltipRef && (e.target as HTMLElement).closest(".webcimes-tooltip") != this.tooltip)
					{
						// Hide the tooltip
						this.hide();
					}
				});
			}
		}
	}

	/**
	 * Create automatically tooltip for title
	 */
	private tooltipForTitle()
	{
		if(this.tooltipRef)
		{
			// Create data-tooltip-title attribute, and remove title attribute
			this.tooltipRef.setAttribute("data-tooltip-title", this.tooltipRef.getAttribute("title")!);
			this.tooltipRef.removeAttribute("title");

			// Create tooltip element without adding it to the dom
			const uniqueID = this.getUniqueID("tooltipTitle");
			
			this.tooltipRef!.setAttribute("data-tooltip-target", uniqueID);
			let tooltip = document.createElement("template");
			tooltip.innerHTML = '<div class="webcimes-tooltip webcimes-tooltip--title" id="'+uniqueID+'">'+this.tooltipRef!.getAttribute("data-tooltip-title")+'</div>';
			this.tooltip = tooltip.content.firstChild as HTMLElement;

			// On mouseenter / click, create tooltip title
			document.addEventListener("mouseenter", (e) => {
				if(e.target == this.tooltipRef || e.target == this.tooltip)
				{
					// Show the tooltip
					this.show();
				}
			}, true);

			// On mouseleave, hide, remove and destroy tooltip title
			document.addEventListener("mouseleave", (e) => {
				if(e.target == this.tooltipRef || e.target == this.tooltip)
				{
					// Hide the tooltip
					this.hide(() =>
					{
						// Remove the tooltip
						this.tooltip?.remove();
					});
				}
			}, true);
		}
	}
}