import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import * as R from 'ramda';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import CardContent from '@material-ui/core/CardContent';
import StyledResourceCard from './ResourceCard.style';

const ResourceCard = ({ title, author, pages, link }) => {
    const theme = useTheme();
    return (
        <StyledResourceCard theme={theme}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h3">{title}</Typography>
                <Typography gutterBottom variant="body2" component="h6">
                    <span className='author'>{author}</span>
                </Typography>
                <Typography variant="body3">
                    <List>
                        {R.map((pagesGroup) => (
                            <ListItem key={pagesGroup[0]}>
                                <ListItemIcon>
                                    <BookmarkBorderIcon />
                                </ListItemIcon>
                                <ListItemText className="pages-list-line-wrapper">
                                    <span className="page-numbers-item"> Pg. {pagesGroup[0]} </span>
                                    <Rating className="pages-rating" value={pagesGroup[1]} readOnly />
                                </ListItemText>
                            </ListItem>),
                            pages)}
                    </List>
                </Typography>
            </CardContent>
            <CardActions extra>
                <a href={link} target='_blank' rel='noreferrer'>
                    <LibraryBooksIcon />
                    Find the book
                </a>
            </CardActions>
        </StyledResourceCard>
    )
};

export default ResourceCard;