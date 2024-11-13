import { Text, StyleSheet } from "react-native"

export const Title = ({ text, centered }) => {
    return (
        <Text style={[
            styles.text,
            centered && { textAlign: "center" }
        ]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        marginHorizontal: 8,
        marginVertical: 8,
        fontSize: 20,        
        minWidth: 240
    }
})

export default Title