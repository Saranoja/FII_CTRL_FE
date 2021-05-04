import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import StyledActionCard from './ActionCard.style';
import { RouterLink } from 'components';

const ActionCard = ({ image, title, description, route }) => {
	return (
		<RouterLink to={route}>
			<StyledActionCard>
				<Card className="action-card-wrapper">
					<CardMedia
						component="img"
						image={image}
						title="content illustration"
						className="card-image"
					/>
					<CardContent className="content">
						<Typography
							gutterBottom
							variant="h5"
							component="h2"
							className="header"
						>
							{title}
						</Typography>
						<Typography gutterBottom variant="body2" component="h6">
							{description}
						</Typography>
					</CardContent>
				</Card>
			</StyledActionCard>
		</RouterLink>
	);
};

ActionCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
};

export default ActionCard;
