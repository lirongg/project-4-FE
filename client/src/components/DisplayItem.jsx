function DisplayItems(props) {
    const {item} = props

    return(
        <div>
        <p>{item.item}</p>
        <p>{item.location}</p>
        <p>{item.description}</p></div>
    )
}

export default DisplayItems;