const Instructions = () => {
    return(
        <>
        <li>Players take it in turns to add one card from their hand, face-up to the 'snap-pool' in the centre. </li>
        <li>When someone adds a card that matches the last card's value or the one before, the first person to notice and declare 'SNAP' wins the pool. These cards are added to the bottom of their hand. </li>
        <li>Points are awarded based on the number of cards you snapped up. Be careful not to snap unmatching cards!</li>
        <li>Play continues until one player has snapped all the cards.</li>
        {/* // ----------OR UNTIL THE TIME RUNS OUT????---------- // */}
        <li>The winner is the player who snaps the final pool of cards and has the whole deck!</li>
        </>
    )}

    export default Instructions