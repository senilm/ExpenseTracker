import React from 'react'
import { navBarData } from '../../constants/constants'
import ButtonLink from '../Buttons/ButtonLink'
import { useNavigate } from 'react-router-dom'

const NavbarLow = () => {
    const navigate = useNavigate();

    return (
        <header className=' max-container px-2 shadow-md'>
            <nav className='flex justify-between items-center p-3 font-montserrat'>

                <span>Expense Tracker</span>{/* <img src={NavLogo} alt="" /> */}

                

                <div onClick={() => navigate('/login')}>
                    <ButtonLink label="Log In" />
                </div>
            </nav>
        </header>
    )
}

export default NavbarLow