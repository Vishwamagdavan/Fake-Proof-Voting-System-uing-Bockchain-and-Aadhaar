import React from 'react'

export default function Navbar({ accounts: currentaccount }) {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <p className="navbar-brand text-white">TN ELECTION COMMISSION</p>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            </button>
            <div className="navbar-nav">
                <p className="nav-item text-white  active">Current Address:{currentaccount} </p>
            </div>
        </nav>
    )
}
