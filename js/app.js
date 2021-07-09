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

    submitSearch.addEventListener('click', toggleSearchTextboxVisiblity);
})();

/***

let anchorElement = document.createElement('a');
anchorElement.id = 'card-name<djld>';

div.append(anchorElement);
*/