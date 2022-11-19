import { pair, head, tail, display, stringify } from 'sicp';

function average(a, b) {
    return (a + b) /2;
}

/* points */

// constructor
function make_point(x, y) {
    return pair(x, y);
}

// selector
function x_point(pt) {
    return head(pt);
}

function y_point(pt) {
    return tail(pt);
}

/* segments */

// constructor
function make_segment(start_point, end_point) {
    return pair(start_point, end_point);
}

// selector
function start_segment(seg) {
    return head(seg);
}

function end_segment(seg) {
    return tail(seg);
}

/* rectangle */

// constructor
function make_rect(bottom_left, height, width) {
    return pair(bottom_left, pair(height, width));
}  

// selector
function height_rect(rect) {
    return tail(head(rect));
}

function width_rect(rect) {
    return tail(tail(rect));
}

function perimeter_rect(rect) {
    return 2 * (height_rect(rect) + width_rect(rect));
}

function area_rect(rect) {
    return length(rect) * width(rect);
}

/* application */

function mid_point_segment(seg) {
    const a = start_segment(seg)
    const b = end_segment(seg)
    return make_point(average(x_point(a),
                              x_point(b)), 
                      average(y_point(a), 
                              y_point(b)));
}

function print_point(pt) {
    return display("(" + stringify(x_point(pt)) + ", "
                       + stringify(y_point(pt)) +        ")");
}

const s = make_segment(make_point(1, 4), make_point(2, 8));
print_point(mid_point_segment(s));