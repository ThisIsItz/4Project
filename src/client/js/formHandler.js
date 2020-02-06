import {checkForURL} from "./urlChecker";

function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value
    let myForm = document.getElementById('form')
    checkForURL(formText)

    const getData = async (url = 'http://localhost:3000/test', data = {}) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data)
        });

        let newData = await response.json();
        try {
            console.log(newData)
            document.getElementById('results').innerHTML = '<div><strong>Your results:</div>' + newData.polarity;
            return newData
        } catch(error) {
            console.log('error',error);
        }
    }
    getData(undefined, {url: formText});
}


export { handleSubmit }
