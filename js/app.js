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

