import { pair, head, tail, is_null, list, display, is_pair, is_number, append, reverse } from 'sicp';

function reverse_r(items) {
    return is_null(items)
           ? null
           : append(reverse_r(tail(items)),
	            pair(head(items), null));
}

function deep_reverse(items) {
    return is_null(items)
           ? null
           : is_pair(items)
           ? append(deep_reverse(tail(items)),
                    pair(deep_reverse(head(items)), 
                          null))
           : items;
}

var x = list(list(1, 2), list(3, 4));
var y = list(list("a", "b", "c"), list("e", "d" ,"f"));
var z = list(x, y); 
display(z);
display(reverse(z));
display(deep_reverse(z));

function fringe(x) {
    return is_null(x)
           ? null
           : is_pair(x)
           ? append(fringe(head(x)),
                    fringe(tail(x)))
           : list(x);
}

display(fringe(list(x, x)));


/* exercise 2.29: representing a binary mobile - 
   a balancing toy/sculpture consisting of hanging or pivoting pieces of metal, plastic  */ 

// constructors

function make_mobile(left, right) {
    return list(left, right);
}

function make_branch(length, structure) {
    return list(length, structure);
}

// selectors

function left_branch(mobile) {
    return head(mobile);
}

function right_branch(mobile) {
    return head(tail(mobile));
}

function branch_length(branch) {
    return head(branch);
}

function branch_structure(branch) {
    return head(tail(branch));
}

// functions

function is_weight(mobile) {
    return is_number(mobile);
}

function total_weight(x) {
    return is_weight(x)
        ? x
        : total_weight(branch_structure(
                         left_branch(x))) +
          total_weight(branch_structure(
                         right_branch(x)));
}

function is_balanced(x) {
    return is_weight(x) ||
           (is_balanced(branch_structure(left_branch(x))) && // check left branch balance
            is_balanced(branch_structure(right_branch(x))) && // check right branch balance
            total_weight(branch_structure(left_branch(x))) // check balance at current level 
            * branch_length(left_branch(x)) === 
            total_weight(branch_structure(right_branch(x))) 
            * branch_length(right_branch(x))
           );
}

const m = make_mobile(
              make_branch(20, 
                          make_mobile(make_branch(10, 2),
                                      make_branch(4, 5))), 
              make_branch(28, 5));
display(is_balanced(m));

// map

function scale_tree_1(tree, factor) {
    return is_null(tree)
           ? null
           : ! is_pair(tree)
           ? tree * factor
           : pair(scale_tree(head(tree), factor), 
                  scale_tree(tail(tree), factor));
}

function scale_tree_2(tree, factor) {
    return map(sub_tree => is_pair(sub_tree)
                           ? scale_tree(sub_tree, factor)
                           : sub_tree * factor, 
               tree);
}


function map(f, items) {
    return is_null(items)
           ? null
           : pair(f(head(items)), 
                  map(f, tail(items)));
}

function tree_map(f, tree) {
    return map(sub_tree => is_null(sub_tree)
                         ? null
                         : is_pair(sub_tree)
                         ? tree_map(f, sub_tree)
                         : f(sub_tree),
              tree);
}

function subsets(s) {
    if (is_null(s)) {
        return list(null);
    } else {
        const rest = subsets(tail(s));  // subsets without the first element
        return append(rest, map(x => pair(head(s), x), rest)); // subsets without e + those subsets adding e
    }
}

display(subsets(list(1, 2, 3)));
