import React from 'react';
import * as R from 'ramda';
import { withInView } from 'hocs';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import CardContent from '@material-ui/core/CardContent';
import StarRateIcon from '@material-ui/icons/StarRate';
import StyledResourceCard from './ResourceCard.style';

const ResourceCard = ({ title, author, pages, link }) => (
  <StyledResourceCard>
    <CardContent>
      <Typography
        className="resource-title"
        gutterBottom
        variant="h6"
        component="h3"
      >
        {title}
      </Typography>
      <Typography
        color="textSecondary"
        className="resource-author"
        gutterBottom
        variant="subtitle2"
        component="h6"
      >
        <span className="author">{author}</span>
      </Typography>
      <Typography variant="caption">
        <List>
          {R.map(
            (pagesGroup) => (
              <ListItem key={pagesGroup[0]} dense disableGutters>
                <ListItemIcon
                  classes={{
                    root: 'bookmark-icon-root',
                  }}
                >
                  <BookmarkBorderIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    root: 'pages-list-line-wrapper',
                  }}
                >
                  <span className="page-numbers-item">Pg. {pagesGroup[0]}</span>
                </ListItemText>
                <Rating
                  icon={<StarRateIcon fontSize="small" />}
                  precision={0.5}
                  className="pages-rating"
                  value={pagesGroup[1]}
                  readOnly
                />
              </ListItem>
            ),
            pages
          )}
        </List>
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <Link
        href={link}
        target="_blank"
        rel="noreferrer"
        underline="none"
        color="secondary"
        component={Button}
      >
        Find the book
      </Link>
    </CardActions>
  </StyledResourceCard>
);

export default withInView(ResourceCard);
