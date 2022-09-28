import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default function Toolbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='warning'>
        <NavbarBrand>ORDER PORTAL</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/add-items/">ADD ITEM</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/take-orders">TAKE ORDERS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/all-orders">ALL ORDERS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/milkshakes">MILKSHAKES</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}