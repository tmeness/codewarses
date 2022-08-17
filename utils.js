export function assert(text, actual, expected) {
    if (actual !== expected) {
        return console.error(`${text}: Assertion failed: expected [${expected}], but got [${actual}]`);
    }

    console.log(`${text}: PASSED`);
}