import {NavLink} from "react-router-dom";

export default function UndecoratedNavLink({ children, to, color }) {
  return <NavLink to={to} style={{ textDecoration: 'none', color: color || '#2779F6' }}>{children}</NavLink>
}