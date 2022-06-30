import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Details } from './pages/Details';
import { AddMovie } from './pages/AddMovie';
import { EditList } from './pages/EditList';
import { NotFound } from './pages/NotFound';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/addMovie' element={<AddMovie />} />
				<Route path='/details/:id' element={<Details />} />
				<Route path='/details/edit/:id' element={<EditList />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
