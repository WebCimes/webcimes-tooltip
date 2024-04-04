/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */

// Floating ui
import { computePosition, autoUpdate, Placement, offset, flip, shift, limitShift, arrow } from '@floating-ui/dom';

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
	/** Type (button tooltip or title tooltip), default "button" */
	type: "button" | "title";
	/** Element (selector string or HTMLElement) */
	element: string | HTMLElement | null;
	/** set a specific id on the tooltip. default "null" */
	setId: string | null;
	/** set a specific class on the tooltip, default "null" */
	setClass: string | null;
	/** Choose tooltip placement, default "bottom" for type "button" and "top" for type "title" */
	placement: Placement;
	/** Delay before show the tooltip, default 0 for type "button" and 400 for type "title" */
	delay: number;
	/** Duration of animation for show the tooltip, default 600 */
	duration: number;
	/** Generate an arrow for the tooltip, default true */
	arrow: boolean;
	/** add extra css style to tooltip, default null */
	style: string | null;
	/** Hide the tooltip when the mouse hover the tooltip (only for type "title"), default true */
	hideOnHover: boolean;
	/** callback before show tooltip */
	beforeShow(): void;
	/** callback after show tooltip */
	afterShow(): void;
	/** callback before destroy tooltip */
	beforeHide(): void;
	/** callback after destroy tooltip */
	afterHide(): void;
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
	/** tooltip hide on hover */
	tooltipHideOnHover?: boolean;
	/** cleanUp floating ui */
	cleanUpFloatingUi?: () => void;
}
// type ThisTooltipOrNull = ThisTooltip | null;

/**
 * Class WebcimesTooltip
 */
export class WebcimesTooltip
{
	/** Get the dom element of the tooltip ref */
	public tooltipRef: HTMLElement | null;

	/** Get the dom element of the tooltip */
	public tooltip: ThisTooltip;
	
	/** Get the dom element of the tooltip arrow */
	public tooltipArrow: HTMLElement | null;

	/** Options of the current tooltip */
	private options: Options;

	/**
	 * Create tooltip
	 */
	constructor(options: Partial<Options>)
	{
		// Defaults
		const defaults: Options = {
			type: "button",
			element: null,
			setId: null,
			setClass: null,
			placement: (options.type && options.type=="title" ? "top" : "bottom"),
			delay: (options.type && options.type=="title" ? 400 : 0),
			duration: 600,
			arrow: true,
			style: null,
			hideOnHover: true,
			beforeShow: () => {},
			afterShow: () => {},
			beforeHide: () => {},
			afterHide: () => {},
		}
		this.options = {...defaults, ...options};

		// Bind "this" to all events
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onTransitionEndOnShow = this.onTransitionEndOnShow.bind(this);
		
		// Call init method
		this.init();
	}

	/**
	 * Convert elements entry to an array of HTMLElement
	 */
	private getHtmlElements(element: string | HTMLElement | NodeList | null)
	{
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
	}

	/**
	 * Convert element entry to an HTMLElement
	 */
	private getHtmlElement(element: string | HTMLElement | null)
	{
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
	}

	/**
	 * Get a unique ID, related to the identifier
	 * @param selectorPrefix Prefix of the selector
	 * @param identifier Identifier to find
	 * @param selectorSuffix Suffix of the selector
	 * @param element Find if the ID already exist in provided dom element
	 */
	private getUniqueID(selectorPrefix: string, identifier: string, selectorSuffix: string = "", element: HTMLElement | Document | DocumentFragment | null = null)
	{
		// If element is null, set document
		element = element ?? document;
		
		// Generate a unique ID
		do
		{
			identifier += Math.floor(Math.random()*10000);
		} while (element.querySelector(selectorPrefix + identifier + selectorSuffix));
		
		return identifier;
	}

	/**
	 * Initialization of the current tooltip
	 */
    private init()
	{
		// Define tooltipRef
		this.tooltipRef = this.getHtmlElement(this.options.element);

		// Add class webcimes-tooltip-ref
		this.tooltipRef?.classList.add("webcimes-tooltip-ref");

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
	 * Show the tooltip
	 */
	public show()
	{
		if(this.tooltipRef && this.tooltip)
		{
			// If the tooltip doesn't already exist then add a new one on the dom
			if(!document.querySelector(`#${this.tooltipRef!.getAttribute("data-tooltip-target")}`))
			{
				document.body.insertAdjacentHTML("beforeend", this.tooltip!.outerHTML);
				this.tooltip = document.body.lastElementChild as ThisTooltip;
			}

			// Init the tooltip with the options
			this.tooltip.tooltipPlacement = (this.tooltipRef.getAttribute('data-tooltip-placement') || this.options.placement) as Placement;
			this.tooltip.tooltipDelay = (this.tooltipRef.getAttribute('data-tooltip-delay') || this.options.delay) as number;
			this.tooltip.tooltipDuration = (this.tooltipRef.getAttribute('data-tooltip-duration') || this.options.duration) as number;
			this.tooltip.tooltipArrow = (JSON.parse((this.tooltipRef.getAttribute('data-tooltip-arrow') || this.options.arrow) as string)) as boolean;
			this.tooltip.tooltipHideOnHover = (JSON.parse((this.tooltipRef.getAttribute('data-tooltip-hide-on-hover') || this.options.hideOnHover) as string)) as boolean;
			this.tooltip.style.setProperty("--tooltip-duration", this.tooltip.tooltipDuration+"ms");
			if(this.tooltip.tooltipArrow)
			{
				if(!this.tooltip.querySelector(".webcimes-tooltip__arrow"))
				{
					this.tooltip.insertAdjacentHTML("beforeend", '<div class="webcimes-tooltip__arrow"></div>');
				}
				this.tooltipArrow = this.tooltip.querySelector(".webcimes-tooltip__arrow");
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
				this.tooltip.classList.add('webcimes-tooltip--show');

				// If type is button
				if(this.options.type == "button")
				{
					// Set aria-expended to true on the tooltipRef 
					this.tooltipRef!.setAttribute("aria-expended", "true");

					// Set focus on the tooltip
					this.tooltip.focus();

					// Event keydown on the tooltip
					this.tooltip.addEventListener("keydown", this.onKeyDown);
				}
				// If type is title
				else if(this.options.type == "title")
				{
					// Set focus on the tooltipRef
					// this.tooltipRef!.focus();
				}

				// Set that the tooltip as already show one time
				this.tooltip.tooltipAlreadyShow = true;

			}, (this.tooltip.tooltipAlreadyShow?0:this.tooltip.tooltipDelay));

			// Callback after show tooltip
			this.tooltip.addEventListener("transitionend", this.onTransitionEndOnShow);

			// Create floatingUi on the tooltip if doesn't exist
			if(typeof this.tooltip.cleanUpFloatingUi === "undefined")
			{
				let options = 
				{
					placement: this.tooltip.tooltipPlacement,
					middleware: [
						offset(10), // offset between tooltip ref and tooltip
						shift({ // shift before flip for prevent wrong final placement
							padding: 10, // padding between tooltip and viewport
							limiter: limitShift({ // prevent detachtment from tooltipRef
    							offset: 30, // Start limiting 30px earlier
							}),
						}),
						flip({ // Automatically flip the tooltip on scroll or resize
							fallbackPlacements: ['top', 'bottom', 'left', 'right'],
							padding: 10, // padding between tooltip and edge of the boundary before flip
						}),
					],
				};
				if(this.tooltipArrow)
				{
					options.middleware.push(arrow({
						element: this.tooltipArrow!,
						padding: 10, // padding arrow from the edges of the tooltip
					}));
				}
				
				this.tooltip.cleanUpFloatingUi = autoUpdate(this.tooltipRef, this.tooltip, () => {
					computePosition(this.tooltipRef!, this.tooltip, options).then(({x, y, middlewareData, placement}) => {
						this.tooltip.setAttribute("data-tooltip-placement", placement);
						Object.assign(this.tooltip.style, {
							left: `${x}px`,
							top: `${y}px`,
						});
						if(this.tooltipArrow && middlewareData.arrow)
						{
							const arrowLen = this.tooltipArrow.offsetWidth;
							const side = placement.split("-")[0];
							const staticSide = {
								top: "bottom",
								right: "left",
								bottom: "top",
								left: "right"
							}[side]!;
							const { x, y } = middlewareData.arrow;
							
							Object.assign(this.tooltipArrow.style, {
								left: x != null ? `${x}px` : "",
								top: y != null ? `${y}px` : "",
								right: "",
								bottom: "",
								[staticSide]: `${-arrowLen / 2}px`,
							});
						}
					});
				});
			}
		}
	}

	/**
	 * Hide the tooltip
	 */
	public hide(callback?: () => void)
	{
		// If the tooltip exist then remove it
		if(this.tooltip && document.querySelector(`#${this.tooltipRef!.getAttribute("data-tooltip-target")}`))
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

			// If type is a button
			if(this.options.type == "button")
			{
				// Set aria-expended to false on the tooltipRef if type is button
				this.tooltipRef!.setAttribute("aria-expended", "false");

				// Set focus on the tooltipRef
				this.tooltipRef!.focus();

				// Destroy event keydown on the tooltip
				this.tooltip.removeEventListener("keydown", this.onKeyDown);
			}
			
			// Destroy all events
			this.tooltip.removeEventListener("transitionend", this.onTransitionEndOnShow);

			// Create tooltipHideTimeout
			this.tooltip.tooltipHideTimeout = setTimeout(() => {

				// Destroy floatingUi if exist
				if(typeof this.tooltip?.cleanUpFloatingUi !== "undefined")
				{
					this.tooltip.cleanUpFloatingUi();
					delete this.tooltip.cleanUpFloatingUi;
				}

				// Delete variables of the tooltip element
				delete this.tooltip?.tooltipPlacement;
				delete this.tooltip?.tooltipDelay;
				delete this.tooltip?.tooltipDuration;
				delete this.tooltip?.tooltipArrow;
				delete this.tooltip?.tooltipHideOnHover;
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
	 * Create automatically tooltip for button
	 */
	private tooltipForButton()
	{
		if(this.tooltipRef)
		{
			// Tooltip ID
			const tooltipID = (this.options.setId ? this.options.setId : this.getUniqueID("#", "tooltip-"));

			// Set attributes to the tooltipRef
			this.tooltipRef!.setAttribute("data-tooltip-target", tooltipID);
			this.tooltipRef!.setAttribute("role", "button");
			this.tooltipRef!.setAttribute("aria-expended", "false");
			this.tooltipRef!.setAttribute("aria-haspopup", "dialog");
			this.tooltipRef!.setAttribute("tabindex", "0");

			// Create tooltip element without adding it to the dom
			let tooltip = document.createElement("template");
			tooltip.innerHTML = 
			`<div class="webcimes-tooltip webcimes-tooltip--button ${(this.options.setClass?this.options.setClass:``)}" id="${tooltipID}" ${(this.options.style?`style="${this.options.style}"`:``)} role="dialog" tabindex="0">
				${this.tooltipRef.nextElementSibling?.outerHTML}
			</div>`;
			this.tooltip = tooltip.content.firstChild as HTMLElement;

			// Remove origin tooltip node
			this.tooltipRef.nextElementSibling?.remove();

			// Event click on the tooltipRef
			this.tooltipRef.addEventListener("click", () => {
				// Show the tooltip
				this.show();
			});

			// Event keydown on the tooltipRef
			this.tooltipRef.addEventListener("keydown", (e) => {
				if(e.key == "Enter" || e.key == " ")
				{
					e.preventDefault();

					// Show the tooltip
					this.show();
				}
			});

			// Event click and keydown outside the tooltipRef and tooltip
			['click', 'keydown'].forEach((typeEvent) => {
				document.addEventListener(typeEvent, (e) => {
					if(
						(e.target as HTMLElement).closest(".webcimes-tooltip-ref") != this.tooltipRef &&
						(e.target as HTMLElement).closest(".webcimes-tooltip") != this.tooltip
					)
					{
						// Hide the tooltip
						this.hide(() =>
						{
							// Remove the tooltip
							this.tooltip?.remove();
						});
					}
				});
			});
		}
	}

	/**
	 * Create automatically tooltip for title
	 */
	private tooltipForTitle()
	{
		if(this.tooltipRef)
		{
			// Tooltip ID
			const tooltipID = (this.options.setId ? this.options.setId : this.getUniqueID("#", "tooltip-"));

			// Create data-tooltip-title attribute, and remove title attribute
			this.tooltipRef.setAttribute("data-tooltip-title", this.tooltipRef.getAttribute("title")!);
			this.tooltipRef.removeAttribute("title");
			this.tooltipRef.setAttribute("aria-describedby", tooltipID);

			// Create tooltip element without adding it to the dom
			this.tooltipRef!.setAttribute("data-tooltip-target", tooltipID);
			let tooltip = document.createElement("template");
			tooltip.innerHTML = 
			`<div class="webcimes-tooltip webcimes-tooltip--title ${(this.options.setClass?this.options.setClass:``)}" id="${tooltipID}" ${(this.options.style?`style="${this.options.style}"`:``)} role="tooltip">
				${this.tooltipRef!.getAttribute("data-tooltip-title")}
			</div>`;
			this.tooltip = tooltip.content.firstChild as HTMLElement;

			// Current status on hover
			let tooltipHover = false;

			// On mouseenter / click, create tooltip title
			document.addEventListener("mouseenter", (e) => {
				if(e.target == this.tooltipRef || (!this.tooltip.tooltipHideOnHover && e.target == this.tooltip))
				{
					tooltipHover = true;

					// Show the tooltip
					this.show();
				}
			}, true);

			// On mouseleave, hide, remove and destroy tooltip title
			document.addEventListener("mouseleave", (e) => {
				if(e.target == this.tooltipRef || (!this.tooltip.tooltipHideOnHover && e.target == this.tooltip))
				{
					tooltipHover = false;

					// Hide the tooltip
					this.hide(() =>
					{
						// Remove the tooltip
						this.tooltip?.remove();
					});
				}
			}, true);

			// Event focus on the tooltipRef
			this.tooltipRef.addEventListener("focus", () => {
				// Show the tooltip
				this.show();
			});

			// Event focusout on the tooltipRef
			this.tooltipRef.addEventListener("focusout", (e) => {
				if(!tooltipHover)
				{
					// Hide the tooltip
					this.hide(() =>
					{
						// Remove the tooltip
						this.tooltip?.remove();
					});
				}
			});

			// Event keydown on the tooltipRef
			this.tooltipRef.addEventListener("keydown", (e) => {
				if(e.key == "Escape")
				{
					e.preventDefault();

					// Hide the tooltip
					this.hide(() =>
					{
						// Remove the tooltip
						this.tooltip?.remove();
					});
				}
			});
		}
	}

	/** Event tooltip keydown */
	private onKeyDown(e: KeyboardEvent)
	{
		if(e.key == "Escape" || e.key == "Tab")
		{
			e.preventDefault();

			// Hide the tooltip
			this.hide(() =>
			{
				// Remove the tooltip
				this.tooltip?.remove();
			});
		}
	}

	/** Event tooltip opacity transition end on show class */
	private onTransitionEndOnShow(e: TransitionEvent)
	{
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
	}
}