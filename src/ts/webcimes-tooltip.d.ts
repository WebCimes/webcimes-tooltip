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
     * Show the tooltip
     */
    private tooltipShow;
    /**
     * Hide the tooltip
     */
    private tooltipHide;
    /**
     * Create automatically tooltip
     */
    webcimesTooltip(options: Options): void;
    /**
     * Create automatically tooltip title
     */
    webcimesTooltipTitle(options: Options): void;
}
export {};
//# sourceMappingURL=webcimes-tooltip.d.ts.map