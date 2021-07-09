// basic iffe function
/*
(function(dom){
    var divElement = dom.getElementById('content-search');
    divElement.classList.add('d-none');
    divElement.classList.remove('d-none');

    var submitSearchButton = dom.getElementById('submit-search');
    submitSearchButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Search Click!');
    });
})()

*/





// get elemnent id is faster than queryselect
const toggleBtn = document.getElementById('submit-search'); 
const divList = document.getElementById('search-container');
const topSearch = document.getElementById('search-bar-top');
const topBtn = document.getElementById('top-button-search'); 

// header-search
// search-container

function toggleSearchTextboxVisiblity() {
    const headerSearch = document.getElementById('header-search'); 
    const searchContainer = document.getElementById('search-container');

    if (headerSearch.classList.contains('d-none')){ // if headersearch contains d-none as a class
        headerSearch.classList.remove('d-none'); // then remove the class
    } else { //if not
        headerSearch.classList.add('d-none'); // then add d-none as the class
    }

    if (searchContainer.classList.contains('d-none')){
        searchContainer.classList.remove('d-none');
    } else {
        searchContainer.classList.add('d-none');
    }
}

toggleBtn.addEventListener('click', () => { // when button is clicked
    toggleSearchTextboxVisiblity(); // activate the function togglesearchtextbox visibility
})



/***

let anchorElement = document.createElement('a');
anchorElement.id = 'card-name<djld>';

div.append(anchorElement);
*/