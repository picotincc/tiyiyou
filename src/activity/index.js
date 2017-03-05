
import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

document.addEventListener('DOMContentLoaded', function(e) {
    console.log(window.innerWidth);
    document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
}, false);


function run()
{
    render(
        <App />,
        document.getElementById("root")
    );
}

run();
