import { observable, decorate } from 'mobx'

import { loadDocument, saveDocument, query, watchDocument, removeDocument } from '../utils/firebase'

class Model {
    collection

    id

    _watcher

    static async query(collection, queries, modelClass) {
        const docs = await query(collection, queries)
        return docs.map(doc => {
            const newClass = new modelClass()
            newClass.fromJSON(doc)
            return newClass
        })
    }

    constructor(collection) {
        if (!collection) {
            throw new Error('Model collection not specified!')
        }
        this.collection = collection
    }

    async load(id) {
        if (id) {
            this.id = id
        }
        if (!this.id) {
            throw new Error('No id specified')
        }
        const data = await loadDocument(this.collection, this.id)
        if (!data) {
            return false
        }
        this.fromJSON(data)
        return true
    }

    async watch(id) {
        if (id) {
            this.id = id
        }
        if (!this.id) {
            throw new Error('No id specified')
        }

        this.unwatch()
        this._watcher = watchDocument(this.collection, this.id, newData => {
            this.fromJSON(newData)
        })
    }

    unwatch() {
        if (this._watcher) {
            this._watcher()
        }
    }

    async save() {
        if (!this.id) {
            const newId = await saveDocument(this.collection, this.id, this.toJSON(), { addIfUnexisting: true })
            if (newId) {
                this.id = newId
            }
            return !!newId
        }
        return saveDocument(this.collection, this.id, this.toJSON(), { addIfUnexisting: true })
    }

    update() {
        return saveDocument(this.collection, this.id, this.toJSON())
    }

    remove() {
        return removeDocument(this.collection, this.id)
    }

    fromJSON(data) {
        // eslint-disable-next-line no-underscore-dangle
        this.id = data._id
    }

    toJSON() {
        return {
            _id: this.id,
        }
    }
}

decorate(Model, {
    id: observable,
})

export default Model
