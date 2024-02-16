import { checkDetail, filmData, filmDetails, films, select1, select1Children, select2, select2Children, section } from "./variables.js"

export const FILM = {

    /**
     * Cette fonction gère toutes les fonctionnalités de l'application
     */
    initFilm : function(){

        for (let index = 0; index < filmData.length; index++) {
    
            let films = filmData[index]
           
            FILM.displayFilm(films)
       }
    
       checkDetail.onmouseup = FILM.detailChecked
       films.onmouseover = FILM.survolFilms
       films.onmouseout = FILM.finSurvolFilms
       films.onclick = FILM.filmClick
       section.onclick = FILM.sectionClick
       filter.onkeyup = FILM.filterSearch
    },
    
    /**
     * 
     * @param {Element} film 
     * Cette fonction permet l'affichage des films dans le catalogue
     */
    displayFilm : function(film){
    
            const filmItem = `
                <div class="film-item" id="${film.id}">
                    <img src="${film.image}" alt="">
                    <h4>${film.title}</h4>
                </div>
            
            `
            films.innerHTML += filmItem
    
    },
    
    /**
     * 
     * @param {Event} event 
     * Cette fonction permet d'afficher ou non le block des details
     */
    detailChecked : function(event){
        
        const inputCheck = event.target
    
        if (!inputCheck.checked) {
            filmDetails.style.display = "block"
        }else{
            filmDetails.style.display = "none"
        }
    },
    
    /**
     * 
     * @param {Event} event 
     * @returns {}
     * Cette fonction permet d'afficher les details lors du survol d'un film
     */
    survolFilms : function(event){
    
        const element = event.target.parentNode
        const idFilm = element.id
        let position
    
        if (idFilm == "catalogue" || idFilm == "films") {
            return
        }else if (idFilm.length == 1) {
            position = idFilm[0]
        }else if (idFilm.length == 2) {
            position = idFilm[0] + idFilm[1]
        }else{
            return
        }
        
        let detail = filmData[position].details
       
        filmDetails.innerHTML = detail
    },
    
    //Lorsqu'on quite un film, on cache les details
    finSurvolFilms : function (){
    
        filmDetails.innerHTML = ""
    },
    
    /**
     * 
     * @param {Event} event 
     * Cette fonction permet de faire le chois d'un film en le deplacant dans le top 2
     */
    filmClick : function(event){
    
        let film = event.target.parentNode
    
        film.onmouseover = FILM.survolFilms
        film.onmouseout = FILM.finSurvolFilms
    
        if (select1Children.length === 1) {
            
            select1.insertBefore(film, select1Children[0])
            select1Children[1].classList.add('sticky')
    
        }else if (select2Children.length === 1) {
            select2.insertBefore(film, select2Children[0])
            select2Children[1].classList.add('sticky')
        }else{
            alert('Vous avez dejà choisi 2 films !')
        }
    },
    
    /**
     * 
     * @param {Event} event 
     * Cette fontion permet d'enlever le film choisis dans le top 2
     */
    sectionClick : function(event){
    
        const film = event.target.parentNode
        const select = film.parentNode
        const selectChildren = select.childNodes
       
        if (selectChildren[0].className == "film-item") {
            
            let copyFilm = selectChildren[0]
            select.removeChild(copyFilm)
            films.appendChild(copyFilm)
        }
        selectChildren[0].classList.remove('sticky')
    },
    
    /**
     * 
     * @param {Event} event 
     * Cette fonction permet de filtrer un film par caractères
     */
    filterSearch : function (event){
    
        const value = event.target.value.toLowerCase().trim()
    
        if (value == "") {
            
           
        }else{
            for (let index = 0; index < filmData.length; index++) {
                let title = filmData[index].title;
    
                title = title.toLocaleLowerCase()
                let film = document.getElementById(index)
    
                if (title.includes(value) == false) {
                    film.style.display = "none"
                }else{
                    film.style.display = "inline-block"
                }
                
            }
        }
    },

}



