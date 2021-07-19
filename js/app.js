
function addDelegateEventListener(parentElement,
    childSelector,
    eventType,
    callback,
    useCapture) {
    if (!parentElement) {
        return;
    }

    useCapture = typeof useCapture === 'boolean' ? useCapture : false;

    parentElement.addEventListener(eventType,
        function(e) {
            var target = e.target;
            for (target; target && target !== this; target = target.parentNode) {
                // loop parent nodes from the target to the delegation node
                if (target.matches(childSelector)) {
                    callback(target, e);
                    break;
                }
            }
        },
        useCapture);
    }

// iffe function of the code 
(function(){
    // get elemnent id is faster than queryselect
    const submitSearch = document.getElementById('submit-search'); 
    const headerSearchButton = document.getElementById('header-search-button');
   
    function toggleSearchTextboxVisiblity() {
    
        const headerSearcContainer = document.getElementById('header-search-container'); 
        const searchContainer = document.getElementById('search-container');

        if (headerSearcContainer.classList.contains('d-none')){ // if headersearch contains d-none as a class
            headerSearcContainer.classList.remove('d-none'); // then remove the class
        } else { //if not
            headerSearcContainer.classList.add('d-none'); // then add d-none as the class
        }

        if (searchContainer.classList.contains('d-none')){
            searchContainer.classList.remove('d-none');
        } else {
            searchContainer.classList.add('d-none');
        }
    }

// function to get data from scryfall
    function getApiDataFromScryfall(searchText) {
        window.fetch(`https://api.scryfall.com/cards/autocomplete?q=${searchText}`, // fetching data from scryfall
        )
        .then(response => response.json())
        .then(result => {
            console.log(result);
            let searchFetchUnorderedList = document.getElementById('autocomplete-results-unordered-list');
            for(let i = 0; i < result.data.length; i++) {
                let searchFetchList = document.createElement('li'); // creates list 
                let anchorElement = document.createElement('a'); // creates anchor 
                anchorElement.textContent = result.data[i]; // assign the indivudual value of i to the text that is printed 
                searchFetchList.appendChild(anchorElement); // add anchor to list item  
                searchFetchUnorderedList.appendChild(searchFetchList); // add list item to unordered lsit 
                }
        }); // END OF FETCH 
    }


// function to do something if there is no text in the search field 
function searchClickedButNoTextInBar() {
    alert('Search term requires, you dummy!')
}

// function for the search boxes to work when the search button is cliced 
function searchBoxesDoingStuff(searchText)
{
    if(searchText) {
        toggleSearchTextboxVisiblity();
        getApiDataFromScryfall(searchText);
    } else {
        searchClickedButNoTextInBar()
    }
}
    submitSearch.addEventListener('click', () => { 
        let searchText = document.getElementById('middle-search-text').value;
        searchBoxesDoingStuff(searchText)
    });

    headerSearchButton.addEventListener('click', () => {
        let searchText = document.getElementById('top-search-text').value;
        if(searchText) {
            getApiDataFromScryfall(searchText);
        }
        else {
            searchClickedButNoTextInBar()
        }
    });

})();

/***

let anchorElement = document.createElement('a');
anchorElement.id = 'card-name<djld>';

div.appendChild(anchorElement);
*/

