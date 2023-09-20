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
 * Create automatically tooltip
 * @param {Object} options
 * @param {String} options.placement
 * @param {Number} options.delay
 * @param {Number} options.duration
 * @param {Boolean} options.arrow
 */
export declare function webcimesTooltip(options: Options): void;
/**
 * Create automatically tooltip title
 */
export declare function webcimesTooltipTitle(options: Options): void;
export {};
//# sourceMappingURL=webcimes-tooltip.d.ts.map