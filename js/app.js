
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

// basic iffe function
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
        {
            cache: 'no-cache'

        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        }); // END OF FETCH 
        // to make the form have an auto complete, the result part above is what stores the array of cards 

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
 

// refactor fetch to function 


/* what chris did for the fetch 
let searchText = 'thal';

window.fetch(`https://api.scryfall.com/cards/autocomplete?q=${searchText}`, // $ string interpritation that basically combines the link with input 
    {
        cache: 'no-cache'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        var cardNames = result.data // parse converts json data to work with javascript 
      fetch
    });

    */
