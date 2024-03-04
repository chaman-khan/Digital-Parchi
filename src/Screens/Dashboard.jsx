import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Dimensions,
  ScrollView,
} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {useSelector, useDispatch} from 'react-redux';
import {clearBills, fetchDashboardData} from '../Features/ParchiSlice';
import DropdownComponent from '../Components/Dropdown';
import {useFocusEffect} from '@react-navigation/native';
import Theme from '../Theme/Theme';

const {width, height} = Dimensions.get('window');

const FilterData = {
  Today: 'today',
  Weekly: 'last7Days',
  Monthly: 'last30Days',
};

const RowField = ({title, price}) => {
  return (
    <View style={styles.rowField}>
      <Text style={styles.rowTitle}>{title}</Text>
      <Text style={styles.rowPrice}>{price}/-</Text>
    </View>
  );
};

function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const dashboardData = useSelector(state => state.app.dashboardData);
  const {userId} = useSelector(state => state.pin);
  const [filterValue, setFilterValue] = useState('Today');
  const dispatch = useDispatch();

  const fetchDashboardDataForSelectedValue = async value => {
    try {
      setRefreshing(true); // Set refreshing to true when fetching new data

      // Dispatch action to clear existing data
      console.log('Clearing bills');
      dispatch(clearBills());

      // Convert the selected value into date ranges
      const {dateFrom, dateTo} = getDateRange(value);
      console.log(
        `Fetching dashboard data for ${value} from ${dateFrom} to ${dateTo}`,
      );

      // Fetch dashboard data based on the selected value
      await dispatch(
        fetchDashboardData({dateFrom, dateTo, businessID: userId}),
      );

      console.log('Fetch successful');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setRefreshing(false);
    } finally {
      setRefreshing(false); // Stop refreshing indicator
    }
  };

  useEffect(() => {
    // Fetch dashboard data for the default value ('today') when the component mounts
    fetchDashboardDataForSelectedValue(FilterData[filterValue]);
  }, [filterValue]);

  const getDateRange = value => {
    const today = new Date();
    let dateFrom;
    // let dateTo = today.toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const dateTo = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    switch (value) {
      case 'today':
        dateFrom = dateTo;
        break;
      case 'last7Days':
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        dateFrom = last7Days.toISOString().split('T')[0];
        break;
      case 'last30Days':
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);
        dateFrom = last30Days.toISOString().split('T')[0];
        break;
      default:
        dateFrom = dateTo;
        break;
    }

    return {dateFrom, dateTo};
  };

  const groupAndCalculateTotalPrice = data => {
    const groupedData = {};

    data.forEach(item => {
      const cartID = item.Cart_ID || 'default';

      if (!groupedData[cartID]) {
        // If the cartID is not in the groupedData, initialize it
        groupedData[cartID] = {
          items: [],
          totalPrice: 0,
        };
      }

      // Add the item to the items array for the respective cartID
      groupedData[cartID].items.push(item);

      // Update the totalPrice for the respective cartID
      groupedData[cartID].totalPrice += item.Price;
    });

    // Convert grouped data into an array
    const result = Object.values(groupedData);

    return result;
  };

  const widthAndHeight = 120;
  const series = [123, 321, 123];
  const sliceColor = ['#C608D1', '#2900A5', '#ff9100'];
  const itemDescription = [
    {title: 'Items', color: 'black', inventory: 'Available'},
    {title: 'Electronics', color: '#C608D1', inventory: 123},
    {title: 'Clothing', color: '#2900A5', inventory: 321},
    {title: 'Home', color: '#ff9100', inventory: 391},
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.date}>Date: {item.items[0].Date_Added}</Text>
        {item.items.map(groupedItem => (
          <RowField
            title={`${groupedItem.PSid} (${groupedItem.Quantity})`}
            price={groupedItem.Price}
          />
        ))}
        <Text style={styles.totalText}>
          <Text style={styles.totalTextTag}>Rs.</Text>
          {'\t'}
          {item.totalPrice}/-
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() =>
            fetchDashboardDataForSelectedValue(FilterData[filterValue])
          }
        />
      }
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={styles.container} className="bg-violet-200 p-5">
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text style={styles.title}>Sales</Text>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
          </View>
          <View className="mt-10">
            {itemDescription?.map((item, index) => (
              <View key={index}>
                <View className="flex-row items-center">
                  <View>
                    <Text
                      className="mx-1"
                      style={{
                        backgroundColor: item.color,
                        color: item.color,
                        width: 15,
                        height: 10,
                      }}>
                      *
                    </Text>
                  </View>
                  <View>
                    <Text className="py-1 text-black font-medium">
                      {item.title}({item.inventory})
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <DropdownComponent
        data={['Today', 'Weekly', 'Monthly']}
        onDropdownChange={setFilterValue}
        value={filterValue}
        placeholder={'Today'}
        title="Filter"
      />

      <FlatList
        data={groupAndCalculateTotalPrice(dashboardData)}
        keyExtractor={item => item.Cart_ID}
        style={{
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          paddingBottom: 70,
          paddingTop: 5,
        }}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.listEmpty}>No data available</Text>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
  },
  Billscontainer: {
    flexShrink: 1,
    marginBottom: 0,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    flexShrink: 0,
    flex: 1,
  },
  itemContainer: {
    width: width - 20,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginVertical: 5,
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 12,
    color: 'black',
  },
  listEmpty: {
    color: Theme.colors.primary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: width / 1.5,
    fontWeight: '500',
  },
  totalText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'right',
    paddingRight: 20,
    marginTop: 5,
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: '#eeeeee',
  },
  totalTextTag: {
    color: Theme.colors.primary,
    fontSize: 14,
    fontWeight: 'normal',
  },
  rowField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  rowTitle: {
    width: '70%',
    fontSize: 14,
    color: 'black',
  },
  rowPrice: {
    width: '20%',
    fontSize: 14,
    color: 'black',
  },
});

export default Dashboard;
