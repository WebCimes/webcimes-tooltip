/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */
import { Placement } from '@popperjs/core';
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
 * Class WebcimesModal
 */
export declare class WebcimesTooltip {
    /**
     * Get a unique ID, related to the prefix
     */
    private getUniqueID;
    /**
     * Convert options.element to an array of HTMLElement
     */
    private getHtmlElements;
    /**
     * Show the tooltip
     */
    private show;
    /**
     * Hide the tooltip
     */
    private hide;
    /**
     * Create automatically tooltip for button
     */
    tooltipForButton(options: Options): void;
    /**
     * Create automatically tooltip for title
     */
    tooltipForTitle(options: Options): void;
}
export {};
//# sourceMappingURL=webcimes-tooltip.d.ts.map