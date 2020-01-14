/**
 * Footer App
 */
import React from 'react';

const Footer = () => {
    let current_date = new Date()

    return <footer className="main-footer">
            <div className="footer-left">
                Copyright &copy; {current_date.getFullYear()} <div className="bullet"></div> <a href="https://www.lae-edu.com">www.lae-edu.com</a>
            </div>
            <div className="footer-right">
                2.3.0
            </div>
        </footer>
}

export default Footer;