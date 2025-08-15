import React, { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../context/AuthContext";

/** 1) Esquema de validación */
const schema = yup.object({
  documento: yup
    .string()
    .required("El documento es obligatorio"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
});

type FormValues = yup.InferType<typeof schema>;

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [secure, setSecure] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange", 
    defaultValues: { documento: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      setApiError(null);
      await login(data.documento, data.password); 
    } catch (err: any) {
      // Mapea errores comunes del backend
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (err?.response?.status === 401
          ? "Credenciales inválidas"
          : "Error al iniciar sesión. Intenta de nuevo");
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Inicia sesión</Text>

        {apiError ? <Text style={styles.apiError}>{apiError}</Text> : null}

        <Text style={styles.label}>Documento</Text>
        <Controller
          control={control}
          name="documento"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.documento && styles.inputError]}
              placeholder="ingresa tu documento"
              keyboardType="numeric"
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.documento?.message ? (
          <Text style={styles.error}>{errors.documento.message}</Text>
        ) : null}

        {/* Password */}
        <Text style={[styles.label, { marginTop: 12 }]}>Contraseña</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="••••••••"
                secureTextEntry={secure}
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                textContentType="password"
              />
              <TouchableOpacity
                style={styles.toggle}
                onPress={() => setSecure((s) => !s)}
                >
                <Ionicons
                    name={secure ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                />
            </TouchableOpacity>
            </View>
          )}
        />
        {errors.password?.message ? (
          <Text style={styles.error}>{errors.password.message}</Text>
        ) : null}

        {/* Botón */}
        <TouchableOpacity
          style={[styles.button, (!isValid || loading) && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={() => { /* navegar a recuperar contraseña si aplica */ }}>
          <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/** 4) Estilos básicos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginTop: 6,
    fontSize: 12,
  },
  apiError: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  toggle: {
    position: "absolute",
    right: 12,
    top: 5,
    padding: 4,
  },
  toggleText: {
    fontSize: 12,
    textDecorationLine: "underline",
  },
  button: {
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  linkBtn: {
    marginTop: 10,
    alignItems: "center",
  },
  linkText: {
    textDecorationLine: "underline",
  },
});
