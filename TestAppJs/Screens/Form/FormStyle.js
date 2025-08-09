import { StyleSheet } from "react-native";

const FormStyle = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",  // semi-transparent dark background
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  modalCard: {
    width: 350,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

    input: {
      height: 50,
      width: "100%",
      alignSelf: "center",
  },

    closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
});

export default FormStyle;