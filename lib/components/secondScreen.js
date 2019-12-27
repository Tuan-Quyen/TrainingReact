import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { fetchData } from '../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardView from 'react-native-cardview'
import Icon from 'react-native-vector-icons/FontAwesome';

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
        flexDirection: "row",
        justifyContent: "center"
    }
})

export class SecondScreen extends Component {
    componentDidMount() {
        //get object stored in reducer.
        const { data } = this.props.data
        //check stored data in reducer was fetch or not , if it fetched data will do nothing , only render UI.
        if (data == null) {
            this.props.getData()
        }
    }

    render() {
        const { data, error, isLoading } = this.props.data
        return (
            <View style={styles.container}>
                <View style={styles.handlerLoading}>
                    <HandlerLoading
                        isLoading={isLoading}
                        data={data}
                        error={error} />
                </View>
            </View>
        );
    }
}

{/* <Button
                    title="button"
                    onPress={() => this.props.navigation.navigate('Third', {
                        screen: "SECOND_SCREEN"
                    })}
                /> */}

//spliting component for handler loading.
export class HandlerLoading extends Component {
    render() {
        const { data, error, isLoading } = this.props
        if (isLoading) {
            return (
                <ActivityIndicator color={"#ff8080"} size={50} />
            )
        } else {
            return (
                data != null ?
                    //has data
                    <FlatList
                        flexGrow={0}
                        data={data.movies}
                        renderItem={({ item }) => (
                            <TouchableHighlight
                                underlayColor={"transparent"}
                                onPress={() => { }}>
                                <CardView
                                    marginBottom={5}
                                    cornerRadius={5}
                                    cardElevation={3}>
                                    <View style={styles.movieItem}>
                                        <View flexDirection={"column"} flex={8}>
                                            <Text>
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View flexDirection={"column"} flex={1} alignItems={"center"}>
                                            <Icon name="navicon" size={24} color="#0099ff" />
                                        </View>
                                    </View>
                                </CardView>
                            </TouchableHighlight>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    :
                    //error response
                    <Text>
                        {error.toString()}
                    </Text>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        data: state.fetch
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getData: fetchData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondScreen);