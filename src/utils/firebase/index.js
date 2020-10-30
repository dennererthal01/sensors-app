import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

import config from '../config'

let db

const init = () => {
    return new Promise(async (resolve, reject) => {
        firebase.initializeApp(config.firebase)
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        db = firebase.firestore()
        firebase.auth().onAuthStateChanged(resolve, reject)
    })
}

const sendPin = (phone, recaptcha) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider()
    return phoneProvider.verifyPhoneNumber(phone, recaptcha)
}

const verifyPin = (pin, verificationId) => {
    return firebase.auth.PhoneAuthProvider.credential(verificationId, pin)
}

const signIn = (credentials) => {
    return firebase.auth().signInWithCredential(credentials)
}

const logout = () => {
    return firebase.auth().signOut()
}

const getCurrentUser = () => {
    return firebase.auth().currentUser
}

const documentExists = async (collection, doc) => {
    const document = await db.collection(collection).doc(doc).get()
    return document.exists
}

const _normalizeFirebaseData = data => {
    const normalizedData = {}
    Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
            normalizedData[key] = data[key]
        }
    })
    return normalizedData
}

const saveDocument = async (collection, doc, data, { addIfUnexisting = false } = {}) => {
    const exists = !!doc && await documentExists(collection, doc)
    if (!addIfUnexisting && !exists) {
        return false
    }
    const options = { merge: exists }
    if (doc) {
        await db.collection(collection).doc(doc).set(_normalizeFirebaseData(data), options)
    } else {
        const result = await db.collection(collection).add(_normalizeFirebaseData(data))
        return result.id
    }
    return true
}

const loadDocument = async (collection, doc) => {
    const exists = await documentExists(collection, doc)
    if (!exists) {
        return false
    }
    const snapshot = await db.collection(collection).doc(doc).get()
    return {
        ...snapshot.data(),
        _id: doc
    }
}

const query = async (collection, queries = []) => {
    const dbCollection = db.collection(collection)
    queries.forEach(query => {
        dbCollection.where(query[0], query[1], query[2])
    })
    const snapshot = await dbCollection.get()
    return snapshot.docs.map(doc => {
        return doc.data()
    })
}

export default firebase
export {
    init,
    sendPin,
    verifyPin,
    signIn,
    logout,
    getCurrentUser,
    documentExists,
    saveDocument,
    loadDocument,
    query
}
