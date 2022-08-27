import { Collection, MongoClient } from 'mongodb'
import { AggregateRoot } from '../../../domain/AggregateRoot'
import { PeristenceErrorBecauseNotExist } from '../persistence-errors'

export abstract class MongoRepository<T extends AggregateRoot> {
	constructor(private _client: Promise<MongoClient>) {}

	protected abstract collectionName(): string

	protected client(): Promise<MongoClient> {
		return this._client
	}

	protected async collection(): Promise<Collection> {
		return (await this._client).db().collection(this.collectionName())
	}

	protected async persist(id: string, aggregateRoot: T): Promise<void> {
		const collection = await this.collection()
		const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined }

		await collection.updateOne({ _id: id }, { $set: document }, { upsert: true })
	}

	protected async remove(id: string): Promise<void> {
		const collection = await this.collection()		
		const result = await collection.deleteOne({ _id: id })
		if (result.deletedCount === 0)
			throw new PeristenceErrorBecauseNotExist()
	}

	protected async removeAll(): Promise<void> {
		const collection = await this.collection()		
		await collection.deleteMany({})
	}
}
