$(document).ready(function () {
    const letterToNumber = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
        j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17,
        r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26,
        A: 27, B: 28, C: 29, D: 30, E: 31, F: 32, G: 33, H: 34, I: 35, J: 36, K: 37,
        L: 38, M: 39, N: 40, O: 41, P: 42, Q: 43, R: 44, S: 45, T: 46, U: 47, V: 48,
        W: 49, X: 50, Y: 51, Z: 52
    };

    const input = $('#name-input');
    const numberDisplay = $('#number-display');

    // Create container for "Lucky 6 Numbers"
    const luckyNumbersContainer = $('<div class="lucky-numbers-container"></div>');
    const luckyHeader = $('<h2>Lucky Numbers</h2>');
    const luckyNumbers = $('<div class="lucky-numbers"></div>');
    luckyNumbersContainer.append(luckyHeader).append(luckyNumbers);
    $('body').append(luckyNumbersContainer);

    // Calculate lucky numbers based on the algorithm
    const calculateLuckyNumbers = (text) => {
        const letters = text.split("");
        const totalLetters = letters.length;
        const letterCounts = {};
        const numbers = [];

        // Count occurrences of each letter
        letters.forEach(char => {
            const letter = char.toLowerCase();
            if (/[a-z]/.test(letter)) {
                letterCounts[letter] = (letterCounts[letter] || 0) + 1;
            }
        });

        // Generate numbers for each letter
        letters.forEach(char => {
            const letter = char.toLowerCase();
            if (/[a-z]/.test(letter)) {
                const baseNumber = letterToNumber[char];
                if (letterCounts[letter] > 1) {
                    numbers.push(Math.round(baseNumber + baseNumber / totalLetters));
                } else {
                    numbers.push(baseNumber);
                }
            }
        });

        // Adjust numbers for more than 6 letters
        if (totalLetters > 6) {
            for (let i = 6; i < numbers.length; i++) {
                numbers[i % 6] += Math.round(numbers[i] / totalLetters);
            }
        }

        // Ensure unique numbers and cap at 50
        const uniqueNumbers = [];
        numbers.slice(0, 6).forEach(num => {
            while (uniqueNumbers.includes(num)) {
                num += totalLetters; // Add totalLetters to resolve duplicates
            }
            uniqueNumbers.push(num > 50 ? num % 50 : num); // Cap the number at 50
        });

        return uniqueNumbers.sort((a, b) => a - b); // Return sorted unique 6 numbers
    };

    // Display lucky numbers with animation
    const displayLuckyNumbers = (numbers) => {
        luckyNumbers.empty(); // Clear previous numbers
        numbers.forEach((num, index) => {
            const numElement = $('<div class="number-box"></div>').text(num).css({
                opacity: 0,
                transform: 'scale(0)'
            });

            // Animate number easing in
            setTimeout(() => {
                numElement.css({
                    opacity: 1,
                    transform: 'scale(1)',
                    transition: 'transform 0.5s ease, opacity 0.5s ease'
                });
            }, index * 1000); // Delay for each number (3 seconds)

            luckyNumbers.append(numElement);
        });
    };

    // Input handler
    input.on('input', function () {
        const text = $(this).val();
        numberDisplay.empty(); // Clear previous numbers

        [...text].forEach((char, index) => {
            const number = letterToNumber[char] || '';
            if (number) {
                const numberElement = $('<div class="number"></div>');

                // Spin effect from 0 to the number
                setTimeout(() => {
                    numberElement.addClass('visible');
                    let current = 0;

                    const interval = setInterval(() => {
                        if (current === number) {
                            clearInterval(interval); // Stop when the target number is reached
                        } else {
                            current++;
                            numberElement.text(current);
                        }
                    }, 90); // Speed of spin
                }, index * 300); // Stagger effect for each number

                numberDisplay.append(numberElement);
            }
        });

        // Calculate and display Lucky 6 Numbers
        const luckyNumbersList = calculateLuckyNumbers(text);
        displayLuckyNumbers(luckyNumbersList);
    });

    // Adjust "Lucky 6 Numbers" container position
    luckyNumbersContainer.css({
        position: 'absolute',
        top: '45%', // Adjusted position
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    });
});
