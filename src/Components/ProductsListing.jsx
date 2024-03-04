import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {handleGetProducts} from '../Features/ParchiSlice';
import {Search} from '../Components/Search';
import Theme from '../Theme/Theme';
import {useSnackbar} from '../Components/CustomSnackBar';

const {width} = Dimensions.get('window');

const ProductsRenderItem = React.memo(
  ({item, onPress, ListButtonComponent}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item.id);
        }}
        activeOpacity={1}
        style={styles.productContainer}>
        <ImageBackground
          source={{uri: item.Image}}
          style={styles.productImageContainer}
          imageStyle={styles.productImageStyle}
          resizeMode="contain">
          <Text style={styles.productPriceTag}>
            Rs.
            <Text style={styles.productPrice}>
              {'\t'}
              {item.Unit_Price}
            </Text>
          </Text>
        </ImageBackground>
        <View style={styles.productNameContainer}>
          <Text numberOfLines={2} style={styles.productName}>
            {item.Name}
          </Text>
        </View>
        <ListButtonComponent ProductID={item.id} />
      </TouchableOpacity>
    );
  },
);

const ProductsListing = ({ListButtonComponent, onPress}) => {
  const dispatch = useDispatch();
  const {userId, logo} = useSelector(state => state.pin);
  const {products} = useSelector(state => state.app);
  const {showSnackbar} = useSnackbar();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All Products');
  const [showActivity, setShowActivity] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsRefreshing(true);
    setShowActivity(true);
    handleGetData();
  }, []);

  const totalCategories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map(product => product.Category)),
    ];
    return ['All Products', ...uniqueCategories];
  }, [products]);

  const handleGetData = () => {
    setShowActivity(true);
    dispatch(handleGetProducts(userId, onSuccessGetData, onErrorGetData));
  };

  const onSuccessGetData = () => {
    setShowActivity(false);
    setIsRefreshing(false);
  };

  const onErrorGetData = () => {
    setShowActivity(false);
    setIsRefreshing(false);
    showSnackbar('Error : Check Internet!', 'red');
  };

  const ProductsData = useMemo(() => {
    if (filter === 'All Products') {
      return products;
    } else {
      return products.filter(f => f.Category === filter);
    }
  }, [filter, products]);

  const SearchData = useMemo(() => {
    if (search === '') {
      return ProductsData;
    } else {
      return ProductsData.filter(f =>
        f.Name.toLowerCase().includes(search.trim().toLocaleLowerCase()),
      );
    }
  }, [search, ProductsData]);

  const filterBarRenderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setFilter(item);
          setSearch('');
        }}
        key={item}
        style={[
          styles.filterItemWrapper,
          filter === item && styles.selectedFilterWrapper,
        ]}>
        <Text
          style={[
            styles.filterItemTag,
            filter === item && styles.selectedFilterTag,
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const activityRenderItem = () => {
    return (
      <View style={styles.activityIndicatorContainer}>
        <View style={styles.activityIndicator} />
      </View>
    );
  };

  return (
    <FlatList
      data={showActivity ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : SearchData}
      numColumns={2}
      contentContainerStyle={styles.mainContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            handleGetData();
          }}
          colors={[Theme.colors.primary, Theme.colors.secondary, 'red']}
        />
      }
      ListHeaderComponent={
        <View>
          <Search value={search} setValue={setSearch} />
          <Image source={{uri: logo}} style={styles.image} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterCategoriesContentContainerStyle}
            data={totalCategories}
            renderItem={filterBarRenderItem}
          />
        </View>
      }
      renderItem={
        showActivity
          ? activityRenderItem
          : ({item}) => (
              <ProductsRenderItem
                item={item}
                onPress={onPress}
                ListButtonComponent={ListButtonComponent}
              />
            )
      }
      keyExtractor={(item, index) => (item + index).toString()}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    paddingBottom: 100,
  },
  filterItemWrapper: {
    backgroundColor: 'white',
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderColor: Theme.colors.primary,
    borderWidth: 1,
    marginBottom: 15,
    shadowColor: 'white',
    elevation: 5,
  },
  selectedFilterWrapper: {
    backgroundColor: Theme.colors.primary,
    borderWidth: 0,
    shadowColor: Theme.colors.primary,
  },
  filterItemTag: {
    color: Theme.colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedFilterTag: {
    color: 'white',
  },
  filterCategoriesContentContainerStyle: {
    paddingHorizontal: 5,
  },
  productContainer: {
    width: width / 2 - 15,
    borderWidth: 0.5,
    borderColor: '#eeeeee',
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    elevation: 2,
  },
  productImageContainer: {
    width: '100%',
    height: 170,
    justifyContent: 'flex-end',
  },
  productImageStyle: {
    width: '100%',
    height: 100,
    marginTop: 35,
  },
  productPriceTag: {
    color: Theme.colors.primary,
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  productNameContainer: {
    backgroundColor: '#eeeeee',
    flex: 1,
    padding: 10,
  },
  productName: {
    color: 'black',
    fontSize: 14,
  },
  activityIndicatorContainer: {
    width: width / 2 - 15,
    height: 170,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 10,
    overflow: 'hidden',
  },
  activityIndicator: {
    width: '100%',
    height: 70,
    marginTop: 'auto',
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  image: {
    width: width,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 15,
  },
});

export default ProductsListing;
