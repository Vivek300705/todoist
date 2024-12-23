import React from 'react'
import "./home.css"
function Home() {
    return (
        <div className="text-center my-64 h-full">
            <h1 className="font-bold text-4xl">Plan. Achieve. Simplify.</h1>
            <br />
            <div className=" text-4xl  justify-center ">
                <b> &quot; Organize your day, achieve your goals, and stay productive—your <br />  ultimate To-Do list starts here for a better tomorrow! &quot;</b>
                <p className="text-lg p-5 font-medium">
                    &quot; अपना दिन व्यवस्थित करें, अपने लक्ष्यों को पूरा करें, और उत्पादक बने रहें—बेहतर कल के लिए यहां से शुरुआत करें! &quot;
                </p>
                <button className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Make todolist
</button>
            </div>
        </div>
    )
}

export default Home