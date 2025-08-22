import { View, Text, StyleSheet, ScrollView } from "react-native"
import FormServiceComponent from "../../components/services/FormServiceComponent"
import ListServiceComponent from "../../components/services/ListServiceComponent"
import ModalButton from "../../components/utils/ModalButton"

const ServicesScreen = () => {
    return (
        <ScrollView style={styles.view}>
            <ModalButton buttonText="Nuevo servicio">
                <FormServiceComponent></FormServiceComponent>
            </ModalButton>
            <ListServiceComponent></ListServiceComponent>
        </ScrollView>
    )
}
export default ServicesScreen

const styles = StyleSheet.create({
    view: {
        backgroundColor: "white"
    }
});