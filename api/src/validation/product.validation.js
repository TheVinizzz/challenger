import * as yup from "yup"

export const productValidation = yup.object({
    name: yup.string().required("Nome é Obrigatorio"),
    description: yup.string().required("Descreva seu produto"),
    url: yup.string().required("Envie uma imagem do seu produto")
})