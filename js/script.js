/* Shows number of existing contats on the list */
function updateCounter() {

    const numOfContacts = contacts.length;
    const h3Element = document.querySelector('.page-header.cf h3');
    h3Element.innerHTML = `Total: ${numOfContacts}`;
}

/* Section for setting up Events Triggering */
document.addEventListener('DOMContentLoaded', updateCounter);