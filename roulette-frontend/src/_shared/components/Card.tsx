import MaterialCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface CardProps {
	containerName?: string
	title: string
}

export function Card({ containerName, title}: CardProps) {
	return (
		<MaterialCard sx={styles}>
			<CardContent>
				{containerName &&
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						{containerName}
					</Typography>
				}
				<Typography variant="h5" component="div">
					{title}
				</Typography>
			</CardContent>
		</MaterialCard>
	);
}

const styles = {
	minWidth: 275,
	cursor: 'default',
	'&:hover': {
		backgroundColor: '#96c3e3',
		transform: 'scale(1.05)'
	},
	'&:hover:active': {
		backgroundColor: '#90aede',
	}
}