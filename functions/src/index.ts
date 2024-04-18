import dayjs from 'dayjs';
const functions = require("firebase-functions");
const admin = require("firebase-admin");
import OpenAI from "openai";

const CHATGPT_API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

admin.initializeApp();

exports.dailyTask = functions.pubsub.schedule("every 24 hours").onRun(async (context: any) => {

    //Function to generate random device usage in hour and total electric consumption based on usage
    const generateElectricConsumptionDataBasedOnUsage = (deviceId: string, consumptionPerHour: number ) => {
        // Generate random usage hours for the day (between 0 and 24 hours)
        const usageHours = Math.floor(Math.random() * 25);
    
        // Calculate total consumption for the day (in kilowatt)
        const totalConsumption = usageHours * consumptionPerHour;
    
        return { 
            consumptionData: { [deviceId]: totalConsumption },
            usageData: { [deviceId]: usageHours }
        };
    };

    try {
        // Reference to the root of your database
        const rootRef = admin.database().ref();

        // Retrieve a snapshot of the root
        const rootSnapshot = await rootRef.once("value");

        // Iterate through each child (userId) of the root
        rootSnapshot.forEach((userSnapshot: any) => {
            const userId = userSnapshot.key;

            // Reference to the devices node for the current user
            const devicesRef = admin.database().ref(`${userId}/devices`);

            // Retrieve a snapshot of the devices
            devicesRef.once('value', (devicesSnapshot: any) => {

                // Iterate through each device ID
                devicesSnapshot.forEach((deviceSnapshot: any) => {
                    const deviceId = deviceSnapshot.key;
                    const electricConsumption = parseFloat(deviceSnapshot.val().electricConsumption);

                    // Generate electric consumption data & usage data
                    const { consumptionData, usageData } = generateElectricConsumptionDataBasedOnUsage(deviceId, electricConsumption);

                    //get today's date
                    const todayDate: string = dayjs().format("MM-DD-YYYY");

                    // Write the data to the database
                    admin.database().ref(`${userId}/electricConsumptionData/${todayDate}`).update(consumptionData);
                    admin.database().ref(`${userId}/usageData/${todayDate}`).update(usageData);

                });
            });
        });

        console.log("Daily task completed successfully");
    } catch (error) {
        console.error("Error executing daily task:", error);
    }
});

exports.dailyNotification = functions.pubsub.schedule('every 24 hours').onRun(async (context: any) => {

    const getData = async (userId: any) => {
        let devicesData = null;
        let electricData = null;
        let usageData = null;

        const devicesRef = admin.database().ref(`${userId}/devices`);
        const deviceSnapshot = await devicesRef.once('value');
        devicesData = deviceSnapshot.val();

        const electricDataRef = admin.database().ref(`${userId}/electricConsumptionData`);
        const electricDataSnapshot = await electricDataRef.once('value');
        electricData = electricDataSnapshot.val();

        const usageRef = admin.database().ref(`${userId}/usageData`);
        const usageDataSnapshot = await usageRef.once('value');
        usageData = usageDataSnapshot.val();

        return {
            devicesData: devicesData,
            electricData: electricData,
            usageData: usageData
        }
    }

    const getNotification = async (dataPayload: any) => {
        let generatedNotification;

        try {
            const openai = new OpenAI({
                apiKey: CHATGPT_API_KEY, 
                organization: 'org-843P9Qy8sF8lJUUANr0zeAnC'
            });

            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [{ role: "user", content: `${JSON.stringify(dataPayload)}. "Generate a concise notification summarizing the electric consumption and usage patterns of devices. Focus on highlighting any irregularities or recommendations for optimizing electric consumption and usage. Keep the notification between 50-100 words and avoid including greetings or sign-offs."
                ` }],
                stream: false,
            });
            
            generatedNotification = response.choices[0].message.content;

        } catch (error) {
            console.error('Error sending data to ChatGPT API:', error);
        }

        return generatedNotification
    }

    try {

        // Reference to the root of your database
        const rootRef = admin.database().ref();

        // Retrieve a snapshot of the root
        const rootSnapshot = await rootRef.once("value");

        // Create an array of promises
        const promises: any[] = [];
        // Iterate through each child (userId) of the root
        rootSnapshot.forEach((userSnapshot: any) => {
            const userId = userSnapshot.key;

            promises.push((async () => {
                const dataPayload = await getData(userId);
                const { devicesData, electricData, usageData }: any = dataPayload;
    
                if (devicesData && electricData && usageData) {
    
                    //get notification generated from ChatGPT
                    const generatedNotification = await getNotification(dataPayload);
        
                    //get today's date
                    const todayDate: string = dayjs().format("MM-DD-YYYY");
        
                    // Write the notification to the database
                    if (generatedNotification !== null && generatedNotification !== undefined) {
                        const updates: any = {};
                        updates[`${userId}/notifications/${todayDate}`] = generatedNotification;
                        admin.database().ref().update(updates);
                    }
                }
            })());

        });

        // Await all promises
        await Promise.all(promises);

        console.log('Daily notification get and stored successfully');
    } catch (error) {
        console.error('Error getting daily notification:', error);
    }
});
