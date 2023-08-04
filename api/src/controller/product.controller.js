import { createProduct, getAll, deleteProduct, getByID, updateProduct } from "../repository/product.repository";
import { productValidation } from "../validation/product.validation";
import Stripe from "stripe"

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE, {
  apiVersion: '2023-08-01',
});

export const get = async (req, res) => {
    try {
        const products = await getAll();
        res.status(200).send(products)
    }
    catch (e) {
        res.status(400).send(e)
    }
}

export const getId = async (req, res) => {
    try {
        const products = await getByID(req.params.id);
        res.status(200).send(products)
    }
    catch (e) {
        res.status(400).send(e)
    }
}

export const update = async (req, res) => {
    try {
        let product = req.body
        if(req?.file?.filename) {
          product = {...req.body, url: req.file.filename}
        }
        const productReponse = await updateProduct(req.params.id, product);
        res.status(200).send(productReponse)
    }
    catch (e) {
        res.status(400).send(e)
    }
}

export const deleteProductData = async (req, res) => {
    try {
        await deleteProduct(req.params.id);
        res.status(201).send()
    }
    catch (e) {
        res.status(400).send(e)
    }
}

export const create = async (req, res) => {
    try {
        const product = {...req.body, url: req.file.filename}
        await productValidation.validate(product)
        const savedProduct = await createProduct(product)
        res.status(200).send(savedProduct)
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e.errors)
    }
}

export const paymentProducts = async (req, res) => {
  let {amount, id} = req.body

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Payment",
            payment_method: id,
            confirm: true
        })

        console.log("Payment", payment)
        res.json({
            message: "Payment was successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment Failed",
            success: false
        })
    }
}
