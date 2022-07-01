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
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

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

	return loading ? (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	) : (
		<>
			<Grid
				container
				direction='column'
				justifyContent='flex-start'
				alignItems='flex-start'
				spacing={1}
			>
				<Grid item>
					<h1>The Movie List Database</h1>

					<Link to={'/addMovie'} style={{ textDecoration: 'none' }}>
						<Button variant='contained'>
							<strong>Create a new list</strong>
						</Button>
					</Link>
				</Grid>
				<Grid item>
					<Stack spacing={2}>
						<h4>Your Movie Lists</h4>
						{movies.map((currentMovie) => {
							return (
								<Link
									to={`/details/${currentMovie._id}`}
									style={{ textDecoration: 'none' }}
								>
									<Card
										sx={{ minWidth: 275 }}
										style={{ backgroundColor: '#ECF3FD' }}
									>
										<CardContent>
											<Typography variant='h6' component='div'>
												<strong>Owner: </strong>
												{currentMovie.owner}
											</Typography>
											<Typography variant='h6' component='div'>
												<strong>Description: </strong>
												{currentMovie.description}
											</Typography>
											<Typography variant='h6' component='div'>
												<p>
													<strong>Your Movies:</strong>
												</p>
											</Typography>
											{currentMovie.movies.map((currentElement) => {
												return (
													<Typography variant='h6' component='div'>
														{currentElement}
													</Typography>
												);
											})}
										</CardContent>
									</Card>
								</Link>
							);
						})}
					</Stack>
				</Grid>
			</Grid>
		</>
	);
}
