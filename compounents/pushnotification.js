import React, { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {Platform} from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const PushNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const intervalIdRef = useRef(null); // Use useRef for the interval ID

  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));

    // Create interval to send notification every hour
    intervalIdRef.current = setInterval(async () => {
      console.log("Sending notification every 30 seconds...");
      await sendNotification();
    }, 30000); // 30000 milliseconds are equivalent to 30 seconds

    return () => {
      clearInterval(intervalIdRef.current); // Clear interval when component unmounts
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "33968461-6183-4976-a65d-aeb83f77cde6",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const sendNotification = async () => {
    console.log("Sending push notification...");

    // Google Maps link
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=-25.363882,131.044922`;

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "TRACKING",
      body: mapsLink, // Include the link in the body of the notification
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  return null; // You can add UI elements or return JSX content here if needed
};

export default PushNotification;