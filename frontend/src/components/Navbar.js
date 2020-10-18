import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav style={{ margin: "0 0 40px 0" }}>
                <div className="nav-wrapper teal darken-3" >
                    <Link to="/" className="brand-logo" style={{ margin: "0 10px" }} > Training</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/about" style={{ margin: "0 25px" }}>About</Link></li>
                        <li><Link to="/contact" style={{ margin: "0 25px" }}>Contact</Link></li>
                        <li><Link to="/admin" style={{ margin: "0 25px" }}>Add new Schedule</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar;