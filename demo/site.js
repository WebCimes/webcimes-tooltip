import { createWebcimesTooltip } from '../dist/js/webcimes-tooltip.esm.js';

createWebcimesTooltip({
    type: 'button',
    element: '#above',
    ariaLabel: 'Above button tooltip',
    placement: 'top',
    arrow: true,
});

createWebcimesTooltip({
    type: 'button',
    element: '#below',
    ariaLabel: 'Below button tooltip',
    placement: 'bottom',
    arrow: true,
});
