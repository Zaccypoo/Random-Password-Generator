const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"];

async function generatePassword(passwordLength) {
    let password = '';
    const requestBody = {
        jsonrpc: "2.0",
        method: "generateIntegers",
        params: {
            apiKey: "e5fa63b9-e27a-406b-86dd-e8acc7fecd64",
            n: passwordLength,
            min: 0,
            max: characters.length - 1,
            replacement: true
        },
        id: 1
    };

    try {
        const response = await fetch("https://api.random.org/json-rpc/4/invoke", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        if (data.result && data.result.random && data.result.random.data) {
            const randomIndices = data.result.random.data;
            for (const index of randomIndices) {
                password += characters[index];
            }
        } else {
            throw new Error("Invalid response from Random.org");
        }
    } catch (error) {
        console.error("Error fetching random data:", error);
        // Fallback to pseudo-random in case of an error
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
    }

    return password;
}

async function generatePasswords() {
    const password1 = await generatePassword(12);
    const password2 = await generatePassword(12);
    
    document.getElementById('password-1').value = password1;
    document.getElementById('password-2').value = password2;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.generate-passwords').addEventListener('click', generatePasswords);
});
