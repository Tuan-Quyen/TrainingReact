import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    linear: {
        justifyContent: "flex-start",
        flexDirection: 'column'
    },
    horizontal: {
        justifyContent: "flex-start",
        flexDirection: 'row'
    },
    menuLeft: {
        paddingLeft: 20,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    smallList: {
        backgroundColor: 'red',
        flexGrow: 0,
        width: 150
    }
});

const MenuButton = function (navigation) {
    return (
        <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
            <View style={styles.menuLeft}>
                <Icon name="navicon" size={24} color="#FFFFFF" />
            </View>
        </TouchableOpacity>
    );
}

const navigationHeader = function (navigation) {
    return {
        headerTitle: "Home Screen",
        headerTitleStyle: {
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 18,
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            marginRight: 75
        },
        headerTintColor: '#FFFFFF',
        headerStyle: {
            backgroundColor: "#0099ff"
        },
        headerLeft: MenuButton(navigation)
    };
}

var radio_props = [
    { label: 'option 1', value: 2738921 },
    { label: 'option 2', value: 2738922 },
    { label: 'option 3', value: 2738923 },
    { label: 'option 4', value: 2738924 },
    { label: 'option 5', value: 2738925 }
];

export class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return navigationHeader(navigation);
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: 0,
        };
    }

    addData = () => {
        var i = 0;
        var data = [];
        for (i; i < 100; i++) {
            data.push({ title: Number(i) + " " + "index list item" });
        }
        this.setState({ data: data });
    }

    componentDidMount() {
        this.addData();
    }

    render() {
        return (
            <View style={styles.linear} flex={1}>
                <View style={styles.horizontal} height={200}>
                    <FlatList style={styles.smallList}
                        data={this.state.data}
                        contentContainerStyle={({ alignItems: "center" })}
                        renderItem={({ item }) => (
                            <Text>{item.title}
                            </Text>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ language: itemValue })
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
                <RadioForm
                    radio_props={radio_props}
                    initial={-1}
                    animation={false}
                    buttonColor={'#008577'}
                    selectedButtonColor={'#008577'}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonWrapStyle={{ marginLeft: 10 }}
                    onPress={(value) => { this.setState({ value: value }) }}
                />
                <Text>{this.state.value}</Text>
            </View>
        );
    }
}
