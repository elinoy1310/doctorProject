//temporary code
// producer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    brokers: ["csovvkq0p8t14kkkbsag.any.eu-central-1.mpx.prd.cloud.redpanda.com:9092"],
    ssl: {},
    sasl: {
      mechanism: "scram-sha-256",
      username: "moshe",
      password: "HyCUNWFmeV0jyA5PUygv9cXt6CbLbG"
    }
  });
const producer = kafka.producer();

const runProducer = async (userId,content) => {
  await producer.connect();
  console.log('Producer connected to Kafka');

  // Sending a test message to the "user-messages" topic
  await producer.send({
    topic:  "testsResults",
    messages: [{key:JSON.stringify(parseInt(userId)), value:  JSON.stringify(content)}],
  });

  console.log('Message sent to Kafka');
  console.log(content)
  await producer.disconnect();
};

//runProducer("123456789").catch(console.error);

//runProducer("325984318").catch(console.error);
module.exports={runProducer}

