const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "api-service",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

async function sendNotificationEvent(notification) {
  await producer.connect();

  await producer.send({
    topic: "notifications",
    messages: [
      {
        key: notification.userId,
        value: JSON.stringify(notification)
      }
    ]
  });

  console.log("🔔 Notification event published:", notification);
}

module.exports = sendNotificationEvent;
