import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from 'components/layout';
import Dropdown from 'components/dropdown';
import FilePicker from 'components/filePicker';
import ResourceCard from './components/resourceCard';
import ArticleCard from './components/articleCard';
import DividedGrid from './components/dividedGrid';
import { Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import Grid from '@material-ui/core/Grid';
import StyledResources from './Resources.style';
import { coursesList, formatRecommendations } from './helpers';
import {
	loadResourcesForFile,
	getResourcesForFile,
	getResetState,
	getArticlesForFile,
	getResetSearch,
} from './actions';

class Resources extends React.Component {
	constructor() {
		super();
		this.state = {
			subjectId: null,
			shouldExecuteScroll: false,
			manualKeywords: [],
		};
		this.resourceCardRef = React.createRef();
	}

	componentDidUpdate() {
		const { recommendations } = this.props;
		if (recommendations && this.state.shouldExecuteScroll) {
			this.executeScroll();
			this.setState({ shouldExecuteScroll: false });
		}
	}

	executeScroll = () =>
		this.resourceCardRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest',
		});

	handleFileSubmit = async () => {
		const { actions, current_file } = this.props;
		await actions.getResetState();
		await actions.getResourcesForFile(current_file, this.state.subjectId);
		await actions.getArticlesForFile(current_file);
		this.setState({ shouldExecuteScroll: true });
	};

	handleArticlesCheckboxPdf = async () => {
		this.setState((previousState) => {
			return {
				shouldIncludeArticlesPdf: !previousState.shouldIncludeArticlesPdf,
			};
		});
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

	componentWillUnmount = () => {
		const { actions } = this.props;
		actions.getResetState();
	};

	render() {
		const { actions, recommendations, articles, isLoading } = this.props;

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
								>
									{' '}
									Search{' '}
								</Button>
							</div>
						}
						secondChoice={
							<div className="keywords-wrapper">
								<h2> Search by adding keywords </h2>
								<ChipInput
									label="Add keywords"
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
									onClick={() => {
										console.log('Submitted keywords search');
									}}
								>
									{' '}
									Search{' '}
								</Button>
							</div>
						}
						isLoading={
							isLoading ||
							(this.state.shouldIncludeArticlesPdf &&
								!articles &&
								this.state.shouldExecuteScroll)
						}
						variant="middle"
					/>
					<div className="resource-cards-wrapper" ref={this.resourceCardRef}>
						<Grid container>
							{recommendations
								? R.map(
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
								: null}
							{articles
								? R.map(
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
								: null}
						</Grid>
					</div>
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
			getResetState,
			getResetSearch,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
