import { pair, head, tail, is_null, list, display } from 'sicp';

function list_ref(items, n) {
    return n === 0
           ? head(items)
           : list_ref(tail(items), n - 1);
}

function length(items) {
    function length_iter(a, count) {
        return is_null(a)
               ? count
               : length_iter(tail(a), count + 1);
    }
    return length_iter(items, 0);
}

function append(list1, list2) {
    return is_null(list1)
           ? list2
           : pair(head(list1), append(tail(list1), list2));
}

function last_pair(items) {
    return is_null(tail(items))
           ? items
           : last_pair(tail(items));
}

function reverse_r(items) {
    return is_null(items)
           ? null
           : append(reverse_r(tail(items)),
	            pair(head(items), null));
}

function reverse_i(items) {
    function reverse_iter(items, result) {
        return is_null(items)
               ? result
               : reverse_iter(tail(items),
	                      pair(head(items), result));
    }
    return reverse_iter(items, null);
}

var a = list(1, 4, 9, 16, 25);
var b = list(3, 5, 7, 9, 11)
var c = list(1, 2, 3, 4, 5, 6, 7, 8, 9) 
display(a);
display(list_ref(a, 3));
display(length(a));
display(append(a, b));
display(last_pair(a));
display(reverse_r(c));
display(reverse_i(c));


function scale_list(items, factor) {
    return is_null(items)
           ? null
           : pair(head(items) * factor, 
                  scale_list(tail(items), factor));
}

function map(fun, items) {
    return is_null(items)
           ? null
           : pair(fun(head(items)), 
                  map(fun, tail(items)));
}

function scale_list_2(items, factor) {
    return map(x => x * factor, items);
}

function for_each(fun, items) {
    if (is_null(items)){
        return undefined;
    } else {
        fun(head(items));
        for_each(fun, tail(items));
    }
}

for_each(x => display(x), list(57, 321, 88));


/* count change */

function count_change(amount) {
    return cc(amount, 5);
}

function cc(amount, kinds_of_coins) {
    return amount === 0
           ? 1
           : amount < 0 || kinds_of_coins === 0
           ? 0
           : cc(amount, kinds_of_coins - 1)
             +
             cc(amount - first_denomination(kinds_of_coins),
                kinds_of_coins);
}

function first_denomination(kinds_of_coins) {
    return kinds_of_coins === 1 ? 1
         : kinds_of_coins === 2 ? 5
         : kinds_of_coins === 3 ? 10
         : kinds_of_coins === 4 ? 25
         : kinds_of_coins === 5 ? 50
         : 0;   
}

count_change(100);

const us_coins = list(50, 25, 10, 5, 1);
const uk_coins = list(100, 50, 20, 10, 5, 2, 1);

function cc_2(amount, coin_values) {
    return amount === 0
           ? 1
           : amount < 0 || no_more(coin_values)
           ? 0
           : cc_2(amount, except_first_denomination(coin_values)) +
             cc_2(amount - first_denomination(coin_values), coin_values);
}