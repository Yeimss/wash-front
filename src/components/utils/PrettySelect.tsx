import { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TextInput, FlatList } from "react-native";

export type Option = { label:string, value:string }

type props = {
    value?: string;
    options: Option[];
    onChange: (val:string) => void;
    placeHolder?:string;
    label?:string;
    searchPlaceHolder?:string;
    disabled?:boolean;
}

const PrettySelect:React.FC<props> = ({
    value, options, onChange, 
    placeHolder = "Seleccione una opcion",
    label, searchPlaceHolder, disabled
}) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")

    const selected = options.find(r => r.value === value);
    const data = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return options;
        return options.filter(o => o.label.toLowerCase().includes(q));
    },[options, query])

    return (
        <View style={{ marginBottom:16 }}>
            { label ? <Text style={styles.label}>{label}</Text> : null}

            <Pressable
                onPress={() => !disabled && setOpen(true)}
                style={({ pressed })=>[
                    styles.field,
                    disabled && { opacity: 0.6 },
                    pressed && { opacity: 0.9 },
                ]}
            >
                <Text style={[styles.valueText, !selected && { color: "#9aa" }]}>
                    {selected ? selected.label : placeHolder}
                </Text>
            </Pressable>

            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
                <Pressable style={styles.backdrop} onPress={() => setOpen(false)}></Pressable>
                <View style={styles.modalCard}>
                    <TextInput
                        placeholder={searchPlaceHolder}
                        value={query}
                        onChangeText={setQuery}
                        style={styles.search}
                    ></TextInput>

                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.value}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                onChange(item.value);
                                setOpen(false);
                                }}
                                style={({ pressed }) => [styles.option, pressed && { opacity: 0.7 }]}
                            >
                                <Text style={styles.optionText}>{item.label}</Text>
                                {item.value === value ? <Text>✓</Text> : null}
                            </Pressable>
                        )}
                        ListEmptyComponent={<Text style={styles.empty}>Sin resultados</Text>}
                    >
                    </FlatList>
                </View>
            </Modal>
        </View>
    )
}

export default PrettySelect;

const styles = StyleSheet.create({
    label: { marginBottom: 6, fontWeight: "600", color: "#222" },
    field: {
        borderWidth: 1, borderColor: "#e5e7eb", backgroundColor: "#fff",
        paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12,
        shadowColor: "#000", shadowOffset: { width: 0, height: 1}, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2
    },
    valueText: { color: "#111", fontSize: 16 },
    backdrop: { position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.25)" },
    modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8, color: "#111" },
    modalCard: {
        position: "absolute", left: 16, right:16, top:100, bottom: 100,
        backgroundColor: "#fff", borderRadius: 16, padding: 14,
        shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 8,
    },
    search: {
        borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10,
        paddingVertical: 10, paddingHorizontal: 12, marginBottom: 10, backgroundColor: "#fafafa",
    },
    option: {
        paddingVertical: 12, paddingHorizontal: 12,
        borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#eee",
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    },
    optionText: { fontSize: 16, color: "#111" },
    empty: { textAlign: "center", color: "#888", marginTop: 20 }
});