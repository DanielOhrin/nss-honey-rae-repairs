export const TicketSearch = ({ setterFunction }) => {
    return (
        <div>
            <input type="text" placeholder="Enter search term" onChange={(event) => {
                setterFunction(event.target.value)
            }
            } />
        </div>
    )
}