import { math_floor, math_log2 } from 'sicp';

function abs(x) {
    return x >= 0 ? x : - x;
}

const tolerance = 0.00001;
function fixed_point(f, first_guess) {
    function close_enough(x, y) {
        return abs(x - y) < tolerance;
    }
    function try_with(guess) {
        const next = f(guess);
        return close_enough(guess, next)
               ? next
               : try_with(next);
    }
    return try_with(first_guess);
}

function average(x, y) {
    return (x + y) / 2;
}

function average_damp(f) {
    return x => average(x, f(x));
}

function compose(f, g) {
    return x => f(g(x));
}

function repeated(f, n) {
    return n === 0
           ? x => x
           : compose(f, repeated(f, n - 1));
}

function square(x) {
    return x * x;
}

function is_even(n) {
    return n % 2 === 0;
}

function fast_expt(b, n) {
    return n === 0
           ? 1
           : is_even(n)
           ? square(fast_expt(b, n / 2))
           : b * fast_expt(b, n - 1);
}

// Newton's method 
const dx = 0.00001;

function deriv(g) {
    return x => (g(x + dx) - g(x)) / dx;
}

function newton_transform(g) {
    return x => x - g(x) / deriv(g)(x);
}
function newtons_method(g, guess) {
    return fixed_point(newton_transform(g), guess);
}


//square root using fixed point
function sqrt_fp(x) {
    return fixed_point(average_damp(y => x / y), 1);
}

// square root using newton's method
function sqrt_nt(x) {
    return newtons_method(y => square(y) - x, 1);
}

//square root using newton's method - another way to implement approximation - from 1.1.7
function is_good_enough(guess, x) {
    return abs(square(guess) - x) < 0.001;
}

function improve(guess, x) {
    return average(guess, x / guess);
}

function sqrt_iter(guess, x) {
    return is_good_enough(guess, x)
           ? guess
           : sqrt_iter(improve(guess, x), x);
}

function sqrt_nt2(x) {
    return sqrt_iter(1, x);
}


// cube root using fixed point
function cube_root(x) {
    return fixed_point(average_damp(y => x / square(y)), 1);
}

// nth root
function nth_root(n, x) {
    return fixed_point(repeated(average_damp, 
                                math_floor(math_log2(n)))
                       (y => x / fast_expt(y, n - 1)),
                       1);
}

console.log(nth_root(4, 625));