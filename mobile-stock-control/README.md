# Mobile Stock Control App

This is a simple React Native mobile app for stock control built with Expo.

## Features

- Main screen with product list grouped by category.
- Add product screen with barcode/QR code scanner.
- Local state management for products.
- Simple, clean UI.

## Requirements

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Android/iOS device or emulator

## Setup and Run

1. Clone the repository or copy the files.
2. Navigate to the `mobile-stock-control` directory.
3. Run the following commands to install dependencies and start the app:

```bash
npm install
npm install @react-navigation/native @react-navigation/stack expo-barcode-scanner uuid
expo start
```

4. Use the Expo Go app on your device or an emulator to open the app.

## Dependencies

- react-navigation/native
- react-navigation/stack
- expo-barcode-scanner
- uuid

## Notes

- This app uses React Navigation for screen navigation.
- Barcode scanning requires camera permissions.
- Products are stored in local state (no persistent storage yet).

## Future Improvements

- Add persistent storage (AsyncStorage or SQLite).
- Improve UI styling.
- Add product editing and deleting.
- Add product name auto-fetch from barcode database.

