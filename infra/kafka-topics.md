# Kafka Topics

Create the request queue topic with six partitions and replication factor three:

```bash
kafka-topics --bootstrap-server kafka:9092 --create --if-not-exists --topic request-queue --partitions 6 --replication-factor 3
kafka-topics --bootstrap-server kafka:9092 --create --if-not-exists --topic request-queue-dlq --partitions 3 --replication-factor 3
```

For the single-broker local Docker Compose stack, replication factor is effectively reduced by broker availability. Production Kafka should run at least three brokers before using replication factor three.
