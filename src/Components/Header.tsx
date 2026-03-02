import React from 'react'

import './header.scss'

type NavItem = { name: string; href: string; current: boolean }

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Blog', href: '#', current: false },
]

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ')
}

function Header(): React.ReactElement {
    return (
        <h1 className="text-2xl font-bold">Warehouse Management System</h1>
    );
}

export default Header
