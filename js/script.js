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

/* Captures page number clicked and render the corresponding one */
function pageNumberClick(event) {

    event.preventDefault();
}

/* Section for setting up Events Triggering */
document.addEventListener('DOMContentLoaded', updateCounter);
document.addEventListener('DOMContentLoaded', makePagesSummary);