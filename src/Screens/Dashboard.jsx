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
import {useSelector, useDispatch} from 'react-redux';
import {clearBills, fetchDashboardData} from '../Features/ParchiSlice';
import DropdownComponent from '../Components/Dropdown';
import {useFocusEffect} from '@react-navigation/native';
import Theme from '../Theme/Theme';
import {PieChart} from 'react-native-chart-kit';

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

const categoryColor = {
  Bakers: '#31BD5F',
  Dairy: '#F9A32B',
  'Tea & Coffee': '#4682FD',
  Snacks: '#FD7A86',
  'Biscuits & Cookies': '#7B5FFD',
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
  const series = [500, 500, 500];
  const sliceColor = Object.keys(categoryColor).map(k => {
    return k;
  });
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
            title={`${groupedItem.Name} (${groupedItem.Quantity})`}
            price={groupedItem.Category}
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
      <View style={styles.container} className="bg-white">
        <View>
          <Text style={styles.title}>Sales</Text>

          <PieChart
            data={Object.entries(categoryColor).map(([key, value]) => {
              return {
                name: `${key} (${
                  dashboardData.filter(f => f.Category === key).length
                })`,
                population: dashboardData.filter(f => f.Category === key)
                  .length,
                color: value,
                legendFontColor: value,
                legendFontSize: 12,
              };
            })}
            width={width - 10}
            height={210}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={'population'}
            backgroundColor={'transparent'}
            // paddingLeft={'35'}
            center={[0, 0]}
            hasLegend={false}
          />
          <View
            className="mt-10"
            style={{position: 'absolute', right: 10, bottom: 50}}>
            {Object.entries(categoryColor).map(([key, value]) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <View
                  className="mx-1"
                  style={{
                    backgroundColor: value,
                    width: 10,
                    height: 10,
                    // borderRadius: 8,
                  }}
                />
                <Text style={{color: value, fontSize: 13, fontWeight: '500'}}>
                  {key}
                  {'\t'}({dashboardData.filter(f => f.Category === key).length})
                </Text>
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
  },
  Billscontainer: {
    flexShrink: 1,
    marginBottom: 0,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
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
