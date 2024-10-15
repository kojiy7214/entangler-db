## Concept Model

### Variable and Value

Variable is a

### Sheet and Value

Sheet represents meta transaction(which defines group of variables to be contained in transaction), while Value is an actual data contained in transaction.

### What is Transaction

A Transaction represents an operation at a specific time that involves data modification (creation or update). It guarantees that the Values included in the operation adhere to ACID properties. By calling Sheet.create(), Sheet.update(), a Transaction is created according to the definition of the Meta Transaction (Sheet). Each of these methods performs the respective data operation (create, update, or delete) on the Values.

The ID of a Transaction is determined by the Meta Transaction and the specific time the operation starts was executed. The side effects caused by the Transaction are accumulated and recorded in the Value along with the Transaction ID. To be clear, value is a time series record of modification done by Transaction.

### Transaction Concurrency Control

Concurrent initiation of operations within a Transaction is prohibited. If multiple Transactions modify the same Value, the system prioritizes the Value recorded by the Transaction with the latest start time.
