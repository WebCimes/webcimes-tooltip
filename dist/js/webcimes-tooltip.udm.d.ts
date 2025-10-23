/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */
/// <reference types="node" />
import { Placement } from '@floating-ui/dom';
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
    type: 'button' | 'title';
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
/**
 * Public interface for WebcimesTooltip instances
 * This represents the actual accessible members of the instance
 */
export interface WebcimesTooltip {
    /** Get the dom element of the tooltip ref */
    tooltipRef: HTMLElement | null;
    /** Get the dom element of the tooltip */
    tooltip: ThisTooltip;
    /** Get the dom element of the tooltip arrow */
    tooltipArrow: HTMLElement | null;
    /** Show the tooltip */
    show(): void;
    /** Hide the tooltip */
    hide(callback?: () => void, isOutsideEvent?: boolean): void;
    /** Destroy the tooltip and remove all event listeners */
    destroy(): void;
    /** Detach only event listeners, keep DOM structure intact */
    detachEvents(): void;
    /** Reattach event listeners based on tooltip type */
    reattachEvents(): void;
}
/**
 * WebcimesTooltip implementation class
 */
export declare class WebcimesTooltipImpl implements WebcimesTooltip {
    /** Get the dom element of the tooltip ref */
    tooltipRef: HTMLElement | null;
    /** Get the dom element of the tooltip */
    tooltip: ThisTooltip;
    /** Get the dom element of the tooltip arrow */
    tooltipArrow: HTMLElement | null;
    /** Options of the current tooltip */
    private options;
    /** Event listeners references for cleanup */
    private eventListeners;
    /**
     * MutationObservers references to disconnect on destroy.
     * Prevents memory leaks by stopping DOM observation when the tooltip instance is destroyed.
     */
    private mutationObservers;
    /**
     * Create tooltip
     */
    constructor(options: Partial<Options>);
    /**
     * Convert elements entry to an array of HTMLElement
     */
    private getHtmlElements;
    /**
     * Convert element entry to an HTMLElement
     */
    private getHtmlElement;
    /**
     * Get a unique ID, related to the identifier
     * @param selectorPrefix Prefix of the selector
     * @param identifier Identifier to find
     * @param selectorSuffix Suffix of the selector
     * @param element Find if the ID already exist in provided dom element
     */
    private getUniqueID;
    /**
     * Wait for an element to be removed from the DOM, then run a callback function.
     */
    private onElementRemoved;
    /**
     * Initialization of the current tooltip
     */
    private init;
    /**
     * Show the tooltip
     */
    show(): void;
    /**
     * Hide the tooltip
     */
    hide(callback?: () => void, isOutsideEvent?: boolean): void;
    /**
     * Destroy the tooltip and remove all event listeners
     */
    destroy(): void;
    /**
     * Detach only event listeners, keep DOM structure intact
     */
    detachEvents(): void;
    /**
     * Reattach event listeners based on tooltip type
     */
    reattachEvents(): void;
    /**
     * Attach events for button type tooltip
     */
    private attachButtonEvents;
    /**
     * Attach events for title type tooltip
     */
    private attachTitleEvents;
    /**
     * Create automatically tooltip for button
     */
    private tooltipForButton;
    /**
     * Create automatically tooltip for title
     */
    private tooltipForTitle;
}
/**
 * Factory function to create a WebcimesTooltip instance with proper typing
 */
export declare function CreateWebcimesTooltip(options: Partial<Options>): WebcimesTooltip;
//# sourceMappingURL=webcimes-tooltip.d.ts.map