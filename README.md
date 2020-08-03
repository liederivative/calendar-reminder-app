# Calendar-reminder App

In order to test this app, you should install the packages: 

    yarn install
then you need to obtain an api key from [Open Weather](https://openweathermap.org/api) and create a **.env** file with the api key. Please modify the **.env.example** file and rename it to **.env** and fill it with the key.

Run the app using , the default port is 9001: 

    yarn start
To run the tests : 

    yarn test

# Functionality

 - [x] Ability to add a new "reminder" (max 30 chars) with date, time, color and city. 
- [x]  Display reminders on the calendar view in the correct time order.
- [x] Allow the user to select color when creating a reminder and display it appropriately.
- [x] Ability to edit reminders – including changing text, city, day, time and color.
- [x] Weather forecast using Open Weather API, based on the city.
- [x]  Unit tests
- [x] Expand the calendar to support more than the current month.
- [x] Properly handle overflow when multiple reminders appear on the same date.
- [x] Functionality to delete one or ALL the reminders for a specific day