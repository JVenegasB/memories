export default function Home() {
    return(
        <div className="mx-5">
            <h1>This is the Main Page. Here we should see all the existing memories in a card style!</h1>
            <p>The concept is, a card with a brief description. This cards are to be displayed in a 3x3 (?) grid
                and each card should be clickable to see the full memory, redirecting to the corresponding page.
                This cards are to be sorted by date
            </p>
            <p>The card must have a "Main Image", below the description and below a button to view more</p>
        </div>
    )
}