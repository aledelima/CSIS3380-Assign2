/* Shows number of existing contats on the list */
function updateCounter() {

    const numOfContacts = contacts.length;
    const h3Element = document.querySelector('.page-header.cf h3');
    h3Element.innerHTML = `Total: ${numOfContacts}`;
}

/* Render numerical links for the pages of pagination */
function makePagesSummary() {

    const numOfPages = Math.ceil(contacts.length/10);
    const ul = document.querySelector('ul.pagination');
    for (let i=0; i<numOfPages; i++) {
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('data-page-number', `${i}`); // property data for page number
        a.classList.add('pagination');
        a.textContent = `${i+1}`;
        a.addEventListener('click', pageNumberClick); // event handler for each link
        const li = document.createElement('li');
        li.classList.add('pagination');
        li.textContent = "  ";
        li.appendChild(a);
        ul.appendChild(li);
    }
}

/* Extracts a slice of the array of JSON objects
   that contains the list of contacts */
function selectContacts(pageNumber) {

    //Protects against empty lists
    if (contacts.length === 0 || contacts === undefined) return []; 
    
    // const pageNumber = event.target.dataset.pageNumber;
    const maxArrIndex = contacts.length-1;
    let iniIndex = pageNumber*10;  //Initial Index
    let finIndex = iniIndex + 9;   //Final Index
    //Protects when less than 10 contacts on a slice
    if (maxArrIndex < finIndex) finIndex = maxArrIndex; 

    const slice = contacts.slice(iniIndex, finIndex+1);
    return slice;
}

/* Conversion of a JSON object to the html format 
   to be rendered by the browser. */
function renderContact(contact) {

    // Creation of an appropriate date format
    const date = () => {
        dateObj = new Date(contact.registered.date);
         return `${dateObj.getMonth()+1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
    }  
    return `<li class="contact-item cf">
                <div class="contact-details">
                    <img class="avatar" src="${contact.picture.thumbnail}">
                    <h3>${contact.name.first} ${contact.name.last}</h3>
                    <span class="email">${contact.email}</span>
                </div>
                <div class="joined-details">
                    <span class="date">Joined ${date()}</span>
                </div>
            </li>
            `
}

/* Handles the DOM to list the contacts 
   corresponding to the page required */
function renderAPage(pageNumber) {

    //Clear current contact list
    const ul = document.querySelector('ul.contact-list');
    ul.innerHTML = "";

    contactsPage = selectContacts(pageNumber);
    let html = "";
    //JSON to html format
    contactsPage.forEach(e => {
        html += renderContact(e);
    });
    //Update page rendering
    ul.innerHTML = html;
}

/* Captures page number clicked and render the corresponding one */
function pageNumberClick(event) {

    event.preventDefault();

    const currLink = event.target;
    const pageLinks = document.querySelectorAll('.pagination li a.selected');
    pageLinks.forEach(e => {
        e.classList.remove('selected');
    });
    currLink.classList.add('selected');
    
    const pageNumber = currLink.dataset.pageNumber;
    renderAPage(pageNumber);
}

/* Triggers the very first page rendering */
function renderFirstPage() {

    const clickEvent = new MouseEvent('click');
    const firstPageLink = document.querySelector('.pagination li a');
    firstPageLink.dispatchEvent(clickEvent);
}

/* Section for setting up Events Triggering */
document.addEventListener('DOMContentLoaded', updateCounter);
document.addEventListener('DOMContentLoaded', makePagesSummary);
document.addEventListener('DOMContentLoaded', renderFirstPage);