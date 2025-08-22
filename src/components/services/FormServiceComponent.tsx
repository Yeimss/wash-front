import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import PrettySelect, { Option } from '../utils/PrettySelect';
import { Controller, useForm } from 'react-hook-form';
import api from '../../api/api';

type FormValues = {
  description: string;
  price: string;
  idCategory: string
};

const options :Option[] = [
  { label: "Carro", value: "1" },
  { label: "Moto", value: "2" },
  { label: "Casco", value: "3" },
  { label: "Camioneta", value: "4" },
];

const FormServiceComponent = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { description: "", price: "", idCategory: "" }
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise(r => setTimeout(r, 800));
    data.price = data.price.replace(".", "")
    console.log("RN submit:", data);
    
  };

  return (
    <View style={styles.container}>
      <Text>Descripción</Text>
      <Controller
        control={control}
        name='description'
        rules={{required: "La descripción es obligatoria"}}
        render={({ field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='ej: Lavada exterior + cojinería'
          ></TextInput>
        )}
      ></Controller>
      {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

      <Text>Precio</Text>
      <Controller
        control={control}
        name='price'
        rules={{
          required: "El precio es obligatorio",
          validate: (value) => {
            if (!value) return "Debes ingresar un monto"
            const num = Number(value.replace(/,/g, ""));
            if (isNaN(num)) return "Debe ser un número válido";
            if (num <= 0) return "Debe ser mayor que 0";
            return true;
          }
        }}
        render={({ field: { onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => {
              let cleaned = text.replace(/[^0-9]/g, "");
              let formatted = cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              onChange(formatted);
            }}
            onBlur={onBlur}
            keyboardType="numeric"
            placeholder="Ej: 15.000"
          />
        )}    
      ></Controller>
      {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}
      

      <Text>Categoría</Text>
      <Controller
        control={control}
        name="idCategory"
        rules={{ required: "Selecciona una categoría" }}
        render={({ field: { value, onChange } }) => (
          <PrettySelect
            value={value}
            onChange={onChange}
            options={options}
            placeHolder='Elige una categoría'
          ></PrettySelect>
        )}
      />
      {errors.idCategory && <Text style={styles.error}>{errors.idCategory.message}</Text>}

      <Button /* style={styles.button} */ title={isSubmitting ? "Enviando..." : "Ingresar"} onPress={handleSubmit(onSubmit)} />

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, marginBottom: 8, borderRadius: 6 },
  error: { color: "red", marginBottom: 8 },
  button: { color: "blue", borderColor: "red", borderWidth:1, padding:3 },
  pickerWrapper: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 10, backgroundColor: "#fff",
  },
});

export default FormServiceComponent;
