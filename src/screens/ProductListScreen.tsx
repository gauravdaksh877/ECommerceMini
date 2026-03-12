import React, { useState, useRef, useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductCard } from '../components/ProductCard';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../models/Product';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Icon, IconSizes } from '../components/Icon';
import { RootStackParamList } from '../navigation/AppNavigator';

type ProductListScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'ProductList'
>;

export const ProductListScreen: React.FC<ProductListScreenProps> = ({
    navigation,
}) => {
    const { products, loading, error, refetch } = useProducts();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Initialize filtered products when products change
    useEffect(() => {
        filterProducts(searchQuery, products);
    }, [products]);

    /**
     * Filter products based on search query
     * Searches in product title (case-insensitive)
     */
    const filterProducts = (query: string, productsToFilter: Product[]) => {
        if (!query.trim()) {
            setFilteredProducts(productsToFilter);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = productsToFilter.filter(product =>
            product.title.toLowerCase().includes(lowerQuery)
        );
        setFilteredProducts(filtered);
    };

    /**
     * Debounced search handler
     * Waits 300ms after user stops typing before filtering
     */
    const handleSearchChange = (text: string) => {
        setSearchQuery(text);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            filterProducts(text, products);
        }, 300);
    };

    /**
     * Clear search and show all products
     */
    const handleClearSearch = () => {
        setSearchQuery('');
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        setFilteredProducts(products);
    };

    /**
     * Handle pull-to-refresh
     */
    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            if (refetch) {
                await refetch();
            }
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleProductPress = (product: Product) => {
        navigation.navigate('ProductDetail', { productId: product.id });
    };

    const renderItem = ({ item }: { item: Product }) => (
        <ProductCard product={item} onPress={handleProductPress} />
    );

    // Show skeleton loader while loading
    if (loading && !isRefreshing) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Products</Text>
                </View>
                <SkeletonLoader count={8} numColumns={2} />
            </SafeAreaView>
        );
    }

    if (error && !isRefreshing) {
        return (
            <SafeAreaView style={styles.container}>
                <ErrorView message={error} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Products</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Icon
                    name="search"
                    size={IconSizes.md}
                    color={colors.text.secondary}
                    family="ionicon"
                    style={{ marginRight: spacing.md }}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search products..."
                    placeholderTextColor={colors.text.tertiary}
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        onPress={handleClearSearch}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Icon
                            name="close"
                            size={IconSizes.md}
                            color={colors.text.secondary}
                            family="ionicon"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Products Grid or Empty State */}
            {filteredProducts.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>📭</Text>
                    <Text style={styles.emptyTitle}>
                        {searchQuery ? 'No Products Found' : 'No Products Available'}
                    </Text>
                    <Text style={styles.emptyMessage}>
                        {searchQuery
                            ? `Try searching with different keywords`
                            : 'Please try again later or check your connection'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredProducts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.columnWrapper}
                    scrollEventThrottle={16}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={10}
                    updateCellsBatchingPeriod={50}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    header: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.text.primary,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderRadius: 8,
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: colors.text.primary,
        paddingHorizontal: 8,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
    },
    listContent: {
        paddingVertical: spacing.md,
        paddingBottom: spacing.lg,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: spacing.lg,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: spacing.md,
    },
    emptyMessage: {
        fontSize: 14,
        color: colors.text.secondary,
        textAlign: 'center',
    },
});
