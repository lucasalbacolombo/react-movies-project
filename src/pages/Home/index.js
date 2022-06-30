import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export function Home() {
	const [movies, setMovies] = useState();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchMovies() {
			try {
				const response = await axios.get(
					'https://ironrest.herokuapp.com/colombo'
				);

				setMovies([...response.data]);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchMovies();
	}, []);

	console.log(movies);

	return loading ? (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	) : (
		<>
			<h1>The Movie Database</h1>

			<Link to={'/addMovie'} style={{ textDecoration: 'none' }}>
				<Button variant='contained' size='large'>
					Create a new list
				</Button>
			</Link>

			<h3>Your Movie Lists</h3>
			{movies.map((currentMovie) => {
				return (
					<Link
						to={`/details/${currentMovie._id}`}
						style={{ textDecoration: 'none' }}
					>
						<Card sx={{ minWidth: 275 }}>
							<CardContent>
								<Typography variant='h5' component='div'>
									Name: {currentMovie.owner}
								</Typography>
								<Typography variant='h5' component='div'>
									Description: {currentMovie.description}
								</Typography>
								<Typography variant='h5' component='div'>
									<p>Your Movies:</p>
								</Typography>
								{currentMovie.movies.map((currentElement) => {
									return (
										<Typography variant='h5' component='div'>
											{currentElement}
										</Typography>
									);
								})}
							</CardContent>
						</Card>
					</Link>
				);
			})}
		</>
	);
}
