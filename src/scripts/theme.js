function changeTheme(theme) {
    const body = document.body;
    body.classList.remove('light', 'dark', 'solarized', 'cyberpunk'); // remove all possible theme classes

    switch(theme) {
        case 'dark':
            body.classList.add('dark');
            break;
        case 'light':
            body.classList.add('light');
            break;
        case 'solarized':
            body.classList.add('solarized');
            break;
        case 'cyberpunk':
            body.classList.add('cyberpunk');
            break;
    }
}

export {changeTheme};