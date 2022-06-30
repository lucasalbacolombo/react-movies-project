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
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography variant='h5' component='div'>
						{movie.owner}
					</Typography>
					<Typography variant='h5' component='div'>
						{movie.description}
					</Typography>
					<Typography variant='h5' component='div'>
						<p>Your movies:</p>
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
						<Button size='small' variant='contained'>
							Edit List
						</Button>
					</Link>
					<Button
						onClick={handleDelete}
						size='small'
						variant='outlined'
						color='error'
					>
						Delete List
					</Button>
				</CardActions>
			</Card>
		</>
	);
}
