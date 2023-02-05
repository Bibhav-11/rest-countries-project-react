import React from 'react';
import Link from './Link';
import './Navigation.css';

export default function Navigation() {
   return (
        <nav className='nav'>
            <div className='container nav-container'>
                <h1 className='nav-heading'>
                    <Link href='/'>
                        Where in the world?
                    </Link>
                </h1>
                <div className='color-switcher'>Night Mode</div>
            </div>

        </nav>
   )
}