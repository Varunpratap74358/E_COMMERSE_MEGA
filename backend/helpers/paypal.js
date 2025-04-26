import paypal from 'paypal-rest-sdk'
import dotenv from 'dotenv'

dotenv.config({})
paypal.configure({
    mode:"sandbox",
    client_id:'AQsD_hsIEa1fzCFj9kikZKH03C41r4CRfN_I1tzJCwyYSehmy9Dyum1qsG59ocsZ4sbJGnc9ga42YGrn',
    client_secret:'EHg1Kit6jrq9Zb_3Ng_uFFmuU3P4tk522Z1dNEvJKuhYc5FXEMTzwjiAUm-uvsA2rHMnvjf92SuwNPtC',
})

export default paypal