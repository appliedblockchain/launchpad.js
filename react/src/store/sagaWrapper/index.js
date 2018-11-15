import { sagaWrapper } from './sagaWrapper'
import defaultOptions from './defaultOptions'

export default saga => sagaWrapper(saga, { defaultOptions })
