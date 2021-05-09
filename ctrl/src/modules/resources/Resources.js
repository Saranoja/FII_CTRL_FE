import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Dropdown, FilePicker } from 'components';
import ResourceCard from './components/resourceCard';
import ArticleCard from './components/articleCard';
import DividedGrid from './components/dividedGrid';
import {
  Button,
  Typography,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { TabPanel, TabContext } from '@material-ui/lab';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DescriptionIcon from '@material-ui/icons/Description';
import { coursesList, formatRecommendations } from './helpers';
import {
  loadResourcesForFile,
  getResourcesForFile,
  getArticlesForFile,
  getResourcesForKeywords,
  getArticlesForKeywords,
  getResetState,
  getResetSearch,
} from './actions';
import StyledResources from './Resources.style';

// TODO: split in separate components
// TODO: clean inputs after sending request - add prop for this

class Resources extends React.Component {
  constructor() {
    super();
    this.state = {
      subjectId: null,
      shouldExecuteScroll: false,
      manualKeywords: [],
      currentResourcesTab: 'articles',
    };
    this.resourceCardRef = React.createRef();
    this.articleCardRef = React.createRef();
  }

  componentDidUpdate() {
    const { recommendations, articles } = this.props;
    if (recommendations && articles && this.state.shouldExecuteScroll) {
      this.executeScroll();
      this.setState({ shouldExecuteScroll: false });
    }
  }

  executeScroll = () => {
    setTimeout(
      () =>
        this.articleCardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        }),
      500
    );
  };

  handleFileSubmit = async () => {
    const { actions, current_file } = this.props;
    await actions.getResetState();
    await actions.getResourcesForFile(current_file, this.state.subjectId);
    await actions.getArticlesForFile(current_file);
    this.setState({ shouldExecuteScroll: true });
  };

  handleKeywordsSubmit = async () => {
    const { actions } = this.props;
    await actions.getResetState();
    await actions.getResourcesForKeywords(
      this.state.manualKeywords,
      this.state.subjectId
    );
    await actions.getArticlesForKeywords(this.state.manualKeywords);
    this.setState({ shouldExecuteScroll: true });
  };

  handleAddChip = (chip) => {
    this.setState({
      manualKeywords: [...this.state.manualKeywords, chip],
    });
  };

  handleDeleteChip = (chip) => {
    this.setState({
      manualKeywords: this.state.manualKeywords.filter(
        (element) => element !== chip
      ),
    });
  };

  handleResourcesTabChange = (event, newValue) => {
    this.setState({ currentResourcesTab: newValue });
    this.executeScroll();
  };

  componentWillUnmount = () => {
    const { actions } = this.props;
    actions.getResetState();
  };

  render() {
    const {
      actions,
      recommendations,
      articles,
      isLoading,
      current_file,
    } = this.props;

    return (
      <Layout isCentered={false}>
        <StyledResources>
          <Dropdown
            className="resources-subject-picker"
            options={coursesList}
            placeholder="Select a course you want resources for"
            actionOnChange={(value) => this.setState({ subjectId: value })}
          />
          <DividedGrid
            firstChoice={
              <div className="search-wrapper">
                <h2> Search by uploading a course file </h2>
                <FilePicker
                  onFileUploadSuccess={actions.loadResourcesForFile}
                />
                <Button
                  className="resource-submit-button"
                  color="secondary"
                  variant="contained"
                  onClick={this.handleFileSubmit}
                  disabled={this.state.subjectId && current_file ? false : true}
                >
                  Search by course
                </Button>
              </div>
            }
            secondChoice={
              <div className="keywords-wrapper">
                <h2> Search by adding keywords </h2>
                <ChipInput
                  label="Add keywords in relevance order"
                  value={this.state.manualKeywords}
                  onAdd={(chip) => this.handleAddChip(chip)}
                  onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                  newChipKeys={['Enter', ',']}
                  classes={{
                    root: 'chip-root',
                    chipContainer: 'chip-container',
                  }}
                  fullWidth
                />
                <Button
                  className="resource-submit-button"
                  color="secondary"
                  variant="contained"
                  onClick={this.handleKeywordsSubmit}
                  disabled={
                    this.state.subjectId && this.state.manualKeywords.length
                      ? false
                      : true
                  }
                >
                  Search by keywords
                </Button>
              </div>
            }
            variant="middle"
          />
          <TabContext value={this.state.currentResourcesTab}>
            <Tabs
              value={this.state.currentResourcesTab}
              onChange={this.handleResourcesTabChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="icon label tabs"
            >
              <Tab
                icon={<DescriptionIcon />}
                label="ARTICLES"
                value="articles"
              />
              <Tab icon={<MenuBookIcon />} label="BOOKS" value="books" />
            </Tabs>
            <div className="resource-cards-wrapper" ref={this.articleCardRef}>
              <TabPanel
                value="articles"
                classes={{
                  root: 'tab-panel-root',
                }}
              >
                <Grid container>
                  {articles ? (
                    R.map(
                      (item) => (
                        <ArticleCard
                          key={item.title}
                          title={item.title}
                          author={item.authors}
                          summary={item.summary}
                          link={item.link}
                        />
                      ),
                      articles
                    )
                  ) : (
                    <Typography variant="body1">
                      ... Search and you will find 💡
                    </Typography>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value="books">
                <Grid container>
                  {recommendations ? (
                    R.map(
                      (item) => (
                        <ResourceCard
                          key={item.title}
                          title={item.title}
                          author={item.author}
                          pages={item.pages}
                          link={item.link}
                        />
                      ),
                      formatRecommendations(recommendations)
                    )
                  ) : (
                    <Typography variant="body1">
                      ... Search and you will find 💡
                    </Typography>
                  )}
                </Grid>
              </TabPanel>
            </div>
          </TabContext>
          {isLoading ? (
            <CircularProgress className="grid-divider-loader" />
          ) : null}
        </StyledResources>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  current_file: state.resources.current_file,
  recommendations: state.resources.recommendations,
  articles: state.resources.articles,
  isLoading: state.resources.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadResourcesForFile,
      getResourcesForFile,
      getArticlesForFile,
      getResourcesForKeywords,
      getArticlesForKeywords,
      getResetState,
      getResetSearch,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
