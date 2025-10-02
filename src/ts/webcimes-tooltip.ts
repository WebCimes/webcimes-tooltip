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
		beforeDestroy: CustomEvent;
		afterDestroy: CustomEvent;
	}
}

/**
 * Options
 */
export interface Options {
	/** Type (button tooltip or title tooltip), default "button" */
	type: "button" | "title";
	/** Element (selector string or HTMLElement) for the tooltip */
	element: string | HTMLElement | null;
	/** Content element (selector string or HTMLElement) for the content of the tooltip, default null */
	contentElement: string | HTMLElement | null;
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
	/** set aria-label for the tooltip, default null */
	ariaLabel: string | null;
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
	/** callback before destroy tooltip */
	beforeDestroy(): void;
	/** callback after destroy tooltip */
	afterDestroy(): void;
}

/**
 * ThisTooltip
 */
export interface ThisTooltip extends HTMLElement {
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

	/** Event listeners references for cleanup */
	private eventListeners: {
		tooltipRefClick?: () => void;
		tooltipRefKeydown?: (e: KeyboardEvent) => void;
		tooltipRefFocus?: () => void;
		tooltipRefFocusout?: (e: FocusEvent) => void;
		documentClick?: (e: Event) => void;
		documentKeydown?: (e: KeyboardEvent) => void;
		documentMouseenter?: (e: MouseEvent) => void;
		documentMouseleave?: (e: MouseEvent) => void;
		tooltipKeydown?: (e: KeyboardEvent) => void;
		tooltipTransitionEnd?: (e: TransitionEvent) => void;
	} = {};

	/**
	 * Create tooltip
	 */
	constructor(options: Partial<Options>)
	{
		// Defaults
		const defaults: Options = {
			type: "button",
			element: null,
			contentElement: null,
			setId: null,
			setClass: null,
			placement: (options.type && options.type=="title" ? "top" : "bottom"),
			delay: (options.type && options.type=="title" ? 400 : 0),
			duration: 600,
			arrow: true,
			style: null,
			ariaLabel: null,
			hideOnHover: true,
			beforeShow: () => {},
			afterShow: () => {},
			beforeHide: () => {},
			afterHide: () => {},
			beforeDestroy: () => {},
			afterDestroy: () => {},
		}
		this.options = {...defaults, ...options};

		// Event keydown on the tooltip
		this.eventListeners.tooltipKeydown = (e: KeyboardEvent) => {
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
		};

		// Event transitionend on the tooltip (used for afterShow callback)
		this.eventListeners.tooltipTransitionEnd = (e: TransitionEvent) => {
			if(this.tooltip?.classList.contains("webcimes-tooltip--show") && e.propertyName == "opacity")
			{
				// Callback after show tooltip
				this.tooltipRef?.dispatchEvent(new CustomEvent("afterShow"));
				this.tooltip?.dispatchEvent(new CustomEvent("afterShow"));
				if(typeof this.options.afterShow === 'function')
				{
					this.options.afterShow();
				}
			}
		};
		
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
	 * Wait for an element to be removed from the DOM, then run a callback function.
	 */
	private onElementRemoved(
		selectorOrElement: string | HTMLElement,
		callback: (element: HTMLElement) => void,
		observeOnce: boolean = true,
	) {
		// Create a MutationObserver to watch for removed nodes
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.removedNodes.forEach((removedNode) => {
					if (removedNode instanceof HTMLElement) {
						// Check if selector is a string (CSS selector) or an HTMLElement
						if (typeof selectorOrElement === 'string') {
							// Handle case where selectorOrElement is a string (CSS selector)
							if (removedNode.matches(selectorOrElement)) {
								callback(removedNode);
								if (observeOnce) observer.disconnect(); // Stop observing after the first match
							} else {
								// Check if any of the removed node's children match the selector
								const matchingChildren = removedNode.querySelectorAll(selectorOrElement);
								matchingChildren.forEach((child) => {
									callback(child as HTMLElement);
									if (observeOnce) observer.disconnect(); // Stop observing after the first match
								});
							}
						} else {
							// Handle case where selectorOrElement is an HTMLElement
							if (removedNode === selectorOrElement || removedNode.contains(selectorOrElement)) {
								callback(removedNode);
								if (observeOnce) observer.disconnect(); // Stop observing after the first match
							}
						}
					}
				});
			});
		});
	
		// Start observing the DOM for removed nodes
		observer.observe(document.body, {
			childList: true,
			subtree: true // Also observe removals in the entire subtree
		});
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

		// Observe the tooltipRef for removal
		if(this.tooltipRef) {
			this.onElementRemoved(this.tooltipRef, (removedElement) => {
				// Hide the tooltip
				this.hide(() =>
				{
					// Remove the tooltip
					this.tooltip?.remove();
				});
			}, true);
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
			if(!document.querySelector(`#${this.tooltipRef.getAttribute("data-tooltip-target")}`))
			{
				this.tooltip = document.body.appendChild(this.tooltip!);
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
						this.tooltipRef?.dispatchEvent(new CustomEvent("beforeShow"));
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
					this.tooltipRef?.setAttribute("aria-expended", "true");

					// Set focus on the tooltip
					this.tooltip.focus();

					// Event keydown on the tooltip
					this.tooltip.addEventListener("keydown", this.eventListeners.tooltipKeydown!);
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
			this.tooltip.addEventListener("transitionend", this.eventListeners.tooltipTransitionEnd!);

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
					if(this.tooltipRef && this.tooltip) {
						computePosition(this.tooltipRef, this.tooltip, options).then(({x, y, middlewareData, placement}) => {
							if(this.tooltip) {
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
							}
						});
					}
				});
			}
		}
	}

	/**
	 * Hide the tooltip
	 */
	public hide(callback?: () => void, isOutsideEvent: boolean = false)
	{
		// If the tooltip exist then remove it
		if(this.tooltip && this.tooltipRef && document.querySelector(`#${this.tooltipRef.getAttribute("data-tooltip-target")}`))
		{
			// Callback before hide tooltip
			this.tooltipRef.dispatchEvent(new CustomEvent("beforeHide"));
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
				this.tooltipRef?.setAttribute("aria-expended", "false");

				// Set focus on the tooltipRef if the event (click or keydown) is not outside the tooltip or tooltipRef, for prevent focus lost
				if (!(isOutsideEvent))
				{
					this.tooltipRef.focus();
				}

				// Destroy event keydown on the tooltip
				this.tooltip.removeEventListener("keydown", this.eventListeners.tooltipKeydown!);
			}
			
			// Destroy all events
			this.tooltip.removeEventListener("transitionend", this.eventListeners.tooltipTransitionEnd!);

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
				this.tooltipRef?.dispatchEvent(new CustomEvent("afterHide"));
				this.tooltip?.dispatchEvent(new CustomEvent("afterHide"));
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
	 * Destroy the tooltip and remove all event listeners
	 */
	public destroy()
	{
		// Callback before destroy tooltip
		this.tooltipRef?.dispatchEvent(new CustomEvent("beforeDestroy"));
		this.tooltip?.dispatchEvent(new CustomEvent("beforeDestroy"));
		if(typeof this.options.beforeDestroy === 'function')
		{
			this.options.beforeDestroy();
		}

		// If the tooltip exists, clean it up directly (logic from hide method)
		if(this.tooltip)
		{
			// Clear all timeouts
			clearTimeout(this.tooltip.tooltipShowTimeout);
			clearTimeout(this.tooltip.tooltipHideTimeout);

			// Destroy floatingUi if exist
			if(typeof this.tooltip.cleanUpFloatingUi !== "undefined")
			{
				this.tooltip.cleanUpFloatingUi();
				delete this.tooltip.cleanUpFloatingUi;
			}

			// Remove the tooltip from DOM
			this.tooltip.remove();
		}

		// Detach all event listeners
		this.detachEvents();

		// Remove tooltip-related attributes from tooltipRef
		if(this.tooltipRef)
		{
			this.tooltipRef.classList.remove("webcimes-tooltip-ref");
			this.tooltipRef.removeAttribute("data-tooltip-target");
			this.tooltipRef.removeAttribute("role");
			this.tooltipRef.removeAttribute("aria-expended");
			this.tooltipRef.removeAttribute("aria-haspopup");
			this.tooltipRef.removeAttribute("tabindex");
		}

		// Clear all instance references
		this.tooltipRef = null;
		this.tooltip = null as any;
		this.tooltipArrow = null;

		// Callback after destroy tooltip
		if(typeof this.options.afterDestroy === 'function')
		{
			this.options.afterDestroy();
		}
	}

	/**
	 * Detach only event listeners, keep DOM structure intact
	 */
	detachEvents()
	{
		// Remove tooltipRef event listeners
		if(this.tooltipRef)
		{
			if(this.eventListeners.tooltipRefClick)
			{
				this.tooltipRef.removeEventListener("click", this.eventListeners.tooltipRefClick);
			}
			if(this.eventListeners.tooltipRefKeydown)
			{
				this.tooltipRef.removeEventListener("keydown", this.eventListeners.tooltipRefKeydown);
			}
			if(this.eventListeners.tooltipRefFocus)
			{
				this.tooltipRef.removeEventListener("focus", this.eventListeners.tooltipRefFocus);
			}
			if(this.eventListeners.tooltipRefFocusout)
			{
				this.tooltipRef.removeEventListener("focusout", this.eventListeners.tooltipRefFocusout);
			}
		}

		// Remove document event listeners
		if(this.eventListeners.documentClick)
		{
			document.removeEventListener("click", this.eventListeners.documentClick);
		}
		if(this.eventListeners.documentKeydown)
		{
			document.removeEventListener("keydown", this.eventListeners.documentKeydown);
		}
		if(this.eventListeners.documentMouseenter)
		{
			document.removeEventListener("mouseenter", this.eventListeners.documentMouseenter, true);
		}
		if(this.eventListeners.documentMouseleave)
		{
			document.removeEventListener("mouseleave", this.eventListeners.documentMouseleave, true);
		}

		// Remove tooltip event listeners
		if(this.tooltip)
		{
			if(this.eventListeners.tooltipKeydown)
			{
				this.tooltip.removeEventListener("keydown", this.eventListeners.tooltipKeydown);
			}
			if(this.eventListeners.tooltipTransitionEnd)
			{
				this.tooltip.removeEventListener("transitionend", this.eventListeners.tooltipTransitionEnd);
			}
		}

		// Clear event listener references but keep other references intact
		this.eventListeners = {};
	}

	/**
	 * Reattach event listeners based on tooltip type
	 */
	reattachEvents()
	{
		if(!this.tooltipRef) return;

		if(this.options.type === "button")
		{
			this.attachButtonEvents();
		}
		else if(this.options.type === "title")
		{
			this.attachTitleEvents();
		}
	}

	/**
	 * Attach events for button type tooltip
	 */
	private attachButtonEvents()
	{
		if(!this.tooltipRef) return;

		// Event click on the tooltipRef
		this.eventListeners.tooltipRefClick = () => {
			this.show();
		};
		this.tooltipRef.addEventListener("click", this.eventListeners.tooltipRefClick);

		// Event keydown on the tooltipRef
		this.eventListeners.tooltipRefKeydown = (e: KeyboardEvent) => {
			if(e.key == "Enter" || e.key == " ")
			{
				e.preventDefault();
				this.show();
			}
		};
		this.tooltipRef.addEventListener("keydown", this.eventListeners.tooltipRefKeydown);

		// Event click and keydown outside the tooltipRef and tooltip
		this.eventListeners.documentClick = (e: Event) => {
			if(
				(e.target as HTMLElement).closest(".webcimes-tooltip-ref") != this.tooltipRef &&
				(e.target as HTMLElement).closest(".webcimes-tooltip") != this.tooltip
			)
			{
				this.hide(() =>
				{
					this.tooltip?.remove();
				}, true);
			}
		};
		this.eventListeners.documentKeydown = (e: KeyboardEvent) => {
			if(
				(e.target as HTMLElement).closest(".webcimes-tooltip-ref") != this.tooltipRef &&
				(e.target as HTMLElement).closest(".webcimes-tooltip") != this.tooltip
			)
			{
				this.hide(() =>
				{
					this.tooltip?.remove();
				}, true);
			}
		};
		document.addEventListener("click", this.eventListeners.documentClick);
		document.addEventListener("keydown", this.eventListeners.documentKeydown);
	}

	/**
	 * Attach events for title type tooltip
	 */
	private attachTitleEvents()
	{
		if(!this.tooltipRef) return;

		// Current status on hover
		let tooltipHover = false;

		// On mouseenter / click, create tooltip title
		this.eventListeners.documentMouseenter = (e: MouseEvent) => {
			if(e.target == this.tooltipRef || (!this.tooltip?.tooltipHideOnHover && e.target == this.tooltip))
			{
				tooltipHover = true;

				// Show the tooltip
				this.show();
			}
		};
		document.addEventListener("mouseenter", this.eventListeners.documentMouseenter, true);

		// On mouseleave, hide, remove and destroy tooltip title
		this.eventListeners.documentMouseleave = (e: MouseEvent) => {
			if(e.target == this.tooltipRef || (!this.tooltip?.tooltipHideOnHover && e.target == this.tooltip))
			{
				tooltipHover = false;

				// Hide the tooltip
				this.hide(() =>
				{
					// Remove the tooltip
					this.tooltip?.remove();
				});
			}
		};
		document.addEventListener("mouseleave", this.eventListeners.documentMouseleave, true);

		// Event focus on the tooltipRef
		this.eventListeners.tooltipRefFocus = () => {
			// Show the tooltip
			this.show();
		};
		this.tooltipRef.addEventListener("focus", this.eventListeners.tooltipRefFocus);

		// Event focusout on the tooltipRef
		this.eventListeners.tooltipRefFocusout = (e: FocusEvent) => {
			if(!tooltipHover)
			{
				// Hide the tooltip
				this.hide(() =>
				{
					// Remove the tooltip
					this.tooltip?.remove();
				});
			}
		};
		this.tooltipRef.addEventListener("focusout", this.eventListeners.tooltipRefFocusout);

		// Event keydown on the tooltipRef
		this.eventListeners.tooltipRefKeydown = (e: KeyboardEvent) => {
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
		};
		this.tooltipRef.addEventListener("keydown", this.eventListeners.tooltipRefKeydown);
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
			this.tooltipRef.setAttribute("data-tooltip-target", tooltipID);
			this.tooltipRef.setAttribute("role", "button");
			this.tooltipRef.setAttribute("aria-expended", "false");
			this.tooltipRef.setAttribute("aria-haspopup", "dialog");
			this.tooltipRef.setAttribute("tabindex", "0");

			// Tooltip content (if contentElement exist, get the element, else get the next sibling)
			const tooltipContent: HTMLElement | null = this.getHtmlElement(this.options.contentElement) ?? (this.tooltipRef.nextElementSibling as HTMLElement | null);

			// Remove the display none of the tooltip content
			tooltipContent?.style.removeProperty("display");

			// Create tooltip element without adding it to the dom
			let tooltip = document.createElement("template");
			tooltip.innerHTML = 
			`<div class="webcimes-tooltip webcimes-tooltip--button ${(this.options.setClass?this.options.setClass:``)}" id="${tooltipID}" ${(this.options.style?`style="${this.options.style}"`:``)} role="dialog" ${this.options.ariaLabel?`aria-label="${this.options.ariaLabel}"`:``} tabindex="0"></div>`;
			this.tooltip = tooltip.content.firstChild as HTMLElement;

			// Append the tooltip content to the tooltip element
			if(tooltipContent) {
				this.tooltip.appendChild(tooltipContent);
			}

			// Attach events for button type tooltip
			this.attachButtonEvents();
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

			// Declare tooltip content
			let tooltipContent: HTMLElement | null = null;

			// If contentElement options exist
			if(this.options.contentElement)
			{
				// Get the content element
				tooltipContent = this.getHtmlElement(this.options.contentElement);

				// Remove the display none of the content element
				tooltipContent?.style.removeProperty("display");
			}
			// If contentElement doesn't exist get the title attribute of the tooltipRef
			else
			{
				// Tooltip content
				const titleContent = this.tooltipRef.getAttribute("title");
				if (titleContent) {
					const tempElement = document.createElement("div");
					tempElement.innerHTML = titleContent;
					tooltipContent = tempElement as HTMLElement | null;
				}

				// Remove the title attribute
				this.tooltipRef.removeAttribute("title");
			}
			
			// Create data-tooltip-title attribute, and remove title attribute
			this.tooltipRef.setAttribute("aria-describedby", tooltipID);

			// Create tooltip element without adding it to the dom
			this.tooltipRef.setAttribute("data-tooltip-target", tooltipID);
			let tooltip = document.createElement("template");
			tooltip.innerHTML = 
			`<div class="webcimes-tooltip webcimes-tooltip--title ${(this.options.setClass?this.options.setClass:``)}" id="${tooltipID}" ${(this.options.style?`style="${this.options.style}"`:``)} role="tooltip" ${this.options.ariaLabel?`aria-label="${this.options.ariaLabel}"`:``}></div>`;
			this.tooltip = tooltip.content.firstChild as HTMLElement;

			// Append the tooltip content to the tooltip element
			if(tooltipContent) {
				this.tooltip.appendChild(tooltipContent);
			}

			// Attach events for title type tooltip
			this.attachTitleEvents();
		}
	}
}