/**
 * LES VARIABLES
 */
const inputTitle = document.getElementById('inputTitle')
const inputAuthor = document.getElementById('inputAuthor')
const inputYear = document.getElementById('inputYear')
const inputGenre = document.getElementById('inputGenre')
const addFilm = document.getElementById('add-film')
const films = document.getElementById('films')
const inputSearch = document.getElementById('inputSearch')
const inputContent = document.getElementById('inputContent')
const ajout = document.getElementById('ajout')

ajout.addEventListener('click', ()=>{

   inputContent.classList.toggle('none')
})

//CLICK PERMETTANT D'AJOUTER UN film DANS LA LISTE
addFilm.onclick = ajoutFilm


//INITIALISATION DE LA LISTE DES filmS ET LE SAUVEGARDE LOCAL
let filmData = getLocalData()

//FONCTION PERMETTANT DE SAUVEGARDER UN film EN LOCAL
function saveLocalData(data){

    if (typeof(localStorage) !== "undefined") {
        
        return localStorage.setItem("films", JSON.stringify(data))
    }
}

//FONCTION PERMETTANT DE RECUPERER LES filmS SAUVEGARDER EN LOCAL
function getLocalData(){

    if (typeof(localStorage) !== "undefined") {
        
        return JSON.parse(localStorage.getItem("films")) || []
    }else{
        return []
    }
}

/**
 * FONCTION QUI GERE LA LISTE DES filmS ET LES ACTIONS A EFFECTUER
 * MODIFIER - SUPPRIMER
 */
refreshfilm()
function refreshfilm(){

    films.innerHTML = ''

    filmData.forEach(film =>{
        const li = document.createElement('li')
        li.className = "film"

        const spanTitle = document.createElement('span')
        spanTitle.className = "title"
         const spanAuthor = document.createElement('span')
        spanAuthor.className = "author"
         const spanYear = document.createElement('span')
        spanYear.className = "year"
         const spanGenre = document.createElement('span')
        spanGenre.className = "genre"

        const supprimer = document.createElement('button')
        supprimer.className = "btn btn-danger"
        supprimer.innerText = "Supprimer"

        const modifier = document.createElement('button')
        modifier.onclick = ()=> toggleUpdate(film)
        if (film.isUpdating) {
            //Modifier un film
            const inputTitle = document.createElement('input')
            const inputAuthor = document.createElement('input')
            const inputYear = document.createElement('input')
            const inputGenre = document.createElement('input')

            inputTitle.value = film.nameTitle
            inputAuthor.value = film.nameAuthor
            inputYear.value = film.nameYear
            inputYear.type = "number"
            inputGenre.value = film.nameGenre
            

            inputTitle.onchange = ()=> handleUpdateTitle(event, film)
            inputAuthor.onchange = ()=> handleUpdateAuthor(event, film)
            inputYear.onchange = ()=> handleUpdateYear(event, film)
            inputGenre.onchange = ()=> handleUpdateGenre(event, film)


            modifier.innerText = "Sauvegarder"
            modifier.className = "btn btn-save"

            li.appendChild(inputTitle)
            li.appendChild(inputAuthor)
            li.appendChild(inputYear)
            li.appendChild(inputGenre)
        }else{
            spanTitle.innerText = film.nameTitle
            spanAuthor.innerText = film.nameAuthor
            spanYear.innerText = film.nameYear
            spanGenre.innerText = film.nameGenre
            modifier.className = "btn btn-primary"
            modifier.innerText = "Modifier"

            li.appendChild(spanTitle)
            li.appendChild(spanAuthor)
            li.appendChild(spanYear)
            li.appendChild(spanGenre)
        }

        supprimer.onclick = ()=> handleSupprimer(film)
        
        li.appendChild(modifier)
        li.appendChild(supprimer)
        films.appendChild(li)

        
    })

}

/**
 * 
 * @param {Element} film 
 * FONCTION PERMETTANT DE CHANGER LA VALEUR DE isUpdating EN TRUE
 */
function toggleUpdate(film){

    const index = filmData.findIndex(art => art._id === film._id)
    filmData[index].isUpdating = !film.isUpdating

    refreshfilm()
    saveLocalData(filmData)
}

/**
 * 
 * @param {Event} event 
 * @param {Element} film 
 * FONCTION PERMETTANT DE MODIFIER LE TITRE D'UN film
 */
function handleUpdateTitle(event, film){

    const name = event.target.value.trim()
    if (name) {
        film.nameTitle = name
        const index = filmData.findIndex(art => art._id === film._id)
        filmData[index] = film
        
    }

    saveLocalData(filmData)
}

/**
 * 
 * @param {Event} event 
 * @param {Element} film 
 * FONCTION PERMETTANT DE MODIFIER LE REALISATEUR D'UN film
 */
function handleUpdateAuthor(event, film){

    const name = event.target.value.trim()
    if (name) {
        film.nameAuthor = name
        const index = filmData.findIndex(art => art._id === film._id)
        filmData[index] = film
        
    }

    saveLocalData(filmData)
}

/**
 * 
 * @param {Event} event 
 * @param {Element} film 
 * FONCTION PERMETTANT DE MODIFIER L'ANNEE D'UN film
 */
function handleUpdateYear(event, film){

    const name = event.target.value.trim()
    if (name) {
        film.nameYear = name
        const index = filmData.findIndex(art => art._id === film._id)
        filmData[index] = film
        
    }

    saveLocalData(filmData)
}

/**
 * 
 * @param {Event} event 
 * @param {Element} film 
 * FONCTION PERMETTANT DE MODIFIER LE GENRE D'UN film
 */
function handleUpdateGenre(event, film){

    const name = event.target.value.trim()
    if (name) {
        film.nameGenre = name
        const index = filmData.findIndex(art => art._id === film._id)
        filmData[index] = film
        
    }

    saveLocalData(filmData)
}

/**
 * 
 * @param {id} param0 
 * FONCTION PERMETTANT DE SUPPRIMER UN film
 */
function handleSupprimer({_id}){
    filmData = filmData.filter(film => film._id !==_id )

    refreshfilm()
    saveLocalData(filmData)
}


//FONCTION PERMETTANT DE DEFINIR UN film
function ajoutFilm(){

   let valueTitle = inputTitle.value.toUpperCase().trim()
   let valueAuthor = inputAuthor.value.toUpperCase().trim()
   let valueYear = inputYear.value.trim()
   let valueGenre = inputGenre.value.toUpperCase().trim()
    
    if (valueTitle && valueAuthor && valueYear && valueGenre) {
        
        const film = {

            _id  : Math.round(Math.random()*858541),
            nameTitle : valueTitle,
            nameAuthor : valueAuthor,
            nameYear : valueYear,
            nameGenre : valueGenre,
            isUpdating : false,
            createdAt : new Date()
        }
        filmData.push(film)
        refreshfilm()
        saveLocalData(filmData)
    }
    
    inputTitle.value = ""
    inputAuthor.value = ""
    inputYear.value = ""
    inputGenre.value = ""

}

/**
 * RECHERCHE ET FILTRAGE
 */
inputSearch.addEventListener("keyup", (e)=>{

   const searchLetters = e.target.value.toUpperCase().trim()
   const films = document.querySelectorAll('.film')

   filterFilms(searchLetters, films)
})

/**FONCTION DE FILTRAGE
 * 
 * @param {inputVAlue} letters 
 * @param {HTMLElements} elements 
 */
function filterFilms(letters, elements){

   if (letters.length>2) {
      
      for (let index = 0; index < elements.length; index++) {
         const element = elements[index];

         if (element.childNodes[0].textContent.toUpperCase().includes(letters) || 
            element.childNodes[1].textContent.toUpperCase().includes(letters) ||
            element.childNodes[2].textContent.toUpperCase().includes(letters) ||
            element.childNodes[3].textContent.toUpperCase().includes(letters)) {

            element.style.display = "flex"
         }else{
            element.style.display = "none"
         }
         
      }
   }
      
}