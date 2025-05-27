import React, { createRef, useState } from 'react'

const Test = () => {
    const [name, setName] = useState("jk")
    const inputValue = createRef()
    const handleSubmit=(e)=>{
        console.log(inputValue.current.value)
        e.preventDefault()
        console.log(name)
    }
    
    // const val = inputValue.current.value.length > 3
    

    return (
        <>
            <form>
                {/* <input className='border-2' type="text" value={name} onChange={(e) => setName(e.target.value)} /> */}
                <input className='border-2' type="text" ref={inputValue} />
                <button className={`border `} onClick={handleSubmit} type="submit">Submit</button>
            </form>
        </>
    )
}

export default Test