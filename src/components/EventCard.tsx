import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { EventItem } from "../types/event";

type EventCardProps = {
  event: EventItem;
  onOpen?: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function EventCard({
  event,
  onOpen,
  isFavorite,
  onToggleFavorite,
}: EventCardProps) {
  // Стан для відстеження, чи студент зареєструвався на подію
  const [isJoined, setIsJoined] = useState(false);

  // Кольорові бейджі для категорій
  const getCategoryColor = (category: EventItem["category"]) => {
    switch (category) {
      case "Навчання":
        return "#2563eb"; // Синій
      case "Культура":
        return "#9333ea"; // Фіолетовий
      case "Спорт":
        return "#16a34a"; // Зелений
      default:
        return "#4b5563";
    }
  };

  const handleToggleJoin = () => {
    const nextState = !isJoined;
    setIsJoined(nextState);

    if (nextState) {
      Alert.alert(
        "Успішна реєстрація!",
        `Ви зареєструвалися на подію:\n"${event.title}"`,
      );
    }
  };

  return (
    <View style={styles.card}>
      {/* Шапка картки з категорією та статусом реєстрації */}
      <View style={styles.headerRow}>
        <View
          style={[
            styles.badge,
            { backgroundColor: getCategoryColor(event.category) },
          ]}
        >
          <Text style={styles.badgeText}>{event.category}</Text>
        </View>

        {isJoined && <Text style={styles.joinedBadge}>✓ Ви йдете</Text>}
      </View>

      <Text style={styles.title}>{event.title}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>📅 {event.date}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>📍 {event.place}</Text>
      </View>

      <Text style={styles.description}>{event.description}</Text>

      {/* Інтерактивна кнопка із зміною стану */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          isJoined && styles.buttonJoined,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleToggleJoin}
      >
        <Text style={[styles.buttonText, isJoined && styles.buttonTextJoined]}>
          {isJoined ? "✓ Ви зареєстровані" : "Приєднатися до події"}
        </Text>
      </Pressable>

      {/* Кнопка "В обране" згідно з новим завданням */}
      <Pressable
        style={[styles.favButton, isFavorite && styles.favButtonActive]}
        onPress={onToggleFavorite}
        accessibilityRole="button"
        accessibilityLabel={
          isFavorite ? "Прибрати подію з обраного" : "Додати подію в обране"
        }
      >
        <Text
          style={[
            styles.favButtonText,
            isFavorite && styles.favButtonTextActive,
          ]}
        >
          {isFavorite ? "Прибрати з обраного" : "В обране"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  joinedBadge: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16a34a",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#4b5563",
  },
  description: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonJoined: {
    backgroundColor: "#dcfce7",
    borderWidth: 1,
    borderColor: "#86efac",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  buttonTextJoined: {
    color: "#15803d",
  },
  favButton: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#f3f4f6", // Світло-сірий фон за замовчуванням
  },
  favButtonActive: {
    backgroundColor: "#fee2e2", // Світло-червоний для обраного
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  favButtonText: {
    color: "#4b5563",
    fontWeight: "600",
    fontSize: 14,
  },
  favButtonTextActive: {
    color: "#ef4444", // Червоний текст для обраного
  },
});
