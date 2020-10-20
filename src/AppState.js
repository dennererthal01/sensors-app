import { createContext } from 'react'
import * as mobx from 'mobx'

import User from './models/User'

import { init, signIn } from './utils/firebase'

const { observable, decorate } = mobx

class AppState {
    loading = true

    currentUser

    async init() {
        if (this.loading) {
            this.currentUser = new User()
            try {
                const user = await init()
                await this.loadCurrentUser(user.uid, user.phoneNumber)
            } catch (e) {
                // noop
            }
            this.loading = false
        }
    }

    async loadCurrentUser(id, phone) {
        const loadResult = await this.currentUser.load(id)
        if (!loadResult) {
            this.currentUser.phone = phone
            const saveResult = await this.currentUser.save()
            return saveResult
        }
        return true
    }

    async login(credentials) {
        const user = await signIn(credentials)
        this.loadCurrentUser(user.uid, user.phoneNumber)
    }

    async logout() {
        this.currentUser = new User()
        return true
    }
}

decorate(AppState, {
    loading: observable,
    currentUser: observable,
})

export default createContext(new AppState())
