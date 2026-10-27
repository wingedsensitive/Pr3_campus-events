import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventCard } from "../components/EventCard";
import { initialEvents } from "../data/events";
import { EventItem } from "../types/event";

type CategoryFilter = EventItem["category"] | "Усі";

const CATEGORIES: CategoryFilter[] = ["Усі", "Навчання", "Культура", "Спорт"];

export default function HomeScreen() {
  const [category, setCategory] = useState<CategoryFilter>("Усі");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [filterNotice, setFilterNotice] = useState<string>("");

  const previousCategory = useRef(category);

  useEffect(() => {
    if (previousCategory.current !== category) {
      previousCategory.current = category;
      setFilterNotice(`Фільтр: ${category}`);

      const timer = setTimeout(() => {
        setFilterNotice("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [category]);

  const visibleEvents = useMemo(() => {
    if (category === "Усі") return initialEvents;
    return initialEvents.filter((event) => event.category === category);
  }, [category]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((previous) =>
      previous.includes(id)
        ? previous.filter((favId) => favId !== id)
        : [...previous, id],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Події коледжу</Text>
        <Text style={styles.description}>
          Головний застосунок для відстеження усіх актуальних заходів та новин
          коледжу.
        </Text>

        <View style={styles.favoritesHeader}>
          <Text style={styles.favoritesCount}>
            Обрано: {favoriteIds.length}
          </Text>
          {favoriteIds.length > 0 && (
            <Pressable onPress={() => setFavoriteIds([])}>
              <Text style={styles.clearText}>Очистити</Text>
            </Pressable>
          )}
        </View>

        {filterNotice !== "" && (
          <Text style={styles.filterNotice}>{filterNotice}</Text>
        )}

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.filterTab,
                  category === cat && styles.filterTabActive,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    category === cat && styles.filterTabTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {visibleEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isFavorite={favoriteIds.includes(event.id)}
              onToggleFavorite={() => toggleFavorite(event.id)}
            />
          ))}

          {visibleEvents.length === 0 && (
            <Text style={styles.emptyText}>
              У цій категорії поки немає подій
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f0f4f8" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 18,
  },
  favoritesHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },
  favoritesCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3b82f6",
  },
  clearText: {
    fontSize: 14,
    color: "#ef4444",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  filterNotice: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748b",
    textAlign: "center",
    marginBottom: 8,
    fontStyle: "italic",
  },
  filterContainer: { marginBottom: 16, maxHeight: 40 },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    marginRight: 8,
  },
  filterTabActive: { backgroundColor: "#1e293b" },
  filterTabText: { fontSize: 14, color: "#475569", fontWeight: "600" },
  filterTabTextActive: { color: "#ffffff" },
  scrollContent: { paddingBottom: 20 },
  emptyText: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: 40,
    fontSize: 15,
  },
});
