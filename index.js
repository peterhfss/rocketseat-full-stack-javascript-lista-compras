// Criando um array para armazenar os itens da lista.
const listaItens = ["Pão de forma", "Café preto", "Suco de laranja","Bolacha"]


// Validando pela regex.
const regex = /^[a-zA-ZÀ-ÿ].*$/;

// Mapeando os elementos do DOM.
const itemNovo = document.getElementById("itemNovo")
const containerItems = document.getElementById('container-items')
const form = document.querySelector("form")
const items = document.querySelector("ul")


// Obtendo o valor do input pelo evento do submit do formulário.
form.onsubmit = (event) => {
    event.preventDefault()

    const value = itemNovo.value
    adicionarItem(value)
}



// Adicionando o item novo ao array.
function adicionarItem(item) {

    if (!regex.test(item)) {
        alert("Digite um item válido (comece com uma letra).")
        return
    }

    listaItens.push(item)
    console.log(listaItens)

    itemNovo.value = ""
    exibirLista()
    
}

// Criando o novo item da lista
function criaNovoItem(texto){

    // Criando os elementos DOM 
    const novoItem = document.createElement("li")
    const labelItem = document.createElement("label")
    const wrapperCheckbox = document.createElement("div")
    const checkboxItem = document.createElement("input")
    const wrapperIcon = document.createElement("span")
    const iconCheck = document.createElement("i")
    const nameItem = document.createElement("span")
    const iconDelete = document.createElement("i")

    // Configurando o LI
    novoItem.className ="md:w-[627px] w-full gap-3 rounded-xl h-12 bg-bg-secondary flex items-center py-2 px-3 justify-between"

    // Configurando o Checkbox e Label
    checkboxItem.type="checkbox"
    checkboxItem.name= "selected"
    checkboxItem.classList.add('hidden', 'peer' ,'group')

    wrapperCheckbox.className ="border border-border-primary bg-bg-secondary w-4 h-4 rounded-md cursor-pointer peer-checked:bg-brand hover:border-border-hover text-transparent peer-checked:text-white flex justify-center items-center transition-all duration-200"

    wrapperIcon.classNa="w-2 h-1 flex justify-center items-center"
    iconCheck.className="hgi hgi-stroke hgi-tick-02 text-xs "

    // Montando a estrutura do Checkbox
    wrapperIcon.appendChild(iconCheck)
    wrapperCheckbox.appendChild(wrapperIcon)
    labelItem.appendChild(checkboxItem)
    labelItem.appendChild(wrapperCheckbox)

    nameItem.classList.add("w-[531px]")
    nameItem.textContent = texto

    iconDelete.className="hgi hgi-stroke hgi-delete-02 text-base text-content-tertiary cursor-pointer hover:text-content-secondary "

    iconDelete.addEventListener("click", () => {
        
        novoItem.remove()
        listaItens.splice(listaItens.indexOf(texto), 1)
        showAlert()
    })

    novoItem.appendChild(labelItem)
    novoItem.appendChild(nameItem)
    novoItem.appendChild(iconDelete)

    return novoItem
}

// Exibindo a lista de itens
function exibirLista() {
   !listaItens.length ? items.innerHTML = "<p class='text-content-tertiary font-medium text-center w-full text-sm'>Nenhum item ainda foi adicionado</p>" : items.innerHTML = ""
   listaItens.forEach(item => {
    const novoItem = criaNovoItem(item)
    items.appendChild(novoItem)
   })
}

// Criando o alerta 
function showAlert() {
    // Criando o elemento de alerta
    const alert = document.createElement("div")

    // Estilizando o alerta
    alert.className = "m-auto md:w-[627px] mt-9 w-full bg-danger border h-11 border-border-primary p-4 rounded-xl shadow-lg flex items-center justify-between z-50 animate-in fade-in slide-in-from-top-4 duration-300"

    // Adicionando o texto ao alerta
    const textoAlerta = document.createElement("span")
    textoAlerta.className = 'flex justify-center items-center gap-2'
    textoAlerta.innerHTML = `<i class="hgi hgi-stroke hgi-alert-circle text-always-white text-2xl "></i> <span class="text-base text-always-white font-bold">O item foi removido da lista</span>`;

    // Criando o botão de fechar o alerta
    const btnFechar = document.createElement("i")
    btnFechar.className = "hgi hgi-stroke hgi-cancel-01 font-bold text-base text-always-white cursor-pointer hover:text-content-secondary "

    // Criando a lógica do botão
    btnFechar.onclick = () => {
        alert.remove()
    }

    // 5. Auto-remover após 3 segundos (opcional)
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 3000);

    alert.appendChild(textoAlerta)
     // Adicionando o botão ao alerta
     alert.appendChild(btnFechar)

     // Adicionando o alerta ao body
     containerItems.appendChild(alert)
}

// Exibindo a lsita de itens ao carregar a página
exibirLista()
