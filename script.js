document.addEventListener('DOMContentLoaded', () => {

    let isRussian = false;
    
    const title = document.querySelector('header');
    const button = document.querySelector('.btn');
    // Language btns
    const ru = document.querySelector('#ru');
    const eng = document.querySelector('#en');
    const quote = document.querySelector('.quote-text'); 
    const cite = document.querySelector('.quote-author');
    const container = document.querySelector('.container');
    
    ru.addEventListener('click', () => {
        ru.classList.add('active');
        eng.classList.remove('active');
        isRussian = true;
        newQuote();
    });

    eng.addEventListener('click', () => {
        eng.classList.add('active');
        ru.classList.remove('active');
        isRussian = false;
        newQuote();
    });

    // Delete container animation  
    // container.addEventListener('animationend' || 'animationcancel', () => {
        
    //     container.classList.remove('animate');
    // });

    function randomQuote(data) {
        return data[ Math.floor( Math.random() * data.length) ];
    }

    async function newQuote() {
        let url;

        button.classList.add("loading");
        // button.innerText = "Loading Quote...";
        // button.innerText = "Загрузка цитаты...";

        if (isRussian) {
            button.innerText = "Загрузка цитаты...";
            url = "quotes.json";
            title.textContent = "Случайная цитата";
        } else {
            title.textContent = "Random Quote";
            button.innerText = "Loading Quote...";
            url = "https://api.quotable.io/random";
        }
        // isRussian ? url = "quotes.json": url = "https://api.quotable.io/random";
        
        const response = await fetch(url);

        // When we get an answer, we start animation
    
        if (response.ok) {    
            let data = await response.json();
            // console.log(data);

            container.classList.add('animate'); 

            quote.textContent = isRussian ? randomQuote(data).content : data.content;
            cite.textContent = isRussian ? randomQuote(data).author : data.author;

            button.classList.remove("loading");

            isRussian ? button.textContent = "Новая цитата": button.textContent = "New Quote";

            // button.innerText = "New Quote";
            //button.innerText = "New Quote";
        } else {
            quote.textContent = 'Something went wrong';
        }
    }
    
    button.addEventListener('click', newQuote);

    newQuote();
});
