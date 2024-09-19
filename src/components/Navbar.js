import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'

const NavigationBar = () => {
    return (
        <Navbar className='fixed-top ps-3 pe-3' bg='light' expand='lg' role='navigation' aria-label='Main navigation'>
            <Navbar.Brand className='p-0' as={Link} to='/Road-To-The-West/'>
                <img 
                    className='img-fluid'
                    src={`${process.env.PUBLIC_URL}/wagon.png`} 
                    alt='wagon'
                />
                <span
                    className='ps-3'
                >Road To The West</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse 
                className='justify-content-end'
                id='basic-navbar-nav'
            >
                <Nav className='mr-auto'>
                    <Nav.Link as={Link} to='/Road-To-The-West/'>Home</Nav.Link>
                    <Nav.Link as={Link} to='/Road-To-The-West/play'>Play</Nav.Link>
                    <Nav.Link as={Link} to='/Road-To-The-West/about-me'>About Me</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar