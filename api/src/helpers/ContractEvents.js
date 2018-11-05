'use strict'
const Events = require('events')

let contracts
const listeners = []

class ContractEvents extends Events {
  constructor(contractName, event) {
    super()
    this.contractName = contractName
    this.event = event

    if (contracts) {
      // contracts are ready, we can start listening to events immediately
      this.ready(contracts[contractName])
    } else {
      // contracts aren't ready yet, add this listener to the setup queue
      listeners.push(this)
    }

  }

  ready(contract) {
    if (!contract.events[this.event]) {
      throw new ReferenceError(`Event '${this.event}' not defined on contract '${this.contractName}'`)
    }
    contract.events[this.event]().on('data', event => {
      event.contract = contract
      this.emit('data', event)
    })
  }

  static ready(_contracts) {
    contracts = _contracts
    while (listeners.length) {
      const contractEvent = listeners.shift()
      contractEvent.ready(contracts[contractEvent.contractName])
    }
  }
}

module.exports = ContractEvents
