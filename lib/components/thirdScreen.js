import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export class ThirdScreen extends Component {
    render() {
        const { params } = this.props.navigation.state
        const { counter } = this.props.count
        const { data } = this.props.fetch
        return (
            <View style={styles.container}>
                <DirectFromScreen
                    counter={counter}
                    data={data}
                    direct={params.screen}
                />
                <Button
                    title="button"
                    onPress={() => this.props.navigation.pop()}
                />
            </View>
        )
    }
}

export class DirectFromScreen extends Component {
    render() {
        const { counter, data, direct } = this.props
        switch (direct) {
            case "FIRST_SCREEN":
                return (
                    <Text>
                        {counter}
                    </Text>
                )
            case "SECOND_SCREEN":
                return (
                    <Text>
                        {JSON.stringify(data)}
                    </Text>
                )
        }
    }
}

function mapStateToProps(state) {
    return {
        count: state.count,
        fetch: state.fetch
    }
}

export default connect(mapStateToProps, null)(ThirdScreen)
