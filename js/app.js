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
        function (e) {
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
(function () {
    // get elemnent id is faster than queryselect
    const submitSearch = document.getElementById('submit-search');
    const headerSearchButton = document.getElementById('submit-header-search');
    const tcgLink = document.getElementById('tcg-link');
    const cardmarketLink = document.getElementById('card-market-link');
    function toggleSearchTextboxVisiblity() {

        const headerSearcContainer = document.getElementById('header-search-container');
        const searchContainer = document.getElementById('search-container');

        if (headerSearcContainer.classList.contains('d-none')) { // if headersearch contains d-none as a class
            headerSearcContainer.classList.remove('d-none'); // then remove the class
        } else { //if not
            headerSearcContainer.classList.add('d-none'); // then add d-none as the class
        }

        if (searchContainer.classList.contains('d-none')) {
            searchContainer.classList.remove('d-none');
        } else {
            searchContainer.classList.add('d-none');
        }
    }

    function handleResultSelection() {
        // hide visibility of the search results when one is clicked
        console.log(anchorElement.id)
    }

    function toggleLinkvisibility() {
        if (tcgLink.classList.contains('d-none')) {
            // if it contains d-none, then remove it
            tcgLink.classList.remove('d-none');
            cardmarketLink.classList.remove('d-none');
        } else {
            tcgLink.classList.add('d-none');
            cardmarketLink.classList.add('d-none');
        }
    }



    function clearAutocompleteResults() {
        document.getElementById('header-search-text').value = '';
        document.getElementById('search-text').value = '';
        document.getElementById('autocomplete-results-list').innerHTML = '';
    }

    function clearCardDetail() {
        document.getElementById('card-image').src = '';
        document.getElementById('card-name').innerHTML = '';
        document.getElementById('card-type').innerHTML = '';
        document.getElementById('oracle-text').innerHTML = '';
        document.getElementById('power-and-toughness').innerHTML = '';
        document.getElementById('power-and-toughness').innerHTML = '';
        document.getElementById('rarity').innerHTML = '';
        document.getElementById('artist').innerHTML = '';
        document.getElementById('flavor-text').innerHTML = '';
        document.getElementById('card-set').innerHTML = '';
        tcgLink.classList.add('d-none');
        cardmarketLink.classList.add('d-none');
    }



    // function to get data from scryfall
    function getApiDataFromScryfall(searchText) {
        clearCardDetail();
        clearAutocompleteResults();
        window.fetch(`https://api.scryfall.com/cards/autocomplete?q=${searchText}` // fetching data from scryfall
        )
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.data.length === 0) {
                    alert('Please type a real card name in');
                }
                let searchFetchUnorderedList = document.getElementById('autocomplete-results-list'); // get the id of the unordered list 

                for (let i = 0; i < result.data.length; i++) {
                    let cardName = result.data[i];
                    let searchFetchList = document.createElement('li'); // creates list 
                    anchorElement = document.createElement('a'); // creates anchor 

                    anchorElement.textContent = cardName; // assign the indivudual value of i to the text that is printed 
                    anchorElement.id = cardName.replace(' ', '+');
                    let cardId = anchorElement.id
                    searchFetchList.appendChild(anchorElement); // add anchor to list item  
                    searchFetchUnorderedList.appendChild(searchFetchList); // add list item to unordered lsit 

                    // click event so that when you click the result card you want, it will then run a seperate function
                    anchorElement.addEventListener('click', e => {
                        // hides all of the div list when stuff is clicked, then store which one is clicked into a variable 
                        console.log(cardId);
                        toggleLinkvisibility();
                        clearAutocompleteResults();
                        getCardDetailsFromScryfall(cardId);


                    }
                    )
                }
            }); // END OF FETCH 
    }

    // fetch the card symbols from scryfall
    // then I want to run a for loop, and for each mana symbol in card name, replace with the actual mana symbol 



    function getCardDetailsFromScryfall(cardId) {
        fetch(`https://api.scryfall.com/cards/named?exact=${cardId}`) // fetch data from scryfall
            .then(response => response.json())
            .then(result => {
                console.log(result);

                function getCardSymbolsFromScryfall() {
                    fetch(`https://api.scryfall.com/symbology`)
                        .then(response => response.json())
                        .then(symbolResults => {
                            console.log(symbolResults);
                            x = symbolResults.data['0'].english;
                            console.log(x);
                        })
                }

                // card symbol stuff, might need refactored later
                getCardSymbolsFromScryfall()
                /*            for(let i = 0; i < result.length; i++) {
                                var replacedOracleText = result.oracle_text.replaceAll('{T}', symbolResults.data['0'].english)
                            }
                */

                // code now, refactor this part later
                if (result.oracle_text.includes('{T}')) {
                    var replacedOracleText = result.oracle_text.replaceAll('{T}', 'Tap');
                } else {
                    replacedOracleText = result.oracle_text;
                }

                // card oracle text
                let oracleText = document.getElementById('oracle-text'); // establish row 1 column 2 into javascript
                // if oracle text has tap image

                if (result.oracle_text) {
                    let htmlCardOracleText = document.createTextNode(replacedOracleText); // create the text of the oracle text 
                    oracleText.appendChild(htmlCardOracleText); // append row 1 column 3 with the oracle text 
                } else {
                    let noOracleText = document.createTextNode(result.name + ' has no oracle text :(');
                    oracleText.appendChild(noOracleText);
                }



                // card image
                let imageLink = result.image_uris.normal;
                let cardImage = document.getElementById('card-image');
                cardImage.src = imageLink;

                // card name and mana cost 
                let cardNameAfterSearch = document.getElementById('card-name');
                let htmlCardNameAfterSearch = document.createTextNode(result.name + " " + result.mana_cost);
                cardNameAfterSearch.appendChild(htmlCardNameAfterSearch);



                // power and toughness
                if (result.power && result.toughness) {
                    let powerAndToughness = document.getElementById('power-and-toughness');
                    let htmlPowerAndToughness = document.createTextNode(result.power + "/" + result.toughness);
                    powerAndToughness.appendChild(htmlPowerAndToughness);
                }

                // card type
                let cardTypeAfterSearch = document.getElementById('card-type');
                let htmlCardTypeAfterSearch = document.createTextNode(result.type_line);
                cardTypeAfterSearch.appendChild(htmlCardTypeAfterSearch);

                // flavor text
                let flavorText = document.getElementById('flavor-text');
                if (result.flavor_text) {
                    let htmlFlavorText = document.createTextNode(' "' + result.flavor_text + '"');
                    flavorText.appendChild(htmlFlavorText);
                } else {
                    let noFlavorText = document.createTextNode(result.name + ' has no flavor text :(');
                    flavorText.appendChild(noFlavorText);
                }

                // set card is from as well as link to TCGplayer
                let cardSet = document.getElementById('card-set');
                debugger;
                cardSet.textContent = 'Sets: ' + result.set_name;

                // links
                tcgLink.href = result.purchase_uris.tcgplayer;
                cardmarketLink.href = result.purchase_uris.cardmarket;

                //rarity 
                let rarity = document.getElementById('rarity');
                rarity.textContent = result.rarity;

                // artist 
                let artist = document.getElementById('artist');
                artist.textContent = 'Artist: ' + result.artist;
            })
    }

    // function to do something if there is no text in the search field 
    function searchClickedButNoTextInBar() {
        alert('Search term required, you dummy!')
    }

    // function for the search boxes to work when the search button is cliced 
    function searchBoxesDoingStuff(searchText) {
        if (searchText) {
            toggleSearchTextboxVisiblity();
            getApiDataFromScryfall(searchText);
        } else {
            searchClickedButNoTextInBar()
        }
    }
    submitSearch.addEventListener('click', () => {
        let searchText = document.getElementById('search-text').value;
        searchBoxesDoingStuff(searchText)
    });

    headerSearchButton.addEventListener('click', () => {
        let searchText = document.getElementById('header-search-text').value;
        if (searchText) {
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

