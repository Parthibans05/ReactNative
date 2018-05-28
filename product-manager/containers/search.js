import React, { Component } from 'react';
import ProductListItem from '../components/ProductListItem';
import { ActivityIndicator, FlatList, RefreshControl, Alert, View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchActionCreators from '../actionCreators/search';

let URI = "http://172.16.107.83:4000";
class SearchWithFlatList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: ''
		};
	}

	onWishTapped = (id) => {
		// TODO: when user taps on the heart icon, you
		// need to change the icon to full heart, which is
		// already handled in ProductListItem based on wish property
		// you need to set the wish property to true for the tapped product
		// which is already in the state
		// implement above using react redux
	};

	_getProducts = (page = 1, limit = 8) => {
		this.props.actions.getProducts(page, limit);
	};

	/*  flat list supporting methods */

	_getMore = () => {
        this.props.actions.searchProduct(++this.props.page, this.props.limit, this.state.searchText);
	};

	_renderItem = ({ index, item }) => {
		return (
			<ProductListItem
				{...this.props}
				id={item.id}
				title={`${item.id} - ${item.title}`}
				image={item.image ? `${URI}/images/${item.image}` : null}
				rating={item.rating}
				price={item.price}
				wish={item.wish || false}
				onWishTapped={this.onWishTapped}
			/>
		);
	};

	_keyExtractor = (item, index) => {
		return `${index}`;
	};

	searchHandler = (text) => {
		this.setState({ searchText: text }, () => {
			this.props.actions.searchProduct(1, this.props.limit, this.state.searchText);
		});
	};

	/*  flat list supporting methods - END */

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#fff', }}>
            <View style={styles.searchSection} >
				<FontAwesome name="search" size={16} color="#000" style={styles.searchIcon} />
				<TextInput
					style={styles.searchInput}
					onChangeText={this.searchHandler}
					value={this.state.searchText}
				/>
                </View>

            <View style={{ flex: 1}}>
				{this.props.isLoading ? (
					<ActivityIndicator size="large" color="#00ff80" />
				) : (
					<FlatList
						data={this.props.products}
						renderItem={this._renderItem}
						keyExtractor={this._keyExtractor}
						onEndReachedThreshold={0.5}
						onEndReached={this._getMore}
					/>
                )}
                </View>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.searchState.products,
		isLoading: state.searchState.isLoading,
		page: state.searchState.page,
        limit: state.searchState.limit,
        searchText: state.searchState.searchText,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(searchActionCreators, dispatch)
	};
}

const styles= StyleSheet.create({
    searchSection: {
        position: 'relative',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'grey',
      },
      searchIcon: {
        position: 'absolute',
        top: 13,
        left: 13,
        padding: 10,
        zIndex: 1,
      },
      searchInput: {
        flex: 1,
        margin: 10,
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 40,
        paddingBottom: 10,
        borderRadius: 40,
        backgroundColor: '#fff',
        color: '#424242',
      },
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithFlatList);