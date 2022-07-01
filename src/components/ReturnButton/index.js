import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export function ReturnButton() {
	return (
		<>
			<Link to={'/'} style={{ textDecoration: 'none' }}>
				<Button variant='contained'>Return Home</Button>
			</Link>
		</>
	);
}
