import React from 'react'

function ContactCard(props) {
    console.log(props)
    return (
        <div>
            <img src={props.contact.imageurl} alt="this is cool"/>
            <h3>{props.contact.name}</h3>
            <p>phone:{props.contact.phone}</p>
            <p>email:{props.contact.email}</p>

        </div>
    )
}

export default ContactCard

// "https://unsplash.com/photos/aZjw7xI3QAA"