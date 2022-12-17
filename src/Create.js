import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Create = () =>{

    const {register, handleSubmit, error} = useForm()
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()

    const onSubmit = (blog) => {

        setIsPending(true)

        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        })
        .then(()=>{
            console.log("New blog was added.")
            setIsPending(false)
            navigate("/")
        })
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">
                        Blog title: 
                        <input type="text" {...register("title", {required: true})} required 
                            placeholder="Write title"
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Content: 
                        <textarea {...register("body", {required: true})} id="" required cols="30" rows="10" placeholder="Writte the content of blog"></textarea>
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Author: <input type="text" {...register("author", {required: true})} required
                            placeholder="Writte by..."
                        />
                    </label>
                </div>

                {!isPending && <button type="submit">Add</button>}
                {isPending && <button type="submit" disabled >Add</button>}
            </form>
        </div>
    )
}

export default Create