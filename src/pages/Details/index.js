import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ReturnButton } from '../../components/ReturnButton';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function Details() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);

	const [movie, setMovie] = useState();

	useEffect(() => {
		async function fetchMovies() {
			try {
				const response = await axios.get(
					`https://ironrest.herokuapp.com/colombo/${id}`
				);

				setMovie(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchMovies();
	}, [id]);

	async function handleDelete() {
		try {
			await axios.delete(`https://ironrest.herokuapp.com/colombo/${id}`);

			navigate('/');
		} catch (error) {
			console.log(error);
		}
	}

	console.log(movie);
	return loading ? (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	) : (
		<>
			<ReturnButton></ReturnButton>
			<Card
				sx={{ minWidth: 275 }}
				style={{ backgroundColor: '#F5FAFA', marginTop: '15px' }}
			>
				<CardContent>
					<Typography variant='h5' component='div'>
						<strong> {movie.owner} </strong>
					</Typography>
					<Typography variant='h6' component='div'>
						<strong>{movie.description}</strong>
					</Typography>
					<Typography variant='h6' component='div'>
						<strong>
							<p>Your movies:</p>
						</strong>
					</Typography>
					{movie.movies.map((currentElement) => {
						return (
							<Typography variant='h5' component='div'>
								{currentElement}
							</Typography>
						);
					})}
				</CardContent>
				<CardActions>
					<Link to={`/details/edit/${id}`} style={{ textDecoration: 'none' }}>
						<Button variant='contained' style={{ margin: '10px' }}>
							Edit List
						</Button>
					</Link>
					<Button
						onClick={handleDelete}
						variant='outlined'
						color='error'
						style={{ margin: '10px' }}
					>
						Delete List
					</Button>
				</CardActions>
			</Card>
		</>
	);
}
