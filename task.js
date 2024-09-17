const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';


function renderColumn(title, users) {
    
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('column');
    const h3 = document.createElement('h3');
    h3.textContent = title;
    columnDiv.appendChild(h3);
    
    users.forEach((user) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    const nameP = document.createElement('p');
    nameP.textContent = `Name: ${user.name}`;
    cardDiv.appendChild(nameP);
    const usernameP = document.createElement('p');
    usernameP.textContent = `Username: ${user.username}`;
    cardDiv.appendChild(usernameP);
   
    const websiteP = document.createElement('p');
    websiteP.textContent = `Website: ${user.website}`;
    cardDiv.appendChild(websiteP);
    columnDiv.appendChild(cardDiv);
    });
    
    const wrapperDiv = document.getElementById('wrapper');
    wrapperDiv.appendChild(columnDiv);

}


const dataParser = (data) => {

    //initialize empty users and tlds..
    let users = [];
    let tlds = new Set();

    //extract all the unique tlds..
    data.forEach((record) => {
        let title = record.website.split('.')[1];
        if(!tlds.has(title)){
            tlds.add(title);
        }
    })

    //users extraction with respect to its tld..
    tlds.forEach((tld) => {
        users = data.filter(user => user.website.split('.')[1] === tld);
        renderColumn(tld, users);
    })
}

//fetch the data using endpoint and send it to data parser..
const fetchAndParse = () => {

    fetch(USERS_ENDPOINT)
        .then(response => response.json()) //to extract the json content..
        .then(data => dataParser(data)) //send to the parser..
        .catch((_err) => {
            console.log(`error: ${_err}`);
        })
}

fetchAndParse();