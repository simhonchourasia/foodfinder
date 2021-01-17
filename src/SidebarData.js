import React from 'react'
import * as AiIcons from "react-icons/ai";

/* UPDATE THIS TO ADD MORE OPTIONS IN THE SIDEBAR*/
export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Matches',
        path: '/matches',
        icon: <AiIcons.AiFillApi />,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'nav-text'
    }
]