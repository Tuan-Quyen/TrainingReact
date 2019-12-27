import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { fetchData } from '../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "column"
    },
    handlerLoading: {
        marginVertical: 10,
        marginHorizontal: 15,
    },
    movieList: {
        flexGrow: 0
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
                <Button
                    title="button"
                    onPress={() => this.props.navigation.navigate('Third', {
                        screen: "SECOND_SCREEN"
                    })}
                />
            </View>
        );
    }
}

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
                        style={styles.movieList}
                        data={data.movies}
                        renderItem={({ item }) => (
                            <View color={"#0099ff"}>
                                <Text>
                                    {item.title}
                                </Text>
                            </View>
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