import { assert } from './utils.js';

// your task is to create a function, that checks, whether passed string is polindrome
// or not, if so, return true, otherwise return false.

// NOTE: should not fail, when passed not a string :)
// How to run: node polindrome.js

function polindrome(input) {
    let result;

    if (typeof(input) === "string") {
        for (let i = 0; i < (input.length / 2); i++) {
            if (input[i] === input[input.length - (1 + i)]) {
                result = true;
            } else {
                result = false;
            }
        }
    } else {
        result = false;

    }
    return result;

}

// TESTS
assert("aaartaaa", polindrome('aaartaaa'), false);
assert("test", polindrome('test'), false);
assert("abccba", polindrome('abccba'), true);
assert("abcdeedcba", polindrome('abcdeedcba'), true);
assert("abcddcba", polindrome('abcddcba'), true);
assert("abctrrtcba", polindrome('abctrrtcba'), true);
assert("abcqqcba", polindrome('abcqqcba'), true);
assert("abcppcba", polindrome('abcppcba'), true);
assert("abchhcba", polindrome('abchhcba'), true);
assert("abcmmcba", polindrome('abcmmcba'), true);
assert("abcnncba", polindrome('abcnncba'), true);
assert("abcffcba", polindrome('abcffcba'), true);
assert("abclcba", polindrome('abclcba'), true);
assert("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", polindrome('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'), true);
assert("123321", polindrome(123321), false);
assert("123", polindrome(123), false);
assert("{}", polindrome({}), false);
assert("[]", polindrome([]), false);
assert("function () {}", polindrome(function () {}), false);
assert("null", polindrome(null), false);
assert("undefined", polindrome(), false);
