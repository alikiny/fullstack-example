import { yupResolver } from '@hookform/resolvers/yup'

import {useForm} from "react-hook-form"
import userSchema from '../validation/userSchema'

const UserForm = () => {
    const { register, handleSubmit, reset, formState:{errors}} = useForm({
        resolver: yupResolver(userSchema)
    })
    const submitForm = (data: any) => {
        // If the create user route in backend require a form instead of json object
        //...create a formdata and append all the fields
        const formdata = new FormData()
        formdata.append("username", data.username)
        formdata.append("image", data.image)
        //call the dispatch action to send this form to backend to create user
    }
   
  return (
      <div>
          <form
          onSubmit={handleSubmit(submitForm)}>
              <label htmlFor="username">User name</label>
              <input type="text" id="username" {...register("username")} />
              <p>{errors.username?.message}</p>

              <label htmlFor="firstname">First name</label>
              <input type="text" {...register("firstname")} id="firstname" />
              <p>{errors.firsname?.message}</p>

              <label htmlFor="lastname">Last name</label>
              <input type="text" id="lastname" {...register("lastname")} />
              <p>{errors.lastname?.message}</p>

              <label htmlFor="email">User email</label>
              <input type="email" {...register("email")} id="email" />
              <p>{errors.email?.message}</p>

              <label htmlFor="password">User password</label>
              <input type="password" {...register("password")} id="password" />
              <p>{errors.password?.message}</p>

              <label htmlFor="re_password">Enter password again</label>
              <input type="password" {...register("re_password")} id="re_password" />
              <p>{errors.re_password?.message}</p>

              <input type="file" id="image" {...register("image")} />

              <button type='submit'>Submit</button>
          </form>
    </div>
  )
}

export default UserForm