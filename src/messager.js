export function showMessage (msg) {
    const messageEl = document.createElement('div')
    messageEl.textContent = msg
    console.log(messageEl)
    document.body.appendChild(messageEl)
}