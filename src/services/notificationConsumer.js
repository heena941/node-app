const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "notification-group" });

async function saveNotificationToDB(notification) {
  // Simulating DB save
  console.log("💾 Saved notification for user:", notification.userId);
}

async function sendPushNotification(notification) {
  // Simulating push notification
  console.log("📲 Push notification sent:", notification.message);
}

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "notifications", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const notification = JSON.parse(message.value.toString());

      try {
        if (notification.channel === "IN_APP") {
          await saveNotificationToDB(notification);
        }

        if (notification.channel === "PUSH") {
          await sendPushNotification(notification);
        }

        console.log("✅ Notification processed:", notification.eventId);
      } catch (err) {
        console.error("❌ Notification failed:", err);
      }
    }
  });
}

run();
