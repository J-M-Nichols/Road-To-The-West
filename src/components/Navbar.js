import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'

const NavigationBar = () => {
    return (
        <Navbar className='brown-background fixed-top ps-3 pe-3' bg='light' expand='lg' role='navigation' aria-label='Main navigation'>
            <Navbar.Brand className='p-0' as={Link} to='/'>
                <img 
                    className='img-fluid'
                    src={`${process.env.PUBLIC_URL}/wagon.png`} 
                    alt='wagon'
                />
                <span
                    className='ps-3 light-brown-color fw-bolder'
                >Road To The West</span>
            </Navbar.Brand>
            <Navbar.Toggle 
                aria-controls='basic-navbar-nav' 
                className='light-brown-color border p-2 hamburger-shell'
            >
                <div
                    className='d-flex flex-column gap-1'
                >
                    <div 
                        className='light-brown-color rounded hamburger'
                    />
                    <div 
                        className='light-brown-color rounded hamburger'
                    />
                    <div 
                        className='light-brown-color rounded hamburger'
                    />
                </div>
            </Navbar.Toggle>
            <Navbar.Collapse 
                className='justify-content-end mt-3 mb-3'
                id='basic-navbar-nav'
            >
                <Nav className='mr-auto gap-3'>
                    <Nav.Link 
                        className='light-brown-color light-brown-color-hover p-2 fw-bolder border rounded' 
                        as={Link} 
                        to='/'
                    >Home</Nav.Link>
                    <Nav.Link 
                        className='light-brown-color light-brown-color-hover p-2 fw-bolder border rounded' 
                        as={Link} 
                        to='/play'
                    >Play</Nav.Link>
                    <Nav.Link 
                        className='light-brown-color light-brown-color-hover p-2 fw-bolder border rounded' 
                        as={Link} 
                        to='/about-me'
                    >About Me</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar