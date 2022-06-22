const buttons = document.querySelectorAll(".item");
const modalTitle = document.querySelector(".keyboard-name")
const modal = document.querySelector(".modal")
const btnClose = document.querySelector(".close-icon")
const form = document.querySelector(".form-dodiku")
const filePath = document.getElementsByName("file-path")[0];
const fileName = document.getElementsByName("file-name")[0];
const pathErrText = document.querySelector("#path-err")
const nameErrText = document.querySelector("#name-err")
const modalLoading = document.querySelector(".loading")
const resultText = document.querySelector(".result-text")
const loading = document.querySelector(".loading")


let titleText = "";

const findItemTitle = (items) => {
    let titleText = ""
     for (let item of items){
            if (item?.classList?.value === "item-text"){
                    titleText = item.textContent;
                }
            }
     return titleText
}

buttons.forEach(elem => {
    elem.addEventListener("click", (e)=> {
        const elem = e.target
        if (elem.classList.value !== "item"){
            let items = elem.parentNode.childNodes
            titleText = findItemTitle(items)
        }else{
            let items = elem.childNodes
            titleText = findItemTitle(items)
        }
        modalTitle.textContent = titleText;
        modal.classList.add("open")
    })
})

btnClose.addEventListener("click", () => {
    modal.classList.remove("open")
    resultText.textContent = ""
})

filePath.addEventListener("focus", () => {
    if (filePath.classList[1] != null){
        filePath.classList.remove("input-error")
    }
})

fileName.addEventListener("focus", () => {
    if (fileName.classList[1] != null){
        fileName.classList.remove("input-error")
    }
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let errors = 0;
    const path = filePath.value
    const name = fileName.value
    if (path === ""){
        pathErrText.textContent = "Заполните поле"
        filePath.classList.add("input-error")
        errors++;
    }
    if (name === ""){
        nameErrText.textContent = "Пустое поле"
        fileName.classList.add("input-error")
        errors++;
    }
    if (errors === 0){
        loading.classList.add("load-open")
        let result = await eel.main(path, name, titleText)()
        loading.classList.remove("load-open")
        resultText.textContent = result ? "Успешный парсинг" : "Ошибка парсинга"
    }
})

