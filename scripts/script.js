//@ts-ignore
const rcm = (data) => {
    let header = false

    const contextMenu = document.createElement('div')
    contextMenu.classList.add('context-menu')
    contextMenu.classList.add(data.theme ? data.theme : 'light')

    if(data.header){
        header = true
        const menuHeader = document.createElement('div')
        menuHeader.classList.add('menu-header')

        data.header.items.forEach((item, idx) => {
            if(idx < 5){
                let headerItem = document.createElement('div')
                let color = item.color ? item.color : 'success'

                headerItem.classList.add('header-item')
                headerItem.classList.add(color)

                headerItem.innerHTML += `<span class="item-icon"><i class="${item.icon}"></i></span>`
                menuHeader.appendChild(headerItem)
            }
        })

        contextMenu.appendChild(menuHeader)
    }

    const menuList = document.createElement('ul')
    menuList.classList.add('menu-list')

    data.sections.forEach(section => {
        let menuSection = document.createElement('div')
        menuSection.classList.add('section')

        section.items.forEach(item => {
            let menuItem = document.createElement('li')
            let color = item.color ? item.color : 'success'
            let shortcuts = item.shortcuts ? item.shortcuts.map(shortcut => `<span>${shortcut}</span>`).join('') : null
            let disabled = item.disabled ? item.disabled : false
    
            menuItem.classList.add('menu-item')
            menuItem.classList.add(color)
            if(disabled) menuItem.classList.add('disabled')
    
            if(item.icon) menuItem.innerHTML += `<span class="item-icon"><i class="${item.icon}"></i></span>`
            menuItem.innerHTML += item.text
            if(shortcuts !== null) menuItem.innerHTML += `<span class="shortcuts">${shortcuts}</span>`
    
            menuSection.appendChild(menuItem)
        })

        menuList.appendChild(menuSection)
    })

    contextMenu.appendChild(menuList)

    // Show Menu
    window.addEventListener('contextmenu', e => {
        e.preventDefault()

        document.body.appendChild(contextMenu)
        const contextMenuWidth  = contextMenu.offsetWidth
        const contextMenuHeight = contextMenu.offsetHeight

        contextMenu.style.top  = e.clientY + contextMenuHeight >= window.innerHeight ? `${e.clientY - contextMenu.offsetHeight}px` : `${e.clientY}px`
        contextMenu.style.left = e.clientX + contextMenuWidth  >= window.innerWidth  ? `${e.clientX - contextMenu.offsetWidth}px` : `${e.clientX}px`

        contextMenu.style.display = 'flex'
        setTimeout(() => {
            contextMenu.classList.add('active')
        }, 100)

        // Add Menu Items Click Event
        const sections = document.querySelectorAll('.context-menu .menu-list .section')
        sections.forEach((section, secIdx) => {
            let sectionItems = section.childNodes

            sectionItems.forEach((item, itmIdx) => {
                data.sections[secIdx].items[itmIdx].click && item.addEventListener('click', data.sections[secIdx].items[itmIdx].click)
            })
        })

        // Add Menu Header Click Event
        if(header){
            const headerItems = document.querySelectorAll('.context-menu > .menu-header > .header-item')
            headerItems.forEach((item, idx) => {
                data.header.items[idx].click && item.addEventListener('click', data.header.items[idx].click)
            })
        }

        // Hide Menu
        window.addEventListener('click', () => {
            contextMenu.classList.remove('active')
            setTimeout(() => {
                contextMenu.remove()
            }, 200)
            
        })
    })

    
}