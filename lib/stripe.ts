import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51OiHOdKXUy1FiHyAcF9PJzjnknrJcFIDhirpVoVd12L65pDOrYXI9x0UzQe51k4zVFxwyttHorMUxKtSpuIUza6q00GkW5ps1x', {
	apiVersion: '2024-06-20'
})

export default stripe
