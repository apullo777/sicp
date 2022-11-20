
function pair_1(x, y) {
    function dispatch(m) {
        return m === 0 
               ? x
               : m === 1 
               ? y
               : error(m, "argument not 0 or 1 -- pair");
    }
    return dispatch;	      
}
function head_1(z) { return z(0); }

function tail_1(z) { return z(1); }

const x = pair_1(1, 2);
console.log(head_1(x));


// alternative functional representation of pairs

function pair_2(x, y) {
    return m => m(x, y);
}

function head_2(z) {
    return z((p, q) => p);
}

function tail_2(z) {
    return z((p, q) => q);
}

const y = pair_2(6, 9);
console.log(tail_2(y));

// pair (a, b) for 2^a * 3^b

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

function pair_3(a, b) {
    return fast_expt(2, a) * fast_expt(3, b);
}
function head_3(p) {
    return p % 2 === 0
           ? head_3(p / 2) + 1
           : 0;
}
function tail_3(p) {
    return p % 3 === 0 
           ? tail_3(p / 3) + 1
           : 0;
}

console.log(tail_3(pair_3(3, 4)));



// Church numerals

const zero = f => x => x;
const add_1 = n => f => x => f(n(f)(x));

const one = f => x => f(x);
/* use substitition to evaluate add_1(zero)
add_1(n):    return f => x => f(n(f)(x));
add_1(zero): return f => x => f(zero(f)(x));
zero is a function that returns an identity fundtion -> zero(f)(x) is just x
one = add_1(zero): return f(f(x)) 
*/ 

const two = f => x => f(f(x));
/* two = add_1(one) = f => x => f((a => (b => a(b))(f)(x));
                      f => x => f((b => f(b))(x));
                      f => x => f(f(x)); */

const plus = (n, m) => f => x => n(f)(m(f)(x));
/* the result will be the function applied n times where n is the sum of two args a and b,
   both of which are two-level nested lambda
      (fa(fa(fa(fa)...(fa(xa))))...) (a times)
                          xa = (fb(fb(fb(fb)...(fb(x))))...) (b times)
                          b(f)(x) (pass f and x to b)
   => (fa(fa(fa(fa)...(fa(b(f)(x)))))...)
                      a(f)  (we need the function used by a in its outer lambda function to be the same as that used by b)
   =>  add = (a, b) => f => x => a(f)(b(f)(x));
*/

const three = plus(one, two);
const four = add_1(three);
const church_to_num = c => c(n => n + 1)(0);

console.log(church_to_num(three));
console.log(church_to_num(one));
console.log(church_to_num(four));

