import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReturnButton } from '../../components/ReturnButton';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Toaster, toast } from 'react-hot-toast';

export function EditList() {
	const navigate = useNavigate();

	const { id } = useParams();

	const [loading, setLoading] = useState(true);

	const [form, setForm] = useState({
		owner: '',
		description: '',
		movies: [],
	});

	function handleChange(event) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	useEffect(() => {
		async function fetchMovies() {
			try {
				const response = await axios.get(
					`https://ironrest.herokuapp.com/colombo/${id}`
				);

				setForm(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchMovies();
	}, [id]);

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const clone = { ...form };

			delete clone._id;

			await axios.put(`https://ironrest.herokuapp.com/colombo/${id}`, clone);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	}

	return loading ? (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	) : (
		<>
			<div>
				<Toaster />
			</div>
			<ReturnButton></ReturnButton>
			<h1>Edit your List</h1>
			<form on onSubmit={handleSubmit}>
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

				<Card sx={{ minWidth: 275 }}>
					<CardContent>
						<Typography variant='h5' component='div'>
							{form.owner}
						</Typography>
						<Typography variant='h5' component='div'>
							{form.description}
						</Typography>
						{form.movies.map((currentElement, i) => {
							return (
								<Typography variant='h5' component='div'>
									{currentElement}
									<Button
										onClick={() => {
											setForm((prevState) => {
												const newMovies = [...prevState.movies];
												newMovies.splice(i, 1);
												return { ...prevState, movies: newMovies };
											});
											toast('Deleted!', { icon: '🗑️' });
										}}
										size='small'
										variant='outlined'
										color='error'
									>
										Delete Movie
									</Button>
								</Typography>
							);
						})}
					</CardContent>
				</Card>

				<Button variant='contained' type='submit'>
					Update Your List
				</Button>
			</form>
		</>
	);
}
