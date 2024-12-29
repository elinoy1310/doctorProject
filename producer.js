const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  brokers: ["ct6r6ph1fcl81ca011fg.any.eu-central-1.mpx.prd.cloud.redpanda.com:9092"],
  ssl: {},
  sasl: {
    mechanism: "scram-sha-256",
    username: "final",
    password: "Xc6JXrZAW5sImWAgiNn4XqYXnli9nh"
  }
});
const producer = kafka.producer();

const runProducer = async (userId, content) => {
  await producer.connect();

  // Sending a test message to the "user-messages" topic
  await producer.send({
    topic: "testsResults",
    messages: [{ key: JSON.stringify(parseInt(userId)), value: JSON.stringify(content) }],
  });

  console.log('Message sent to Kafka');
  console.log(content)
  await producer.disconnect();
};


module.exports = { runProducer }

