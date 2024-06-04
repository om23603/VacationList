(function(){
    "use strict";

    const detailsForm = document.querySelector("#destination_details_form");

    detailsForm.addEventListener("submit", handleFormSubmit);

    // When someone submits the form, this function will run.
    function handleFormSubmit(event){
        event.preventDefault();

        // Read out the inputs
        const destName = event.target.elements["name"].value;
        const destLocation = event.target.elements["location"].value;
        const destPhoto = event.target.elements["photo"].value;
        const destDesc = event.target.elements["description"].value;

        // Clear all the fields
        for(let i=0; i<detailsForm.length; i++){
            detailsForm.elements[i].value = "";
        }

        // Run a function to create a new card
        const destCard = createDestinationCard(destName, destLocation, destPhoto, destDesc);
        const wishListContainer = document.getElementById("destination_container");

        // Change the text in the heading
        if(wishListContainer.children.length === 0){
            document.getElementById("title").innerHTML = "My Wish List";
        }

        // Add the card
        wishListContainer.appendChild(destCard);

    }

    function createDestinationCard(name, location, photoURL, description){
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.setAttribute("alt", name);
        
        const constantPhotoUrl = "images/signpost.jpg";

        if(photoURL.length === 0){
            img.setAttribute("src", constantPhotoUrl);
        }
        else {
            img.setAttribute("src", photoURL);
        }
        card.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h3");
        cardTitle.innerText = name;
        cardBody.appendChild(cardTitle);

        const cardSubtitle = document.createElement("h4");
        cardSubtitle.innerText = location;
        cardBody.appendChild(cardSubtitle);

        if(description.length !== 0){
            const cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.innerText = description;
            cardBody.appendChild(cardText);
        }

        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.addEventListener("click", removeDestination);
        cardBody.appendChild(removeButton);

        card.appendChild(cardBody);

        return card
    }

    function removeDestination(event){
        // Remove a card
        const card = event.target.parentElement.parentElement;
        card.remove();

        // Change the text in the heading if necessary
        const wishListContainer = document.getElementById("destination_container");
        if(wishListContainer.children.length === 0){
            document.getElementById("title").innerHTML = "Enter Destination Details";
        }
    }
})();