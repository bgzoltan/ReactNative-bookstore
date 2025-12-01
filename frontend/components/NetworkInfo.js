import { useNetInfo } from "@react-native-community/netinfo";

// Expo Simulator is not suppoerted
export default function NetworkInfo() {
  const netInfo = useNetInfo();

  const online = netInfo.isConnected === true;

  return (
    <View>
      {online ? (
        <Text>Internet is connected OK!</Text>
      ) : (
        <Text>Internet is NOT connected!</Text>
      )}
    </View>
  );
}
