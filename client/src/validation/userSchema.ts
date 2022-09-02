import * as yup from "yup"

const userSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    username: yup.string().required(),
    email: yup
        .string()
        .required()
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is not valid")
    ,
    password: yup.string().required(),
    re_password: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Password must match")
    ,
})

export default userSchema


