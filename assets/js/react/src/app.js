
import { define } from 'remount'
import Test from './components/Test'
import Login from './components/Login'
define({ 'x-test-component': Test }, {attributes: ["name"]})
define({ 'x-login': Login })

