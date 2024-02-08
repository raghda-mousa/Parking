import { Pressable, Text, View } from "react-native"
import { useHomeScreen } from "./use-home-screen"
import { TextInput, FlatList, MapView, PROVIDER_GOOGLE } from '../../components'
import { Ionicons } from '../../assets/icons'

const HomeScreen = () => {
    const { classes, searchTerm, setSearchTerm, searchForParking, matchedParkings, handleClearPress, handleSearchResultPress } = useHomeScreen();
    return (
        <View>
            <View style={classes.box}>
                <View style={classes.searchbox}>
                    <TextInput
                        style={{ flex: 1, height: 40, fontSize: 20, marginRight: 8, paddingHorizontal: 8 }}
                        placeholder='Search'
                        autoCapitalize='none'
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                    />
                    <Pressable style={{ padding: 10 }} onPress={searchForParking}>
                        <Ionicons name="search" size={24} color="black" />
                    </Pressable>
                    <Pressable style={{ padding: 10 }} onPress={handleClearPress}>
                        <Ionicons name="close" size={24} color="black" />
                    </Pressable>
                </View>

                {matchedParkings.length > 0 && (
                    <View style={classes.searchbox}>
                        <FlatList
                            data={matchedParkings}
                            renderItem={({ item }: { item: any }) => (
                                <Pressable
                                    style={classes.searchResultContainer}
                                    onPress={() => handleSearchResultPress(item)}
                                >
                                    <Text style={classes.searchResultText}>{item.name}</Text>
                                </Pressable>
                            )}
                            keyExtractor={(item) => item._id}
                        />
                    </View>
                )}
            </View>
            <View style={classes.map}>

                {/* <MapView
                    provider={PROVIDER_GOOGLE}
                    style={classes.map}
                    region={{
                        latitude: userLocation ? userLocation.latitude : 0,
                        longitude: userLocation ? userLocation.longitude : 0,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    showsUserLocation
                    followUserLocation
                    showsMyLocationButton
                    showsCompass
                    zoomEnabled
                    onPress={handleMapPress}
                >
                    {markers.map(marker => (
                        <Marker
                            key={marker.id}
                            title={marker.title}
                            coordinate={marker.coordinate}
                            pinColor={marker.color}
                            onPress={() => handleMarkerPress(marker)}
                        />
                    ))}
                    <MapViewDirections
                        origin={userLocation}
                        destination={selectedMarker ? selectedMarker.coordinate : null}
                        apikey={'AIzaSyByabDfHg6gqiT16_DdkGB-BU_CItX-IRY'}
                        strokeWidth={4}
                        strokeColor="blue"
                    />

                </MapView> */}
            </View>
        </View>
    )
}

export { HomeScreen }