import React from 'react';
import * as R from 'ramda';
// import Latex from 'react-latex'
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import StyledArticleCard from './ArticleCard.style';

const ArticleCard = ({ title, author, summary, link }) => {
    return (
        <StyledArticleCard>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h3" className="header">{title}</Typography>
                <Typography gutterBottom variant="body2" component="h6">
                    <span className='author'>
                        {R.map((item) => `${item} `, author)}
                    </span>
                </Typography>
                <Typography variant="body3">
                    {summary}
                </Typography>
            </CardContent>
            <CardActions extra>
                <a href={link} target='_blank' rel='noreferrer'>
                    <LibraryBooksIcon />
                    Read the article
                </a>
            </CardActions>
        </StyledArticleCard>
    )
};

export default ArticleCard;