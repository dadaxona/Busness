function addToPlaceholder(toAdd, el) {
    el.attr('placeholder', el.attr('placeholder') + toAdd);
    return new Promise(resolve => setTimeout(resolve, 100));
}
function clearPlaceholder(el) {
    el.attr("placeholder", "");
}
function printPhrase(phrase, el) {
    return new Promise(resolve => {
        clearPlaceholder(el);
        let letters = phrase.split('');
        letters.reduce(
            (promise, letter, index) => promise.then(_ => {
                if (index === letters.length - 1) {
                    setTimeout(resolve, 1000);
                }
                return addToPlaceholder(letter, el);
            }),
            Promise.resolve()
        );
    });
}
function printPhrases(phrases, el) {
    phrases.reduce(
        (promise, phrase) => promise.then(_ => printPhrase(phrase, el)), 
        Promise.resolve()
    );
}
function run() {
    let phrases = [
        "Search Praduct name vs QR Code",
    ];
    printPhrases(phrases, $('#search'));
}
// 2
function addToPlaceholder2(toAdd, el) {
    el.attr('placeholder', el.attr('placeholder') + toAdd);
    return new Promise(resolve => setTimeout(resolve, 100));
}
function clearPlaceholder2(el) {
    el.attr("placeholder", "");
}
function printPhrase222(phrase, el) {
    return new Promise(resolve => {
        clearPlaceholder2(el);
        let letters = phrase.split('');
        letters.reduce(
            (promise, letter, index) => promise.then(_ => {
                if (index === letters.length - 1) {
                    setTimeout(resolve, 1000);
                }
                return addToPlaceholder2(letter, el);
            }),
            Promise.resolve()
        );
    });
}
function printPhrases2(phrases, el) {
    phrases.reduce(
        (promise, phrase) => promise.then(_ => printPhrase222(phrase, el)), 
        Promise.resolve()
    );
}
function run2() {
    let phrases = [
        "Search User",
    ];
    printPhrases2(phrases, $('#usersearch'));
}
// 3

function addToPlaceholder3val(toAdd, el) {
    el.attr('placeholder', el.attr('placeholder') + toAdd);
    return new Promise(resolve => setTimeout(resolve, 100));
}
function clearPlaceholder3val(el) {
    el.attr("placeholder", "");
}
function printPhrase223val(phrase, el) {
    return new Promise(resolve => {
        clearPlaceholder3val(el);
        let letters = phrase.split('');
        letters.reduce(
            (promise, letter, index) => promise.then(_ => {
                if (index === letters.length - 1) {
                    setTimeout(resolve, 1000);
                }
                return addToPlaceholder3val(letter, el);
            }),
            Promise.resolve()
        );
    });
}
function printPhrases3val(phrases, el) {
    phrases.reduce(
        (promise, phrase) => promise.then(_ => printPhrase223val(phrase, el)), 
        Promise.resolve()
    );
}
function run3val() {
    let phrases = [
        "Search Valyuta",
    ];
    printPhrases3val(phrases, $('#valyuta'));
}
// valyuta ^^^^

function addToPlaceholder3(toAdd, el) {
    el.attr('placeholder', el.attr('placeholder') + toAdd);
    return new Promise(resolve => setTimeout(resolve, 100));
}
function clearPlaceholder3(el) {
    el.attr("placeholder", "");
}
function printPhrase223(phrase, el) {
    return new Promise(resolve => {
        clearPlaceholder3(el);
        let letters = phrase.split('');
        letters.reduce(
            (promise, letter, index) => promise.then(_ => {
                if (index === letters.length - 1) {
                    setTimeout(resolve, 1000);
                }
                return addToPlaceholder3(letter, el);
            }),
            Promise.resolve()
        );
    });
}
function printPhrases3(phrases, el) {
    phrases.reduce(
        (promise, phrase) => promise.then(_ => printPhrase223(phrase, el)), 
        Promise.resolve()
    );
}
function run3() {
    let phrases = [
        "Search Tip",
    ];
    printPhrases3(phrases, $('#tiptov'));
}
// 4
function addToPlaceholder4(toAdd, el) {
    el.attr('placeholder', el.attr('placeholder') + toAdd);
    return new Promise(resolve => setTimeout(resolve, 100));
}
function clearPlaceholder4(el) {
    el.attr("placeholder", "");
}
function printPhrase224(phrase, el) {
    return new Promise(resolve => {
        clearPlaceholder4(el);
        let letters = phrase.split('');
        letters.reduce(
            (promise, letter, index) => promise.then(_ => {
                if (index === letters.length - 1) {
                    setTimeout(resolve, 1000);
                }
                return addToPlaceholder4(letter, el);
            }),
            Promise.resolve()
        );
    });
}
function printPhrases4(phrases, el) {
    phrases.reduce(
        (promise, phrase) => promise.then(_ => printPhrase224(phrase, el)), 
        Promise.resolve()
    );
}
function run4() {
    let phrases = [
        "Search supplier",
    ];
    printPhrases4(phrases, $('#yerkaz'));
}
// 5
function addToPlaceholder5(toAdd, el) {
    el.attr('placeholder', el.attr('placeholder') + toAdd);
    return new Promise(resolve => setTimeout(resolve, 100));
}
function clearPlaceholder5(el) {
    el.attr("placeholder", "");
}
function printPhrase225(phrase, el) {
    return new Promise(resolve => {
        clearPlaceholder5(el);
        let letters = phrase.split('');
        letters.reduce(
            (promise, letter, index) => promise.then(_ => {
                if (index === letters.length - 1) {
                    setTimeout(resolve, 1000);
                }
                return addToPlaceholder5(letter, el);
            }),
            Promise.resolve()
        );
    });
}
function printPhrases5(phrases, el) {
    phrases.reduce(
        (promise, phrase) => promise.then(_ => printPhrase225(phrase, el)), 
        Promise.resolve()
    );
}
function run5() {
    let phrases = [
        "Search Tovar",
    ];
    printPhrases5(phrases, $('#tovarsq'));
}
// 6
function addToPlaceholder6(toAdd, el) {
    el.attr('placeholder', el.attr('placeholder') + toAdd);
    return new Promise(resolve => setTimeout(resolve, 100));
}
function clearPlaceholder6(el) {
    el.attr("placeholder", "");
}
function printPhrase226(phrase, el) {
    return new Promise(resolve => {
        clearPlaceholder6(el);
        let letters = phrase.split('');
        letters.reduce(
            (promise, letter, index) => promise.then(_ => {
                if (index === letters.length - 1) {
                    setTimeout(resolve, 1000);
                }
                return addToPlaceholder6(letter, el);
            }),
            Promise.resolve()
        );
    });
}
function printPhrases6(phrases, el) {
    phrases.reduce(
        (promise, phrase) => promise.then(_ => printPhrase226(phrase, el)), 
        Promise.resolve()
    );
}
function run6() {
    let phrases = [
        "Search Chiqim",
    ];
    printPhrases6(phrases, $('#chiqim'));
}
// 7
function addToPlaceholder7(toAdd, el) {
    el.attr('placeholder', el.attr('placeholder') + toAdd);
    return new Promise(resolve => setTimeout(resolve, 100));
}
function clearPlaceholder7(el) {
    el.attr("placeholder", "");
}
function printPhrase227(phrase, el) {
    return new Promise(resolve => {
        clearPlaceholder7(el);
        let letters = phrase.split('');
        letters.reduce(
            (promise, letter, index) => promise.then(_ => {
                if (index === letters.length - 1) {
                    setTimeout(resolve, 1000);
                }
                return addToPlaceholder7(letter, el);
            }),
            Promise.resolve()
        );
    });
}
function printPhrases7(phrases, el) {
    phrases.reduce(
        (promise, phrase) => promise.then(_ => printPhrase227(phrase, el)), 
        Promise.resolve()
    );
}
function run7() {
    let phrases = [
        "Search Foyda",
    ];
    printPhrases7(phrases, $('#foyda'));
}

setInterval(() => {
  run();
  run2();
  run3();
  run3val();
  run4();
  run5();
  run6();
  run7();
  
}, 5000);