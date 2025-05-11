import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Slot, Stack} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {requestTrackingPermissionsAsync} from 'expo-tracking-transparency';
import React, {useEffect} from 'react';
import {AdEventType, AdsConsent, AdsConsentStatus, InterstitialAd, TestIds} from 'react-native-google-mobile-ads';
import mobileAds from 'react-native-google-mobile-ads/src';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [adsLoaded, setAdsLoaded] = React.useState(false);
  useEffect(() => {
    const prepare = async () => {
      // TODO: if the ATT doesn't show up, add a small delay
      await requestTrackingPermissionsAsync()
      try {
        const consentInfo = await AdsConsent.requestInfoUpdate();
        if (consentInfo.isConsentFormAvailable && consentInfo.status === AdsConsentStatus.REQUIRED) {
          await AdsConsent.showForm();
        }
        await mobileAds().initialize();
        setAdsLoaded(true);
      } catch (e) {
        console.log('error', e);
      }
    }
    void prepare();
  }, []);


  if (!adsLoaded) {
    return null;
  }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
