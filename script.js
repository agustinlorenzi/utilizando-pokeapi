let pokemons = []

for(let i=1; i <=151;i++){
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    .then(res => res.json())
    .then(data => {        
        let tipos = data.types.map(type=>type.type.name)
        pokemons.push({id:data.id,tipos:tipos,imagen:data.sprites.front_default,nombre:data.name,altura:data.height,peso:data.weight})     
    })
}
setTimeout(()=>{
    remostrar(pokemons)
},4000)

    function Agregar(num){           
        stringId = num.toString();    
        let card = document.getElementById(stringId)
        card.innerHTML = `<div  class="card" style="width: 18rem;height: 30rem;">        
        <div class="card-body">          
          <h5 class="card-title color">${pokemons[num-1].altura}</h5>
          <h5 class="card-title color">${pokemons[num-1].peso}</h5>
          <button onclick="remostrar(pokemons)" class="btn btn-primary">Volver</button>         
        </div>
      </div>`
    }    

    let select = document.getElementById("selector")

    select.addEventListener("input", () => {              
        filtrarTipos(select.value)     
    })

    function filtrarTipos(tipo){
        if(select.value !== "-"){
            const resultado3 = pokemons.filter((el) => el.tipos.includes(tipo))
            remostrar(resultado3)
        }else{
            remostrar(pokemons)
        }
    }    

    let input1 = document.getElementById("busq")

    input1.addEventListener("input", () => {        
        filtrarNombres(input1.value)       
    })   

    function filtrarNombres(nombre){        
        if(input1.value !== ""){
            const existe = pokemons.some((el) => el.id === Number(nombre))           
            existe === true?remostrar(pokemons.filter((el) => el.id === Number(nombre))):remostrar(pokemons.filter((el) => el.nombre.includes(nombre)))                        
        }else{
            remostrar(pokemons)
        }        
    }   

    function remostrar(array) {
        let contenedor = document.getElementById("vidriera");
        contenedor.innerHTML = ``
        console.log(array)   
        array.forEach((data) => {
            let contenedor = document.getElementById("vidriera");
            let content1 = document.createElement("div");            
            content1.innerHTML = `<div id="${data.id}" class="card" style="width: 18rem; height: 30rem;">
            <img src="${data.imagen}" class="card-img-top" alt="${data.nombre}">
            <div class="card-body">
              <p class="card-text color">${data.id}</p>
              <h5 class="card-title color">${data.nombre}</h5>              
              <button onclick="Agregar(${data.id})" class="btn btn-primary">Ver Más</button>              
            </div>
          </div>
            `;
            contenedor.append(content1);
            })    
    }

