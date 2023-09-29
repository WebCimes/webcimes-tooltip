/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */
/// <reference types="node" />
import { Placement, Instance } from '@popperjs/core';
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
/**
 * Class WebcimesTooltip
 */
export declare class WebcimesTooltip {
    /**
     * Create tooltip
     */
    constructor(options: Options);
    /** Get the dom element of the tooltip ref */
    tooltipRef: HTMLElement | null;
    /** Get the dom element of the tooltip */
    tooltip: ThisTooltip;
    /** Options of the current tooltip */
    private options;
    /** Event tooltip opacity transition end on show class */
    private eventTransitionEndOnShow;
    /**
     * Get a unique ID, related to the prefix
     */
    private getUniqueID;
    /**
     * Convert elements entry to an array of HTMLElement
     */
    private getHtmlElements;
    /**
     * Convert element entry to an HTMLElement
     */
    private getHtmlElement;
    /**
     * Show the tooltip
     */
    show(): void;
    /**
     * Hide the tooltip
     */
    hide(callback?: () => void): void;
    /**
     * Initialization of the current tooltip
     */
    private init;
    /**
     * Create automatically tooltip for button
     */
    private tooltipForButton;
    /**
     * Create automatically tooltip for title
     */
    private tooltipForTitle;
}
export {};
//# sourceMappingURL=webcimes-tooltip.d.ts.map