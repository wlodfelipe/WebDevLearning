
/*adiciona um eventListener que só deixará essas funçoes carregarem quando o DOM
for completamente carregado, assim evitando das funçoes atropelarem a estrutura do site.
(da para adicionar outras funçoes que precisam disso aqui tambem, como das colunas)*/
document.addEventListener("DOMContentLoaded", function () {
    const colorInput = document.getElementById('colors');
    const body = document.querySelector('body');

    colorInput.addEventListener('input', () => {
        const selectedColor = colorInput.value;
        body.style.backgroundColor = selectedColor;
        saveBackgroundColor(selectedColor);
    });

    //vai salvar a cor escolhida pelo usuario dentro do localstorage, pegando a propriedade do background-color
    function saveBackgroundColor(hexadecimalColor) {
        localStorage.setItem("background-color", hexadecimalColor);
    }

    // vai pegar a cor salva no local storage(se tiver) e rodar ela toda vez q o site atualizar
    window.addEventListener('load', () => {
        const savedColor = localStorage.getItem("background-color");
        if (savedColor) {
            body.style.backgroundColor = savedColor;
            colorInput.value = savedColor;
        }
    });
});

// ----------  somente a parte da coluna ------------------
// em progresso
