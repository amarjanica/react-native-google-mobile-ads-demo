import React from 'react';
import {Button, View} from 'react-native';
import {AdEventType, AdsConsent, InterstitialAd, TestIds} from 'react-native-google-mobile-ads';

const Page = () => {
  const [loading, setLoading] = React.useState(false);
  const handleShowInterstitial = async () => {
    setLoading(true);
    const canRequest = await AdsConsent.requestInfoUpdate().then((it) => it.canRequestAds);
    if (canRequest) {
      const interstitial = InterstitialAd.createForAdRequest160(TestIds.INTERSTITIAL);
      interstitial.load();
      const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        interstitial.show({
          immersiveModeEnabled: true,
        });
        setLoading(false);
        unsubscribeLoaded();
      });
    } else {
      console.log('Cant show the interstitial');
      setLoading(false);
    }

  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button disabled={loading} onPress={handleShowInterstitial} title="Show interstitial"/>
    </View>
  )
}

export default Page;
