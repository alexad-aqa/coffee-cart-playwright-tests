import { test, expect } from "@playwright/test";

const LEGAL_VOTING_AGE = 18;
const approveMsg = 'Ви можете голосувати.';
const rejectMsg = 'Ви ще не можете голосувати.';
const invalidAgeErrorMsg = 'Please, enter valid age.'

function votingAgeValidator(age) {

    if (age === '' || age === null || age < 0 || isNaN(age)) {
        return invalidAgeErrorMsg;
    }
    else if (age >= LEGAL_VOTING_AGE) {
        return approveMsg;

    } else if (age < LEGAL_VOTING_AGE) {
        return rejectMsg;
    }
}

votingAgeValidator(17);
votingAgeValidator(18);
votingAgeValidator(25);
votingAgeValidator('a');
votingAgeValidator();
votingAgeValidator('');
votingAgeValidator(-18);

// console.log(votingAgeValidator(17))
// console.log(votingAgeValidator(18))
// console.log(votingAgeValidator(25))
// console.log(votingAgeValidator('a'))
// console.log(votingAgeValidator())
// console.log(votingAgeValidator(''))
// console.log(votingAgeValidator(-18))

test('test for 17', () => {
    expect(votingAgeValidator(17)).toBe(rejectMsg)
});

test('test 18', () => {
    expect(votingAgeValidator(18)).toBe(approveMsg)
});

test('test 19', () => {
    expect(votingAgeValidator(19)).toBe(approveMsg)
});

test('test string', () => {
    expect(votingAgeValidator('a')).toBe(invalidAgeErrorMsg)
});

test('test   Nan', () => {
    expect(votingAgeValidator(NaN)).toBe(invalidAgeErrorMsg)
});

test('test undefined', () => {
    expect(votingAgeValidator()).toBe(invalidAgeErrorMsg)
});

test('test empty string', () => {
    expect(votingAgeValidator('')).toBe(invalidAgeErrorMsg)
});

test('test negative number', () => {
    expect(votingAgeValidator(-18)).toBe(invalidAgeErrorMsg)
});
test('test null', () => {
    expect(votingAgeValidator(null)).toBe(invalidAgeErrorMsg)
});