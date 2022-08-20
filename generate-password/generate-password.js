function generatePassword() {
    const input = document.getElementById('input')
    console.log('Button clicked')
    function randomString(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    input['value'] = randomString(8);

    function copyTextToClipboard(text) {

        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }
    copyTextToClipboard(input.value);

}
const button = document.getElementById("button"); //get element by id from DOM tree
button.addEventListener("click", generatePassword);
