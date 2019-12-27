import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TextInput } from 'react-native'
import { decreaseAction, increaseAction, inputValueCount } from '../actions/counterAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    horizontal: {
        flexDirection: 'row'
    },
    horizontalSpaceRound: {
        flexDirection: 'row',
        justifyContent: "space-around"
    }
})

export class FirstScreen extends Component {
    render() {
        const { counter, inputValue } = this.props.count
        console.log(this.props.count)
        return (
            <View style={styles.container}>
                <Text>
                    {counter}
                </Text>
                <View style={styles.horizontal}>
                    <TextInput
                        style={{ borderColor: 'blue', borderWidth: 1, marginHorizontal: 20, paddingVertical: 5, paddingHorizontal: 10 }}
                        flex={1}
                        defaultValue={inputValue.toString()}
                        keyboardType="number-pad"
                        onSubmitEditing={(event) => { this.props.inputValue(event.nativeEvent.text) }}
                    />
                </View>
                <View style={styles.horizontalSpaceRound} width={200}>
                    <Button
                        title="+"
                        onPress={() => {
                            this.props.increase()
                        }}></Button>
                    <Button
                        title="-"
                        onPress={() => {
                            this.props.decrease()
                        }}></Button>
                </View>
                <Button
                    title="Change to ThirdScreen"
                    onPress={() => this.props.navigation.navigate('Third',{
                        screen: "FIRST_SCREEN"
                    })}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.count
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        increase: increaseAction,
        decrease: decreaseAction,
        inputValue: inputValueCount
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen)