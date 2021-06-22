import React from 'react';
import * as R from 'ramda';
import { withInView } from 'hocs';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import StyledArticleCard from './ArticleCard.style';

const ArticleCard = ({ title, author, summary, link }) => (
  <StyledArticleCard>
    <CardContent>
      <Typography
        className="header article-title"
        gutterBottom
        variant="h6"
        component="h3"
      >
        {title}
      </Typography>
      <Typography
        color="textSecondary"
        className="article-author"
        gutterBottom
        variant="subtitle2"
        component="h6"
      >
        <span className="author">{R.map((item) => `${item} `, author)}</span>
      </Typography>
      <Typography variant="caption">{summary}</Typography>
    </CardContent>
    <CardActions>
      <Link
        href={link}
        target="_blank"
        rel="noreferrer"
        underline="none"
        color="secondary"
        component={Button}
      >
        Read the article
      </Link>
    </CardActions>
  </StyledArticleCard>
);

export default withInView(ArticleCard);
