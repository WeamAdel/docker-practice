import { NavLink, Outlet } from 'react-router-dom';

export function Layout() {
	return (
		<>
			<nav className="bg-blue-950 text-white py-3">
				<div className="container">
					<NavLink to="/">Home</NavLink>
				</div>
			</nav>
			<Outlet />
		</>
	);
}
