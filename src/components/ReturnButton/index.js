import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export function ReturnButton() {
	return (
		<>
			<Link to={'/'}>
				<Button variant='contained' size='large'>
					Return Home
				</Button>
			</Link>
		</>
	);
}
