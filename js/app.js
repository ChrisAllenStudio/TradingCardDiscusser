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

(function(dom){
    var divElement = dom.getElementById('content-search');
    divElement.classList.add('d-none');
    divElement.classList.remove('d-none');

    var submitSearchButton = dom.getElementById('submit-search');
    submitSearchButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Search Click!');
    });
})(document)

