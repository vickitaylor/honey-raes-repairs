import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

// this is the parent container for TicketList and TicketSearch, this component maintains the state, both get access to this from props
// if we need both child to interact with each other, they have to be in a parent component, take the state that is shared and put it in the parent.  pass the state in one component, and the setter function to another component, so one can modify and the other can do something with it, they are props, you can think about it as an object key and value, but the syntax is different. 


export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    
    return <>
        {/* the search component needs the setter function, will need an on change. the key is setterFunction 
        the ticket list needs to know what the search terms are, and needs access to the state*/}
        <TicketSearch setterFunction={setSearchTerms} />
        <TicketList searchTermState={searchTerms} />
    </>

}