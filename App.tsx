import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  GestureResponderEvent,
} from "react-native";

type StringOrNumber = string | number;
export default function App() {
  const [quantity, setQuantity] = React.useState<StringOrNumber | null>(0);
  const [nicotine, setNicotine] = React.useState<StringOrNumber>(0);
  const [flavor, setFlavor] = React.useState<StringOrNumber>(0);
  const [flavorMl, setFlavorMl] = React.useState<StringOrNumber>(0);
  const [nicotineBooster, setNicotineBooster] =
    React.useState<StringOrNumber>(20);
  const [booster, setBooster] = React.useState<StringOrNumber>(0);
  const [base, setBase] = React.useState<StringOrNumber>(0);
  const [error, setError] = React.useState<string | null>(null);

  const calculate = (
    quantity: number,
    flavor: number,
    nicotine: number,
    nicotineBooster: number
  ) => {
    const quantityValue = quantity;
    const nicotineBoosterValue = Number(nicotineBooster);
    const boosterValue =
      (nicotine / nicotineBoosterValue) * nicotine * (quantity / 10);
    const flavorValue = (quantity / 100) * flavor;
    let baseValue: StringOrNumber = quantityValue - flavorValue - boosterValue;

    setBooster(boosterValue);
    if (flavorValue < 100) {
      setFlavorMl(flavorValue);
    } else {
      setFlavorMl("XXX");
      setBooster("XXX");
      setError("vous ne pouvez pas mettre + de 100%");
    }
    if (baseValue < 0) {
      baseValue = "XXX";
    }
    setBase(Number(baseValue));
  };
  const handleFlavor = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setFlavor(Number(e.nativeEvent?.text));
  };
  const handleQuantity = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setQuantity(e.nativeEvent?.text);
  };
  const handleNicotine = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setNicotine(Number(e.nativeEvent?.text));
  };
  const handleBooster = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setNicotineBooster(Number(e.nativeEvent?.text));
  };
  const handleCalculate = (e: GestureResponderEvent) => {
    e.preventDefault();
    calculate(
      Number(quantity),
      Number(flavor),
      Number(nicotine),
      Number(nicotineBooster)
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Eliquid Maker Calculator</Text>
        <View>
          <Text>Ml of eliquid do you want prepare</Text>
          <TextInput
            style={styles.textInput}
            onChange={handleQuantity}
            keyboardType="numeric"
          />
          <Text>% of Flavor</Text>
          <TextInput
            style={styles.textInput}
            onChange={handleFlavor}
            keyboardType="numeric"
          />
          <Text>Mg per ml of booster</Text>
          <TextInput
            style={styles.textInput}
            onChange={handleBooster}
            keyboardType="numeric"
          />
          <Text>Ml of nicotine per ml</Text>
          <TextInput
            style={styles.textInput}
            onChange={handleNicotine}
            keyboardType="numeric"
          />
          <Button title="Calculate" onPress={handleCalculate} />
          <View>
            <Text>quantity flavor do you need : {flavorMl}ml</Text>
            <Text>quantity booster do you need : {booster}ml</Text>
            <Text>quantity neutral base do you need : {base}ml</Text>
            {error && <Text>{error}</Text>}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
    padding: 5,
  },
});
