document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.getElementsByClassName('tab')
    for (const tab of tabs) {
        const tabItems = tab.getElementsByClassName('tab-item')
        for (const item of tabItems) item.onclick = function() { changeTab(item) }
    }
}, false)

function changeTab(tabItem) {
    const tab = tabItem.parentElement
    const tabItems = tab.getElementsByClassName('tab-item')
    
    for (const item of tabItems) {
        if (item == tabItem) {
            item.classList.add('active')
        } else {
            item.classList.remove('active')
        }

        const contentTabs = document.getElementsByClassName(item.id)
        for (const contentTab of contentTabs) {
            if (item == tabItem) {
                contentTab.classList.remove('d-none')
            } else {
                contentTab.classList.add('d-none')
            }
        }
    }
}

function toast(msg, type, interval) {
    var toastItem = document.createElement("DIV");
    toastItem.classList.add('toast', 'toast-item')
    if (type) toastItem.classList.add('toast-' + type)
    toastItem.innerHTML = msg

    document.body.appendChild(toastItem)

    setTimeout(function() {
        document.body.removeChild(toastItem)
    }, interval || 3000)
}

function updateTable(id, data, columns) {
    const table = document.getElementById(id)

    if (columns) {
        const thead = table.getElementsByTagName('THEAD')[0]
        thead.innerHTML = ''

        const tr = document.createElement('TR')
        for (const col of columns) {
            const th = document.createElement('TH')
            th.innerHTML = col
            tr.appendChild(th)
        }
        thead.appendChild(tr)
    }

    const tbody = table.getElementsByTagName('TBODY')[0]
    tbody.innerHTML = ''
    
    for (const item of data) {
        const tr = document.createElement('TR')
        for (const key in item) {
            const td = document.createElement('TD')
            td.innerHTML = item[key]
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
}