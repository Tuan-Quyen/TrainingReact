import React, { Component, PureComponent } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableHighlight, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchData, loadMorePage, refreshPage } from '../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardView from 'react-native-cardview'
import Icon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
    container: {
        alignItems: "stretch",
        flexDirection: "column",
        flex: 1
    },
    handlerLoading: {
        marginVertical: 10,
        marginHorizontal: 5,
    },
    movieItem: {
        marginBottom: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
        flexDirection: "row"
    }
})

export class SecondScreen extends Component {
    componentDidMount() {
        //get object stored in reducer.
        const { data, page } = this.props.data
        //check stored data in reducer was fetch or not , if it fetched data will do nothing , only render UI.
        if (data == null) {
            this.props.getData(page)
        }
    }

    onLoadMoreData = (page, totalPage) => {
        if (page <= totalPage) {
            this.props.getData(page + 1)
        }
    }

    onRefreshData = () => {
        this.props.onRefresh()
        this.props.getData(1)
    }

    render() {
        const { data, error, isLoading, page, totalPage } = this.props.data
        return (
            <View style={styles.container}>
                <View style={styles.handlerLoading}>
                    {(data != null ?
                        <FlatList
                            flexGrow={0.5}
                            data={data}
                            refreshControl={
                                <RefreshControl
                                    refreshing={page == 1 && data.length == 0 ? isLoading : false}
                                    onRefresh={() => this.onRefreshData()}
                                />
                            }
                            onEndReached={() => this.onLoadMoreData(page, totalPage)}
                            onEndReachedThreshold={0.05}
                            ListFooterComponent={(data.length != 0 ?
                                <ActivityIndicator color={"#ff8080"} size={50} />
                                :
                                null
                            )}
                            renderItem={({ item }) => (
                                <MovieItem item={item} props={this.props} />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        :
                        <Text>
                            {error.toString()}
                        </Text>
                    )}
                </View>
            </View>
        );
    }
}

//spliting component for handler loading.
class MovieItem extends PureComponent {
    render() {
        const { item, props } = this.props
        return (
            <TouchableHighlight
                underlayColor={"transparent"}
                onPress={() => {
                    props.navigation.navigate('Third', {
                        screen: "SECOND_SCREEN"
                    })
                }
                }>
                <CardView
                    marginBottom={5}
                    cornerRadius={5}
                    cardElevation={3}>
                    <View style={styles.movieItem}>
                        <View flexDirection={"column"} flex={1}>
                            <Text>
                                {item.title}
                            </Text>
                            <Text>
                                {item.release_date}
                            </Text>
                        </View>
                        <View flexDirection={"row"} alignItems={"center"} justifyContent={"flex-end"}>
                            <Icon name="right" size={24} color="gray" />
                        </View>
                    </View>
                </CardView>
            </TouchableHighlight>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.fetch
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getData: fetchData,
        onLoadMore: loadMorePage,
        onRefresh: refreshPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondScreen);