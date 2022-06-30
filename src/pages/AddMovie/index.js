import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { ReturnButton } from '../../components/ReturnButton';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

export function AddMovie() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		owner: '',
		description: '',
		movies: [],
	});

	function handleChange(event) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	function handleClick(event) {
		setForm((prevState) => {
			return {
				...prevState,
				movies: [...prevState.movies, event.target.value],
			};
		});
		toast.success('Added to your list!');
	}

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fetchMovies() {
			try {
				const response = await axios.get(
					'https://api.themoviedb.org/3/discover/movie?api_key=1c0b138d6f935ff51d12a8415d05b0a3'
				);

				setMovies(response.data.results);
			} catch (error) {
				console.log(error);
			}
		}

		fetchMovies();
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			await axios.post('https://ironrest.herokuapp.com/colombo', form);

			navigate('/');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div>
				<Toaster />
			</div>
			<ReturnButton></ReturnButton>
			<h1>Create a new list!</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					id='owner'
					label='Your Name'
					variant='outlined'
					name='owner'
					value={form.owner}
					onChange={handleChange}
				/>
				<TextField
					id='description'
					label='Description'
					variant='outlined'
					name='description'
					value={form.description}
					onChange={handleChange}
				/>

				{movies.map((currentMovie) => {
					return (
						<>
							<Card sx={{ minWidth: 275 }}>
								<CardContent>
									<Typography variant='h5' component='div'>
										{currentMovie.original_title}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										size='small'
										name='movies'
										value={currentMovie.original_title}
										onClick={handleClick}
									>
										Add to your list
									</Button>
								</CardActions>
							</Card>
						</>
					);
				})}
				<Button variant='contained' type='submit'>
					Submit your list
				</Button>
			</form>
		</>
	);
}
